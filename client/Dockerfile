FROM node:14-alpine

LABEL version="1.0"
LABEL description="This is the base docker for the Skroutz Last Mile assignment"


WORKDIR /project

COPY package*.json ./

RUN npm install ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]