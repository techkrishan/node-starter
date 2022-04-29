FROM node:16.14.0-alpine

LABEL version="1.0"
LABEL description="Development image for the API server"

WORKDIR /usr/src/app

COPY ./package.json .

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 8095

CMD ["npm", "run", "dev"]