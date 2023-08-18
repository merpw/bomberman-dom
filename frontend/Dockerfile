FROM node:alpine as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

CMD npm run start -- --port 80 --host

EXPOSE 80

# TODO: Add multi-stage build (for some reason it doesn't work)