FROM node:16-alpine

WORKDIR /usr/src/app
COPY . .

RUN npm config set color always
RUN npm install

CMD node index2.js
