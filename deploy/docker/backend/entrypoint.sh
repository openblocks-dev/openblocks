#!/bin/bash

set -e

USER_ID=${UID:-9001}
GROUP_ID=${GID:-9001}
GROUP_NAME="openblocks_${GROUP_ID}"
USER_NAME="openblocks_${USER_ID}"

groupadd -g $GROUP_ID $GROUP_NAME || true
useradd -u $USER_ID -g $GROUP_ID $USER_NAME || true

APP_JAR="${APP_JAR:-/openblocks/server.jar}"
JAVA_HOME=/openblocks/jre
JAVA_OPTS="${JAVA_OPTS:-}"
CUSTOM_APP_PROPERTIES="${APP_PROPERTIES}"
CONTEXT_PATH=${CONTEXT_PATH:-/}

echo
echo "Running openblocks server with:"
echo "    user id: ${USER_ID}"
echo "   group id: ${GROUP_ID}"
echo "  base path: ${CONTEXT_PATH}"
echo
${JAVA_HOME}/bin/java -version
echo

exec gosu ${USER_ID}:${GROUP_ID} ${JAVA_HOME}/bin/java \
  -Djava.security.egd=file:/dev/./urandom \
  -Dhttps.protocols=TLSv1.1,TLSv1.2 \
  -Dlog4j2.formatMsgNoLookups=true \
  -Dspring.config.location="file:///openblocks/config/application.yml,file:///openblocks/config/application-selfhost.yml" \
  ${JAVA_OPTS} \
  -jar "${APP_JAR}" --spring.webflux.base-path=${CONTEXT_PATH} ${CUSTOM_APP_PROPERTIES}

