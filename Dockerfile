FROM node:lts

WORKDIR /var/www

COPY ./package*.json ./

RUN npm install

COPY . .

CMD npx nodemon server.js
