FROM node:alpine

WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 7100

CMD ["npx", "ionic", "serve", "--external", "--port", "7100", "--disable-host-check"]
