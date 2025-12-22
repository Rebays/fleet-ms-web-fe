# This will print the URL of your new repository to the console
output "repository_url" {
  description = "The URL of the ECR repository"
  value       = aws_ecr_repository.repo.repository_url
}

# This prints the Registry ID (Account ID) which is helpful for docker login
output "registry_id" {
  description = "The account ID of the ECR registry"
  value       = aws_ecr_repository.repo.registry_id
}