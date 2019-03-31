#!/bin/bash

cd server
rm -rf .env
rm -rf config/
cp ../../.env ./
cp -r ../../config ./


cd ..

docker build -f DockerFileBackendServer -t johnlive/backend_server .
#docker run -p 3001:3001 -d chiraggalani25/backend_server
docker push johnlive/backend_server
