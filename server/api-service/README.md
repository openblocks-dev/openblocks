# Server Setup

This document explains how to start Openblocks server locally.

## System Prerequisites

Java - OpenJDK 17 Maven - Version 3+ (preferably 3.8+)

### MongoDB

If you don't have an available MongoDB, you can start a local MongoDB service with docker:

```shell
docker run -d  --name openblocks-mongodb -p 27017:27017 -e MONGO_INITDB_DATABASE=openblocks mongo
```

Configure the MongoDB connection URI in the application-openblocks.yml
<img src="https://cdn-files.openblocks.dev/server-setup/image1.png"/>

### Redis

If you don't have an available MongoDB, you can start a local Redis service with docker:

```shell
docker run -d --name openblocks-redis -p 6379:6379 redis
```

Configure the Redis connection URI in the application-openblocks.yml
<img src="https://cdn-files.openblocks.dev/server-setup/image2.png"/>

## Build and start the Openblocks server jar

1. Clone Openblocks repository
2. Next, execute the following commands in sequence

```shell
cd server
mvn clean package
java -Dpf4j.mode=development -Dspring.profiles.active=openblocks -Dpf4j.pluginsDir=openblocks-plugins -jar openblocks-server/target/openblocks-server-1.0-SNAPSHOT.jar
```

<img src="https://cdn-files.openblocks.dev/server-setup/start.gif"/>
Now, you can check the status of the service by visiting http://localhost:8080 through your browser. By default, you should see an HTTP 404 error.

<img src="https://cdn-files.openblocks.dev/server-setup/image3.png"/>

## Start with IntelliJ IDEA

Configure the Run/Debug configuration as shown in the screenshot below, the version used in the screenshot is IntelliJ
IDEA 2021.3.2 (Community Edition):
<img src="https://cdn-files.openblocks.dev/server-setup/image4.png"/>
<img src="https://cdn-files.openblocks.dev/server-setup/image5.png"/>

<table>
    <tr>
        <td style="width: 115px">JDK version</td>
        <td>Java 17  </td>
    </tr>
    <tr>
        <td>-cp </td>
        <td>openblocks-server </td>
    </tr>
    <tr>
        <td>VM options </td>
        <td>-Dpf4j.mode=development -Dpf4j.pluginsDir=openblocks-plugins -Dspring.profiles.active=openblocks -XX:+AllowRedefinitionToAddDeleteMethods --add-opens java.base/java.nio=ALL-UNNAMED</td>
    </tr>
    <tr>
        <td>Main class </td>
        <td>com.openblocks.api.ServerApplication </td>
    </tr>
</table>

Next, execute the following commands in sequence

```shell
cd server
mvn clean package
```

After Maven package runs successfully, you can start the Openblocks server with IntelliJ IDEA.