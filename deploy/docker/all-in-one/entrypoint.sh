#!/bin/bash

set -e

export USER_ID=${PUID:=9001}
export GROUP_ID=${PGID:=9001}

# Update ID of openblocks user if required
if [ ! `id --user openblocks` -eq ${USER_ID} ]; then
    usermod --uid ${USER_ID} openblocks
    echo "ID for openblocks user changed to: ${USER_ID}"
fi;

# Update ID of openblocks group if required
if [ ! `id --group openblocks` -eq ${GROUP_ID} ]; then
    groupmod --gid ${GROUP_ID} openblocks
    echo "ID for openblocks group changed to: ${GROUP_ID}"
fi;

LOGS="/openblocks-stacks/logs"
DATA="/openblocks-stacks/data"
# Create folder for holding application logs and data
mkdir -p ${LOGS}/redis \
  ${LOGS}/mongodb \
  ${LOGS}/api-service \
  ${LOGS}/node-service \
  ${LOGS}/frontend \
  ${DATA}/redis \
  ${DATA}/mongodb

# Update owner of logs and data
chown -R ${USER_ID}:${GROUP_ID} /openblocks-stacks/ /openblocks/etc


# Enable services
SUPERVISOR_AVAILABLE="/openblocks/etc/supervisord/conf-available"
SUPERVISOR_ENABLED="/openblocks/etc/supervisord/conf-enabled"

# Create folder for supervisor conf-enabled
mkdir -p ${SUPERVISOR_ENABLED}

# Recreate links to enabled services
rm -f ${SUPERVISOR_ENABLED}/*.conf

# Enable redis if configured to run
if [ "${REDIS_ENABLED:=true}" = "true" ]; then
    ln ${SUPERVISOR_AVAILABLE}/01-redis.conf ${SUPERVISOR_ENABLED}/01-redis.conf
fi;

# Enable mongodb if configured to run
if [ "${MONGODB_ENABLED:=true}" = "true" ]; then
    ln ${SUPERVISOR_AVAILABLE}/02-mongodb.conf ${SUPERVISOR_ENABLED}/02-mongodb.conf
fi;

# Enable api-service if configured to run
if [ "${API_SERVICE_ENABLED:=true}" = "true" ]; then
    ln ${SUPERVISOR_AVAILABLE}/10-api-service.conf ${SUPERVISOR_ENABLED}/10-api-service.conf
fi;

# Enable node-service if configured to run
if [ "${NODE_SERVICE_ENABLED:=true}" = "true" ]; then
    ln ${SUPERVISOR_AVAILABLE}/11-node-service.conf ${SUPERVISOR_ENABLED}/11-node-service.conf
fi;

# Enable forntend if configured to run
if [ "${FRONTEND_ENABLED:=true}" = "true" ]; then
   ln ${SUPERVISOR_AVAILABLE}/20-frontend.conf ${SUPERVISOR_ENABLED}/20-frontend.conf
fi;

# Handle CMD command
"$@"
