#!/bin/sh

USER_ID=${UID:-9001}
GROUP_ID=${GID:-9001}

usermod -u ${USER_ID} nginx || true
groupmod -g ${GROUP_ID} nginx || true

echo "nginx user and group id modified."
