FROM node:10.15.2

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY ./src ./src
COPY ./public ./public

RUN sed -i "s/localhost:5000/backend:5000/g" package.json

# TODO: add nginx

CMD npm run start
