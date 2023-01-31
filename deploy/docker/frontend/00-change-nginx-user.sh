#!/bin/sh

set -e

USER_ID=${PUID:=9001}
GROUP_ID=${PGID:=9001}
CLIENT_ROOT=/openblocks/client

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

# Update api-server installation owner
if [ "${DO_CHOWN}" = "true" ]; then
    chown -R ${USER_ID}:${GROUP_ID} ${CLIENT_ROOT}
    echo "Openblocks client files owner modified."
fi;

