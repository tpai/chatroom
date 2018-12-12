FROM node:8-alpine

WORKDIR /data

COPY package.json /data
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN yarn global add node-gyp
RUN yarn

COPY . /data

EXPOSE 8080
CMD yarn build && yarn start
