FROM node:alpine

WORKDIR /app
COPY . /app

RUN npm install

# Expone el puerto 8100
EXPOSE 8100

# Instala las dependencias y ejecuta la aplicación Angular/Ionic
# CMD ["ionic", "serve", "--host", "0.0.0.0", "--port", "8100"]
CMD ["npx", "ionic", "serve", "--host", "0.0.0.0", "--port", "8100"]
