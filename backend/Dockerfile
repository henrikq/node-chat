FROM node:10.15.1

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY .babelrc .
COPY ./src ./src
COPY wait-for-it.sh .
RUN chmod u+x wait-for-it.sh

CMD ["./wait-for-it.sh", "mongo:27017", "--", "npm", "run", "production"]
# CMD npm run production
