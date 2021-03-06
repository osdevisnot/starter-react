FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install --quiet

COPY . $WORKDIR
