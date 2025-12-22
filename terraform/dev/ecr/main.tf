# Configure the AWS Provider
provider "aws" {
  region = var.region # Change this to your preferred AWS region
}

# 1. Create the ECR Repository
resource "aws_ecr_repository" "repo" {
  name                 = var.repository_name # The name used in the AWS console
  image_tag_mutability = "MUTABLE"     # Allows overwriting the 'latest' tag

  # Automatically check for security vulnerabilities on every push
  image_scanning_configuration {
    scan_on_push = true
  }

  # Encrypt the images stored in the repository
  encryption_configuration {
    encryption_type = "AES256"
  }
}

# 2. Create the Lifecycle Policy
# This prevents your AWS bill from growing by deleting old images
resource "aws_ecr_lifecycle_policy" "repo_policy" {
  repository = aws_ecr_repository.repo.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep only the last 10 images to save on storage costs"
      selection = {
        tagStatus     = "any"
        countType     = "imageCountMoreThan"
        countNumber   = 10
      }
      action = {
        type = "expire"
      }
    }]
  })
}

////////////////////////////


// EVENT BRIDGE || RULE
// This defines the "trigger." It listens for a successful image push to your specific ECR repository.
resource "aws_cloudwatch_event_rule" "ecr_push_rule" {
  name        = "trigger-ec2-on-ecr-push"
  description = "Triggers when PutImage API call is detected"

  event_pattern = jsonencode({
    "source": ["aws.ecr"],
    "detail-type": ["AWS API Call via CloudTrail"],
    "detail": {
      "eventSource": ["ecr.amazonaws.com"],
      "eventName": ["PutImage"],
      "requestParameters": {
        "repositoryName": ["${aws_ecr_repository.repo.name}"]
      }
    }
  })
}



// Role for event bridge to assume in order to talk to SSM
resource "aws_iam_role" "eventbridge_ssm_role" {
  name = "fims-eventbridge-ssm-trigger-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "events.amazonaws.com"
        }
      }
    ]
  })
}

# Permission for EventBridge to actually send the command to SSM
resource "aws_iam_role_policy" "eventbridge_ssm_policy" {
  name = "fims-eventbridge-ssm-policy"
  role = aws_iam_role.eventbridge_ssm_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = "ssm:SendCommand"
        Effect   = "Allow"
        # This allows sending the RunShellScript to your specific instance
        Resource = [
          "arn:aws:ssm:${var.region}::document/AWS-RunShellScript",
          "arn:aws:ec2:${var.region}:${data.aws_caller_identity.current.account_id}:instance/${var.ec2_instance_id}"
        ]
      }
    ]
  })
}

# Needed to get your Account ID automatically for the ARN above
data "aws_caller_identity" "current" {}

resource "aws_cloudwatch_event_target" "ssm_target" {
  rule      = aws_cloudwatch_event_rule.ecr_push_rule.name
  arn       = "arn:aws:ssm:${var.region}::document/AWS-RunShellScript"
  role_arn  = aws_iam_role.eventbridge_ssm_role.arn

  # This identifies the "Where"
  run_command_targets {
    key    = "InstanceIds"
    values = [var.ec2_instance_id]
  }

  
  input = jsonencode({
    commands = [
      "sleep 10",
      # 1. Login to ECR (using the instance's IAM role permissions)
      "aws ecr get-login-password --region ${var.region} | docker login --username AWS --password-stdin ${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.region}.amazonaws.com",
      
      # 2. Pull the latest image
      "docker pull ${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.region}.amazonaws.com/${aws_ecr_repository.repo.name}:latest",
      
      # 3. Stop and remove the old container (if it exists) to free up the port
      "docker ps -q --filter 'publish=80' | xargs -r docker rm -f",
      
      # 4. Run the new container
      "docker run -d --name npf-web-fe -p 80:3000 ${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.region}.amazonaws.com/${aws_ecr_repository.repo.name}:latest",
      
      # 5. Optional: Clean up old unused images to save disk space
      "docker image prune -f"
      ]
  })
}


# 1. Create an S3 bucket to store CloudTrail logs
resource "aws_s3_bucket" "cloudtrail_logs" {
  bucket        = "fims-ecr-automation-logs-${data.aws_caller_identity.current.account_id}"
  force_destroy = true
}

# 2. Attach a policy so CloudTrail can actually write to that bucket
resource "aws_s3_bucket_policy" "cloudtrail_policy" {
  bucket = aws_s3_bucket.cloudtrail_logs.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AWSCloudTrailAclCheck"
        Effect = "Allow"
        Principal = { Service = "cloudtrail.amazonaws.com" }
        Action   = "s3:GetBucketAcl"
        Resource = aws_s3_bucket.cloudtrail_logs.arn
      },
      {
        Sid    = "AWSCloudTrailWrite"
        Effect = "Allow"
        Principal = { Service = "cloudtrail.amazonaws.com" }
        Action   = "s3:PutObject"
        Resource = "${aws_s3_bucket.cloudtrail_logs.arn}/AWSLogs/${data.aws_caller_identity.current.account_id}/*"
        Condition = {
          StringEquals = { "s3:x-amz-acl" = "bucket-owner-full-control" }
        }
      }
    ]
  })
}

# 3. Enable CloudTrail
resource "aws_cloudtrail" "main" {
  name                          = "fims-ecr-event-trail"
  s3_bucket_name                = aws_s3_bucket.cloudtrail_logs.id
  include_global_service_events = true
  is_multi_region_trail         = true # Recommended to catch events across regions
  enable_logging                = true

  depends_on = [aws_s3_bucket_policy.cloudtrail_policy]
}