FROM node:16.3.0

LABEL version="1.0"
LABEL description="This is the base docker for the Skroutz Last Mile assignment"


WORKDIR /project

COPY package*.json ./
RUN ls
RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]