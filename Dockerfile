FROM node:16-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD node index2.js
