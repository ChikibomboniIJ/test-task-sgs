FROM node:alpine

WORKDIR /client-app

COPY ./package*.json /client-app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]