FROM node:lts-alpine3.12 as builder
RUN apk add yarn

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
EXPOSE 5328

CMD ["yarn", "start"]
