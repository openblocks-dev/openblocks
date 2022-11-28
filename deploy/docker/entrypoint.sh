#!/bin/sh

set -e

init_mongodb() {
  echo "Init mongoDB"
  MONGO_DB_PATH="/openblocks-stacks/data/mongodb"
  mkdir -p "$MONGO_DB_PATH"
}

init_configuration() {
  echo "Init configuration"
  CONFIG_PATH="/openblocks-stacks/configuration"
  YML_PATH="$CONFIG_PATH/application-selfhost.yml"
  if ! [ -e "$YML_PATH" ]; then
    echo "yml configuration not exist"
    mkdir -p "$CONFIG_PATH"
    cp /openblocks/env2/application-selfhost.yml $CONFIG_PATH/
  fi
}

add_user() {
  USER_ID=${LOCAL_USER_ID:-9001}
  GROUP_ID=$USER_ID
  USER_NAME="openblocks_$USER_ID"
  GROUP_NAME=$USER_NAME
  echo "Starting with UID : $USER_ID"
  groupadd -g $GROUP_ID $GROUP_NAME || true
  useradd -u $USER_ID -g $GROUP_ID $USER_NAME || true
  chown -R $USER_ID:$GROUP_ID /openblocks /openblocks-stacks /etc/nginx /var /etc/redis /run /etc/supervisor
}

init_mongodb
init_configuration
# Create sub-directory to store services log in the container mounting folder
mkdir -p /openblocks-stacks/logs/backend
mkdir -p /openblocks-stacks/logs/frontend
mkdir -p /openblocks-stacks/logs/redis
mkdir -p /openblocks-stacks/data/redis

add_user

# Handle CMD command
exec gosu $USER_NAME "$@"
