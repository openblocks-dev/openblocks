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
        cp /env/application-selfhost.yml $CONFIG_PATH/
    fi
}

init_mongodb

init_configuration

# Create sub-directory to store services log in the container mounting folder
mkdir -p /openblocks-stacks/logs/backend
mkdir -p /openblocks-stacks/logs/frontend
mkdir -p /openblocks-stacks/logs/mongodb
mkdir -p /openblocks-stacks/logs/redis
mkdir -p /openblocks-stacks/data/redis

# Handle CMD command
exec "$@"
