FROM node:alpine

WORKDIR /posts

COPY ./package.json ./

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm install

COPY ./node_modules/blog-common/ ./node_modules/blog-common/

COPY ./ ./

CMD ["npm", "start"]
