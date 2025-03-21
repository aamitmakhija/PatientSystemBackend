FROM node:16.20.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --no-package-lock --legacy-peer-deps

COPY . .

EXPOSE 5001

ENV NODE_ENV=production

CMD ["node", "server.js"]