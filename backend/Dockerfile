# Yeah... I'm not sacrificing another 3GB of disk space just for this...
# Using a minimal Alpine install
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
