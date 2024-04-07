FROM node:18.19.0-alpine3.18

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD ["node", "./src/app.js"]