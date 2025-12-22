#!/bin/bash
sudo yum update -y
sudo yum install -y docker
sudo usermod -aG docker ec2-user
sudo service docker start 
sudo docker run -d --name nginx-server -p 80:80 nginx