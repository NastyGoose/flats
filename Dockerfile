FROM node:carbon
WORKDIR /src/flatsAPI
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
RUN npm run build

FROM nginx
COPY build ./
