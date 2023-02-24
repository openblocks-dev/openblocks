#!/bin/bash

set -e

export USER_ID="${PUID:=9001}"
export GROUP_ID="${PGID:=9001}"

# Run init script
echo "Initializing api-service..."
/openblocks/api-service/init.sh

APP_JAR="${APP_JAR:=/openblocks/api-service/server.jar}"
JAVA_HOME=/openblocks/api-service/jre
JAVA_OPTS="${JAVA_OPTS:=}"
CUSTOM_APP_PROPERTIES="${APP_PROPERTIES}"
CONTEXT_PATH=${CONTEXT_PATH:=/}

echo
echo "Running openblocks api-server with:"
echo "    user id: ${USER_ID}"
echo "   group id: ${GROUP_ID}"
echo "  base path: ${CONTEXT_PATH}"
echo
${JAVA_HOME}/bin/java -version
echo

cd /openblocks/api-service
exec gosu ${USER_ID}:${GROUP_ID} ${JAVA_HOME}/bin/java \
  -Djava.security.egd=file:/dev/./urandom \
  -Dhttps.protocols=TLSv1.1,TLSv1.2 \
  -Dlog4j2.formatMsgNoLookups=true \
  -Dspring.config.location="file:///openblocks/api-service/config/application.yml,file:///openblocks/api-service/config/application-selfhost.yml" \
  --add-opens java.base/java.nio=ALL-UNNAMED \
  ${JAVA_OPTS} \
  -jar "${APP_JAR}" --spring.webflux.base-path=${CONTEXT_PATH} ${CUSTOM_APP_PROPERTIES}

