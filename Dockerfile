
FROM node
WORKDIR /app
RUN npm install
RUN npm build
RUN npm start
