kill -9 $(lsof -i:3001 -t) || echo $?

cd ./server
rm -rf .env
rm -rf config/
cp ../../.env ./
cp -r ../../config ./
npm install

cd ..
# docker login
docker build -f DockerFileBackendServer -t chiraggalani25/backend_server .
#docker run -p 3001:3001 -d chiraggalani25/backend_server
docker push chiraggalani25/backend_server
