FROM node:12
WORKDIR C:/Users/Proteem Ganguly/Desktop/POC/Docker_test/Manual_Test

COPY package*.json ./

RUN npm install
EXPOSE 5000
CMD [ "node", "app.js" ]