FROM eclipse-temurin:21
VOLUME /tmp
ARG JAR_FILE=build/libs/e201-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
# Set TimeZone
RUN apt-get update && apt-get install -y tzdata
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Expose
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]