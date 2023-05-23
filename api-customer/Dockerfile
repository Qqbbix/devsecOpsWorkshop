FROM node:16.16-alpine

WORKDIR /app/

ENV NODE_ENV = "production"

COPY package* ./

RUN npm install --verbose --production

CMD [ "npm","run", "start" ]

COPY ./src/ ./src/
