FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/persons/


RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD [ "npx", "serve", "build" ]