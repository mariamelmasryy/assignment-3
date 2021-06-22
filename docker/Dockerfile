FROM node:12-alpine

RUN apk update && apk upgrade
#&& apk add python g++ gcc libgcc libstdc++ linux-headers make

#RUN npm install -g pm2

RUN apk update

WORKDIR /app

CMD node index.js
