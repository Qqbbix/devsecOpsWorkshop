FROM node:16.16-alpine as builder

WORKDIR /usr/src/app/

COPY . .

RUN npm install && \
    npm run build

FROM nginx:1.23-alpine

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html/
