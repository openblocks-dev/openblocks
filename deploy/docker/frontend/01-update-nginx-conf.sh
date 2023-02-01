#!/bin/sh

set -e 

sed -i "s@__OPENBLOCKS_API_SERVICE_URL__@${OPENBLOCKS_API_SERVICE_URL:=http://localhost:8080}@" /etc/nginx/nginx.conf
sed -i "s@__OPENBLOCKS_NODE_SERVICE_URL__@${OPENBLOCKS_NODE_SERVICE_URL:=http://localhost:6060}@" /etc/nginx/nginx.conf

echo "nginx config updated with:"
echo "    Openblocks api service URL: ${OPENBLOCKS_API_SERVICE_URL}"
echo "   Openblocks node service URL: ${OPENBLOCKS_NODE_SERVICE_URL}"
