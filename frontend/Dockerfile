FROM node:16-alpine3.12

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
