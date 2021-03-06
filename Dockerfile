FROM node:10.16.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm config set @bit:registry https://node.bitsrc.io
RUN npm install
COPY . /usr/src/app

EXPOSE 3000
