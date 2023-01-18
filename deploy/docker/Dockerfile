FROM maven:3.8.4-openjdk-17-slim AS build-server
COPY ./server/api-service /openblocks-server
WORKDIR /openblocks-server
RUN --mount=type=cache,target=/root/.m2 mvn -f pom.xml clean package -DskipTests

FROM node:slim AS build-client
COPY ./client /openblocks-client
WORKDIR /openblocks-client
RUN yarn --immutable

ARG REACT_APP_COMMIT_ID=test
ARG REACT_APP_ENV=production
ARG REACT_APP_EDITION=community
RUN yarn build

FROM node:slim AS build-node
COPY ./server/node-service /openblocks-node
WORKDIR /openblocks-node
RUN yarn --immutable
RUN yarn build

FROM openjdk:17-slim AS jre-build
RUN jlink --add-modules java.base,java.compiler,java.datatransfer,java.desktop,java.instrument,java.logging,java.management,java.management.rmi,java.naming,java.net.http,java.prefs,java.rmi,java.scripting,java.se,java.security.jgss,java.security.sasl,java.smartcardio,java.sql,java.sql.rowset,java.transaction.xa,java.xml,java.xml.crypto,jdk.accessibility,jdk.charsets,jdk.crypto.cryptoki,jdk.crypto.ec,jdk.dynalink,jdk.httpserver,jdk.incubator.foreign,jdk.incubator.vector,jdk.internal.vm.ci,jdk.jdwp.agent,jdk.jfr,jdk.jsobject,jdk.localedata,jdk.management,jdk.management.agent,jdk.management.jfr,jdk.naming.dns,jdk.naming.rmi,jdk.net,jdk.nio.mapmode,jdk.sctp,jdk.security.auth,jdk.security.jgss,jdk.unsupported,jdk.xml.dom,jdk.zipfs,jdk.attach \
          --output /build/jre \
          --no-man-pages \
          --no-header-files \
          --compress=2

FROM ubuntu:20.04
LABEL maintainer="openblocks"

# Update APT packages - Base Layer  python-setuptools
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
  apt-get install --no-install-recommends -y \
  supervisor curl nginx wget netcat software-properties-common gettext python3-pip git gnupg vim iputils-ping gosu\
  && add-apt-repository ppa:redislabs/redis \
  && apt-get remove -y git python3-pip \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install MongoDB v4.0.5, Redis - Service Layer
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -

RUN echo "deb [ arch=amd64,arm64 ]http://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list \
  && apt-get remove wget -y

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get -y install --no-install-recommends -y mongodb-org=4.4.6 redis nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g yarn

# Clean up cache file - Service layer
RUN rm -rf \
  /root/.cache \
  /root/.npm \
  /root/.pip \
  /usr/local/share/doc \
  /usr/share/doc \
  /usr/share/man \
  /var/lib/apt/lists/* \
  /tmp/*

# Define volumes - Service Layer
VOLUME [ "/openblocks-stacks" ]

ENV OPENBLOCKS_SERVER_PROXY_PASS http://localhost:8080
ENV OPENBLOCKS_NODE_PROXY_PASS http://localhost:6060

# copy jre
COPY --from=jre-build /build/jre /app

ARG JAR_FILE=/openblocks-server/openblocks-server/target/openblocks-server-1.0-SNAPSHOT.jar
ARG PLUGIN_JARS=/openblocks-server/openblocks-plugins/*/target/*.jar

RUN mkdir -p /openblocks /openblocks/plugins /var/www/openblocks /env2

COPY --from=build-server ${JAR_FILE} /openblocks/server/api-service/server.jar
COPY --from=build-server ${PLUGIN_JARS} /openblocks/server/api-service/plugins/

# copy tace-fe build
COPY --from=build-client /openblocks-client/packages/openblocks/build/ /openblocks/client/

# copy node-service
COPY --from=build-node /openblocks-node /openblocks/server/node-service
COPY ./deploy/docker/scripts/start-node-service.sh /openblocks/server/node-service/start-node-service.sh

# copy nginx conf
COPY ./deploy/docker/templates/nginx/* /openblocks/nginx/
COPY ./deploy/docker/scripts/start-nginx.sh /openblocks/nginx/start-nginx.sh

# copy redis conf
COPY ./deploy/docker/templates/redis.conf /etc/redis/redis.conf

# Add process config to be run by supervisord
COPY ./deploy/docker/templates/supervisord.conf /etc/supervisor/supervisord.conf
COPY ./deploy/docker/templates/supervisord/*  /etc/supervisor/conf.d/

# copy application.yml
COPY ./server/api-service/openblocks-server/src/main/resources/selfhost/ce/application.yml /openblocks/env/
COPY ./server/api-service/openblocks-server/src/main/resources/selfhost/ce/application-selfhost.yml /openblocks/env2/

# Add bootstrapfile
COPY ./deploy/docker/entrypoint.sh /openblocks/
RUN chmod +x /openblocks/entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "sh" , "/openblocks/entrypoint.sh" ]
CMD ["/usr/bin/supervisord", "-n" , "-c" , "/etc/supervisor/supervisord.conf"]

