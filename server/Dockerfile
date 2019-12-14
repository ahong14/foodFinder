FROM node:12.12.0

WORKDIR /app/src/server

COPY . /app/src/server

RUN npm install bcrypt

RUN npm install 

RUN npm install nodemon -g

EXPOSE 4000

CMD [ "nodemon", "app.js" ]