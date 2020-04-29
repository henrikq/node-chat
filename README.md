# node-chat

## Build and run

```
docker-compose build
docker-compose up
```

, then open the application at http://localhost:4000/.


## Run frontend locally

- Run the backend using `docker-compose up backend`, or locally as described below.
```
cd frontend
npm ci
npm run start
```
, the application should open in your browser. If not, go to   http://localhost:3000/.


## Run the backend locally

- Run mongodb using `docker-compose up mongo`
```
cd backend
npm ci
npm run start
```
, the backend should be running at http://localhost:5000

## Mongodb

As described above, you can run couchdb using
```
docker-compose up mongo
```
