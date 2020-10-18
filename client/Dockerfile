FROM node:alpine

ENV CI=true

WORKDIR /posts

COPY ./package.json ./

#RUN apk update && apk upgrade && \
  #  apk add --no-cache bash git openssh

#RUN npm install

COPY ./ ./

CMD ["npm", "start"]
