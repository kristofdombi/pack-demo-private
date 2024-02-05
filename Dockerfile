FROM node:16-alpine

ENV TERM=xterm-256color

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD node index2.js
