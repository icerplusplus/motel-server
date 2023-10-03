FROM node:20-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli --force

COPY package*.json ./

COPY . .

RUN npm install --force

RUN npm run build --force
CMD ["npm", "run", "start:dev"]
