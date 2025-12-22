provider "aws" {}

# 1. SEARCH: Find the image
data "aws_ami" "aws_linux_2023" {
  most_recent = true     
  owners = ["amazon"] 

  filter {
    name   = "name"
    # The '*' allows for future security patches and minor version updates
    values = ["al2023-ami-2023*-kernel-6.1-x86_64"]
  }
}

# Security Group A: Just for Admin access
resource "aws_security_group" "ssh_access" {
  name = "fmis-ssh-access"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Security Group B: Just for Public Web access
resource "aws_security_group" "web_access" {
  name = "fmis-web-access"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 2. FIREWALL: Create a Security Group to allow SSH
resource "aws_security_group" "web_traffic" {
  name        = "fmis-allow-web-and-http"
  description = "Allow SSH and HTTP inbound traffic"

  # Rule 1: SSH (Port 22)
  ingress {
    description      = "SSH from my computer"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"] 
  }

  # Rule 2: HTTP (Port 80)
  ingress {
    description      = "HTTP from anywhere"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"] # Allows anyone to see your website
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1" # Allows the server to talk to the internet
    cidr_blocks      = ["0.0.0.0/0"]
  }
}


# Creating an IAM Role 
resource "aws_iam_role" "ec2_ecr_ssm_role" {
    name = "fmis-ssm-role"
    assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}

# Attach AmazonSSMManagedInstanceCore
resource "aws_iam_role_policy_attachment" "ssm_policy" {
  role       = aws_iam_role.ec2_ecr_ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# Attach AmazonEC2ContainerRegistryReadOnly
resource "aws_iam_role_policy_attachment" "ecr_policy" {
  role       = aws_iam_role.ec2_ecr_ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

# 2. Create the Instance Profile (This is what the EC2 actually uses)
resource "aws_iam_instance_profile" "ec2_profile" {
  name = "fmis-ssm-instance-profile"
  role = aws_iam_role.ec2_ecr_ssm_role.name
}


# Server
resource "aws_instance" "dev_server" {
    ami = data.aws_ami.aws_linux_2023.id
    instance_type = var.instance_type

    # attach profile associated with IAM role
    iam_instance_profile = aws_iam_instance_profile.ec2_profile.name

    # Attach the Security Group we created above
    vpc_security_group_ids = [
        aws_security_group.ssh_access.id, 
        aws_security_group.web_access.id
    ]

    # Specify the name of an existing Key Pair in your AWS console
    key_name = var.instance_keypair

    user_data = file("docker.sh")
    
    tags = {
        Name = var.server_name
    }
}

# This will print the Instance ID to your terminal
output "instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.dev_server.id
}

# This will print the Public IP address to your terminal
output "public_ip" {
  description = "The public IP address of the server"
  value       = aws_instance.dev_server.public_ip
}