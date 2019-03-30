kill -9 $(lsof -i:3003 -t) || echo $?

cd ./server-dropbox
rm -rf .env
rm -rf config/
cp ../../.env ./
cp -r ../../config ./
npm install

cd ..
docker login
docker build -f DockerFileBackendDropbox -t johnlive/backend_dropbox .
#docker run -p 3003:3003 -d chiraggalani25/backend_dropbox

docker push johnlive/backend_dropbox
