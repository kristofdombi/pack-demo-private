FROM node:16-alpine

WORKDIR /usr/src/app
RUN apk add curl
COPY . .
RUN npm install
RUN curl https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2

CMD node index2.js
