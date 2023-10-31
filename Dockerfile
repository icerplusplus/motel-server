FROM node:18.16.0

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json /app/

RUN npm i --force

COPY . .

EXPOSE 8080
# RUN npm run build

CMD ["npm", "run", "start:dev"]
