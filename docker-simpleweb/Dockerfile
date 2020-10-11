FROM node:alpine

WORKDIR /usr/simpleweb

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]