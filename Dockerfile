

FROM node
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm build
RUN npm start
