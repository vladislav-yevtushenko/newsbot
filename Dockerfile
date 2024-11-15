# Use the official Node.js image as the base image
FROM node:21
ENV TZ=Asia/Almaty
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
