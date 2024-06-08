FROM node:alpine

WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 7100

CMD ["npx", "ionic", "serve", "--host", "0.0.0.0", "--port", "7100", "--disable-host-check", "--disableHostCheck true"]
