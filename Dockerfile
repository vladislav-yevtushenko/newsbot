# Use the official Node.js image as the base image
FROM node:21

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["sh", "-c", "npm start && npm run scheduler"]

