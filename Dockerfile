FROM node:16-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 8080

CMD node index2.js
