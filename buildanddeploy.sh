#!/bin/bash
rm -rf diet/
mkdir diet
cd diet
git clone https://github.com/airavata-courses/Gateway-Falcons
cd ./Gateway-Falcons
git checkout diet-service
cp ../../dietconfig.ini diet/dietconfig.ini
mkdir scripts
cp ~/scripts/*.sh ~/diet/Gateway-Falcons/scripts
docker build --tag=$1 .
docker login
docker tag $1 johnlive/$2
docker push johnlive/$2
