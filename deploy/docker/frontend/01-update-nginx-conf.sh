#!/bin/sh

# remove trailing slash(es)
CONTEXT_PATH=$(echo "${CONTEXT_PATH:-}" | sed 's@/*$@@')
ROOT_PATH="${CONTEXT_PATH}"
if [ -z "${CONTEXT_PATH}" ]; then
    ROOT_PATH="/"
fi;

sed -i "s@__CONTEXT_PATH__ {@${ROOT_PATH} {@" /etc/nginx/nginx.conf
sed -i "s@__CONTEXT_PATH__@${CONTEXT_PATH}@" /etc/nginx/nginx.conf
sed -i "s@__OPENBLOCKS_SERVER_URL__@${OPENBLOCKS_SERVER_URL:-http://localhost:3000}@" /etc/nginx/nginx.conf

