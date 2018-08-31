FROM node:alpine

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

USER node

EXPOSE 3000
CMD [ "npm", "start" ]