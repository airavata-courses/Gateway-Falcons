#!/bin/bash
sudo apt update
echo 'install pre-requisites'
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
echo ' Add docker repository'
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
echo 'INSTALLING DOCKER FROM REPOSITORIES'
sudo apt install -y docker-ce
echo 'STARTING DOCKER'
sudo systemctl status docker
