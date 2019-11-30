FROM node:12.12.0

WORKDIR /app/src/client

COPY . /app/src/client

RUN npm install

RUN npm rebuild node-sass

EXPOSE 3000

CMD [ "npm", "run", "start"]