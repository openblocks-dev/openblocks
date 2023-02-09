##
## Create custom JRE for running Openblocks server application
##
FROM eclipse-temurin:17-jdk-jammy AS jre-build
RUN jlink --add-modules java.base,java.compiler,java.datatransfer,java.desktop,java.instrument,java.logging,java.management,java.management.rmi,java.naming,java.net.http,java.prefs,java.rmi,java.scripting,java.se,java.security.jgss,java.security.sasl,java.smartcardio,java.sql,java.sql.rowset,java.transaction.xa,java.xml,java.xml.crypto,jdk.accessibility,jdk.charsets,jdk.crypto.cryptoki,jdk.crypto.ec,jdk.dynalink,jdk.httpserver,jdk.incubator.foreign,jdk.incubator.vector,jdk.internal.vm.ci,jdk.jdwp.agent,jdk.jfr,jdk.jsobject,jdk.localedata,jdk.management,jdk.management.agent,jdk.management.jfr,jdk.naming.dns,jdk.naming.rmi,jdk.net,jdk.nio.mapmode,jdk.sctp,jdk.security.auth,jdk.security.jgss,jdk.unsupported,jdk.xml.dom,jdk.zipfs,jdk.attach \
          --output /build/jre \
          --no-man-pages \
          --no-header-files \
          --compress=2

##
## Build Openblocks api-service application
##
FROM maven:3.8-eclipse-temurin-17 AS build-api-service
COPY ./server/api-service /openblocks-server
WORKDIR /openblocks-server
RUN --mount=type=cache,target=/root/.m2 mvn -f pom.xml clean package -DskipTests

# Create required folder structure
RUN mkdir -p /openblocks/api-service/plugins /openblocks/api-service/config /openblocks/api-service/logs

# Define openblocks main jar and plugin jars
ARG JAR_FILE=/openblocks-server/openblocks-server/target/openblocks-server-1.0-SNAPSHOT.jar
ARG PLUGIN_JARS=/openblocks-server/openblocks-plugins/*/target/*.jar

# Copy Java runtime for running server
COPY --from=jre-build /build/jre /openblocks/api-service/jre

# Copy openblocks server application and plugins
RUN cp ${JAR_FILE} /openblocks/api-service/server.jar \
  && cp ${PLUGIN_JARS} /openblocks/api-service/plugins/

# Copy openblocks server configuration
COPY server/api-service/openblocks-server/src/main/resources/selfhost/ce/application.yml /openblocks/api-service/config/
COPY server/api-service/openblocks-server/src/main/resources/selfhost/ce/application-selfhost.yml /openblocks/api-service/config/

# Add bootstrapfile
COPY deploy/docker/api-service/entrypoint.sh /openblocks/api-service/entrypoint.sh
COPY deploy/docker/api-service/init.sh /openblocks/api-service/init.sh
RUN chmod +x /openblocks/api-service/*.sh 

##
## Intermediary Openblocks api-service image
##
## To create a separate image out of it, build it with:
##   DOCKER_BUILDKIT=1 docker build -f deploy/docker/Dockerfile -t openblocksdev/openblocks-ce-api-service --target openblocks-ce-api-service .
##
FROM ubuntu:jammy as openblocks-ce-api-service
LABEL maintainer="openblocks"

RUN apt-get update && apt-get install -y --no-install-recommends gosu \
  && rm -rf /var/cache/apt/lists \
  && addgroup --system --gid 9001 openblocks \
  && adduser --system --disabled-password --no-create-home --uid 9001 --gid 9001 openblocks

# Copy openblocks server configuration
COPY --chown=openblocks:openblocks --from=build-api-service /openblocks/api-service /openblocks/api-service

EXPOSE 8080
CMD [ "sh" , "/openblocks/api-service/entrypoint.sh" ]

#############################################################################

##
## Build openblocks node service
##
FROM ubuntu:jammy as build-node-service

RUN apt update && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y curl ca-certificates

# Download nodejs and install yarn
RUN curl -sL https://deb.nodesource.com/setup_19.x | bash - \
&& apt-get install --no-install-recommends -y nodejs \
&& npm install -g yarn

# Copy and build the node-service app
COPY server/node-service/ /openblocks/node-service/app/
WORKDIR /openblocks/node-service/app/
RUN yarn --immutable
RUN yarn build

# Copy startup script
COPY deploy/docker/node-service/entrypoint.sh /openblocks/node-service/entrypoint.sh
COPY deploy/docker/node-service/init.sh /openblocks/node-service/init.sh
RUN chmod +x /openblocks/node-service/*.sh

##
## Intermediary Openblocks node service image
##
## To create a separate image out of it, build it with:
##   DOCKER_BUILDKIT=1 docker build -f deploy/docker/Dockerfile -t openblocksdev/openblocks-ce-node-service --target openblocks-ce-node-service .
##
FROM ubuntu:jammy as openblocks-ce-node-service
LABEL maintainer="openblocks"

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y curl ca-certificates \
  && curl -sL https://deb.nodesource.com/setup_19.x | bash - \
  && apt-get install --no-install-recommends -y nodejs gosu \
  && npm install -g yarn \
  && rm -rf /var/cache/apt/lists \
  && addgroup --system --gid 9001 openblocks \
  && adduser --system --disabled-password --no-create-home --uid 9001 --gid 9001 openblocks

COPY --from=build-node-service /openblocks/node-service /openblocks/node-service

EXPOSE 6060
CMD [ "/bin/sh", "/openblocks/node-service/entrypoint.sh" ]

#############################################################################

##
## Build openblocks client application
##
FROM node:19.4-slim AS build-client
COPY ./client /openblocks-client
WORKDIR /openblocks-client
RUN yarn --immutable

# curl is required for yarn build to succeed, because it calls it while building client
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates

ARG REACT_APP_COMMIT_ID=test
ARG REACT_APP_ENV=production
ARG REACT_APP_EDITION=community
ARG REACT_APP_DISABLE_JS_SANDBOX=true
RUN yarn build


##
## Intermediary Openblocks client image
##
## To create a separate image out of it, build it with:
##   DOCKER_BUILDKIT=1 docker build -f deploy/docker/Dockerfile -t openblocksdev/openblocks-ce-frontend --target openblocks-ce-frontend .
##
FROM nginx:1.23.3 as openblocks-ce-frontend
LABEL maintainer="openblocks"

# Change default nginx user into openblocks user
RUN usermod --login openblocks --uid 9001 nginx \
  && groupmod --new-name openblocks --gid 9001 nginx

# Copy openblocks client data
COPY --chown=openblocks:openblocks --from=build-client /openblocks-client/packages/openblocks/build/ /openblocks/client

# Copy additional nginx init scripts
COPY deploy/docker/frontend/00-change-nginx-user.sh /docker-entrypoint.d/00-change-nginx-user.sh
COPY deploy/docker/frontend/01-update-nginx-conf.sh /docker-entrypoint.d/01-update-nginx-conf.sh

RUN chmod +x /docker-entrypoint.d/00-change-nginx-user.sh && \
    chmod +x /docker-entrypoint.d/01-update-nginx-conf.sh

COPY deploy/docker/frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000

#############################################################################

##
## Build Openblocks all-in-one image
##
FROM openblocks-ce-frontend
LABEL maintainer="openblocks"

# Install required packages
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y bash gnupg curl lsb-release \
  && curl -fsSL https://packages.redis.io/gpg | gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg \
  && echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb bullseye main" | tee /etc/apt/sources.list.d/redis.list \
  && curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg \
  && echo "deb [signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg arch=amd64,arm64] http://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list \
  && curl -sL https://deb.nodesource.com/setup_19.x | bash - \
  && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get -y install --no-install-recommends -y \
      mongodb-org \
      redis \
      supervisor \
      gosu \
      nodejs \
  && npm install -g yarn \
  && rm -rf /var/cache/apt/lists

# Add openblocks api-service
COPY --chown=openblocks:openblocks --from=openblocks-ce-api-service /openblocks/api-service /openblocks/api-service

# Add openblocks node-service
COPY --chown=openblocks:openblocks --from=openblocks-ce-node-service /openblocks/node-service /openblocks/node-service

# Add services configuration
COPY --chown=openblocks:openblocks deploy/docker/all-in-one/etc /openblocks/etc

# Add startup script
COPY --chown=openblocks:openblocks deploy/docker/all-in-one/entrypoint.sh /openblocks/entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "/bin/sh" , "/openblocks/entrypoint.sh" ]
CMD ["/usr/bin/supervisord", "-n" , "-c" , "/openblocks/etc/supervisord.conf"]

