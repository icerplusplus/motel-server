FROM node:18-alpine AS install-dependencies

WORKDIR /user/src/app

RUN npm install -g npm@9.5.0

COPY node_modules .

COPY package.json ./

# RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
