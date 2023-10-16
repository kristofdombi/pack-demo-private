FROM node:16-alpine

RUN echo 1
RUN sleep 180
RUN echo 2

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD node index2.js
