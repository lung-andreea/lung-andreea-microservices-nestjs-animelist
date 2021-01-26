FROM node:12.10-slim

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

EXPOSE 8080

CMD ["yarn", "run", "start:dev"]
