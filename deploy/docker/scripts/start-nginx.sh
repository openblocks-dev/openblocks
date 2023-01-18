#!/bin/sh

# This script is baked into the Dockerfile and is used to boot Nginx when the Docker container starts
# Refer: /app/client/Dockerfile
set -o errexit
set -o xtrace

cp /openblocks/nginx/nginx-root.conf.template /etc/nginx/nginx.conf

if [ -e "/openblocks-stacks/ssl/fullchain.pem" ] && [ -e "/openblocks-stacks/ssl/privkey.pem" ];
    then
        envsubst '$OPENBLOCKS_SERVER_PROXY_PASS,$OPENBLOCKS_NODE_PROXY_PASS' < /openblocks/nginx/nginx-app-https.conf.template > /etc/nginx/conf.d/default.conf
    else
        envsubst '$OPENBLOCKS_SERVER_PROXY_PASS,$OPENBLOCKS_NODE_PROXY_PASS' < /openblocks/nginx/nginx-app-http.conf.template > /etc/nginx/conf.d/default.conf
fi

exec nginx -g 'daemon off;'
