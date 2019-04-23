#!/bin/bash

cd server-dropbox
rm -rf .env
rm -rf config/
cp ../../.env ./
cp -r ../../config ./

cd ..

docker build -f DockerFileBackendDropbox -t johnlive/backend_dropbox_green .
#docker run -p 3003:3003 -d johnlive/backend_dropbox

docker push johnlive/backend_dropbox_green
