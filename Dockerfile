FROM node:12

WORKDIR /app/src/server

COPY ./server /app/src/server

RUN npm install

WORKDIR /app/src/client

COPY ./client /app/src/client

RUN npm install

RUN npm rebuild node-sass

RUN npm run build

WORKDIR /app/src/server

EXPOSE 4000

CMD ["node", "app.js"]