FROM node:18-alpine 

WORKDIR /TASK1/src/app

COPY package*.json ./

RUN npm ci


COPY . .

RUN npm run build


CMD [ "node" ,"dist/main.js" ]
