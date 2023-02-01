#!/bin/bash

set -e 

NODE_SERVICE_ROOT=/openblocks/node-service

# Update ID of openblocks user if required
if [ ! `id --user openblocks` -eq ${USER_ID} ]; then
    usermod --uid ${USER_ID} openblocks
    echo "ID for openblocks user changed to: ${USER_ID}"
    DO_CHOWN="true"
fi;

# Update ID of openblocks group if required
if [ ! `id --group openblocks` -eq ${GROUP_ID} ]; then
    groupmod --gid ${GROUP_ID} openblocks
    echo "ID for openblocks group changed to: ${GROUP_ID}"
    DO_CHOWN="true"
fi;

# Update node-server installation owner
if [ "${DO_CHOWN}" = "true" ]; then
    echo "Changing node-service owner to ${USER_ID}:${GROUP_ID}"
    chown -R ${USER_ID}:${GROUP_ID} ${NODE_SERVICE_ROOT}
fi;

echo "Openblocks node-service setup finished."
