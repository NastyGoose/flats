FROM node:carbon
WORKDIR /src/flatsAPI
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "build" ]
