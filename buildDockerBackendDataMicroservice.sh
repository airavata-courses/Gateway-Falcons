kill -9 $(lsof -i:3002 -t) || echo $?

cd ./server-data-ms
rm -rf .env
rm -rf config/
cp ../../.env ./
cp -r ../../config ./


cd ..
docker login
docker build -f DockerFileBackendDataMicroservice -t johnlive/backend_data_microservice .
#docker run -p 3002:3002 -d chiraggalani25/backend_data_microservice

docker push johnlive/backend_data_microservice
