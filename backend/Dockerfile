FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app
COPY . /app

RUN apk add --no-cache bash
RUN chmod +x mvnw

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]
