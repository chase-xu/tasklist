

FROM node
WORKDIR /app
COPY package*.json ./ 
RUN npm ci --only=production --omit=dev

COPY . ./
RUN npm build
RUN npm start

EXPOSE 8080
