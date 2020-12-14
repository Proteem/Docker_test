#!/bin/bash
FROM node:12

COPY package*.json ./

RUN npm install
EXPOSE 5000
CMD [ "node", "app.js" ]