

FROM node:19-alpine3.15
WORKDIR /app
COPY package*.json ./ 
RUN echo "running npm install ..."
RUN npm ci --omit=dev
RUN echo "Finished npm install"

COPY . ./
RUN echo "running run build ..."
RUN npm run build
RUN echo "Finished run build ..."
RUN echo "running npm start"
RUN npm start
RUN echo "Finished running npm start"

EXPOSE 8080
