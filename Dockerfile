


FROM node:19-alpine3.15
## ARGs need to be inside of FROM, or the ENV would not catch it.
ARG PORT=8080
ARG MONGO_URI
ARG JWT_SECRET

ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET
ENV PORT=$PORT

RUN echo $MONGO_URI
RUN echo $PORT
RUN echo $JWT_SECRET

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
RUN echo "Finished running npm start"

EXPOSE $PORT
