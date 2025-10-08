#
# Build stage
#
FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests


FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/UrbanIndie-Backend-0.0.1-SNAPSHOT.jar UrbanIndie-Backend-0.0.1-SNAPSHOT.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","UrbanIndie-Backend-0.0.1-SNAPSHOT.jar"]


