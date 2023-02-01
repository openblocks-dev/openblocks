# Openblocks docker image

Included Dockerfile can be used to build an **all-in-one** image with all required services installed and running within one container, or separate images for frontend and backend services.

For examples on running the all-in-one image or the multi image deployment see **deploy/docker/docker-compose.yaml** and **deploy/docker/docker-compose-multi.yaml**


## all-in-one image

This image contains all services needed to run Openblocks platform in one container.

### Building the image

This is the default target and can be built by running following command from project root:

```
DOCKER_BUILDKIT=1 docker build -f deploy/docker/Dockerfile -t openblocksdev/openblocks-ce .
```

### Configuration

Image can be configured by setting environment variables.

| Environment variable            | Description                                                         | Value                                                   |
| --------------------------------| --------------------------------------------------------------------| ------------------------------------------------------- |
| `REDIS_ENABLED`                 | If **true** redis server is started in the container                | `true`                                                  |
| `MONGODB_ENABLED`               | If **true** mongo database is started in the container              | `true`                                                  |
| `API_SERVICE_ENABLED`           | If **true** openblocks api-service is started in the container      | `true`                                                  |
| `NODE_SERVICE_ENABLED`          | If **true** openblocks node-service is started in the container     | `true`                                                  |
| `FRONTEND_ENABLED`              | If **true** openblocks web frontend is started in the container     | `true`                                                  |
| `PUID`                          | ID of user running services. It will own all created logs and data. | `9001`                                                  |
| `PGID`                          | ID of group of the user running services.                           | `9001`                                                  |
| `MONGODB_URI`                   | Mongo database connection string                                    | `mongodb://localhost:27017/openblocks?authSource=admin` |
| `REDIS_URL`                     | Redis server URL                                                    | `redis://localhost:6379`                                |
| `JS_EXECUTOR_URI`               | Node service URL                                                    | `http://localhost:6060`                                 |
| `ENABLE_USER_SIGN_UP`           | Enable registration of new users                                    | `true`                                                  |
| `ENCRYPTION_PASSWORD`           | Encryption password                                                 | `openblocks.dev`                                        |
| `ENCRYPTION_SALT`               | Salt used for encrypting password                                   | `openblocks.dev`                                        |
| `CORS_ALLOWED_DOMAINS`          | CORS allowed domains                                                | `*`                                                     |
| `OPENBLOCKS_API_SERVICE_URL`    | Openblocks API service URL                                          | `http://localhost:8080`                                 |
| `OPENBLOCKS_NODE_SERVICE_URL`   | Openblocks Node service (js executor) URL                           | `http://localhost:6060`                                 |


## Building api-service image

Standalone Openblocks api-service image.

### Building the image

From project root run:

```
DOCKER_BUILDKIT=1 docker build -f deploy/docker/Dockerfile -t openblocksdev/openblocks-ce-api-service --target openblocks-ce-api-service .
```

### Configuration

Image can be configured by setting environment variables.

| Environment variable            | Description                                                         | Value                                                   |
| --------------------------------| --------------------------------------------------------------------| ------------------------------------------------------- |
| `PUID`                          | ID of user running services. It will own all created logs and data. | `9001`                                                  |
| `PGID`                          | ID of group of the user running services.                           | `9001`                                                  |
| `MONGODB_URI`                   | Mongo database connection string                                    | `mongodb://localhost:27017/openblocks?authSource=admin` |
| `REDIS_URL`                     | Redis server URL                                                    | `redis://localhost:6379`                                |
| `JS_EXECUTOR_URI`               | Node service URL                                                    | `http://localhost:6060`                                 |
| `ENABLE_USER_SIGN_UP`           | Enable registration of new users                                    | `true`                                                  |
| `ENCRYPTION_PASSWORD`           | Encryption password                                                 | `openblocks.dev`                                        |
| `ENCRYPTION_SALT`               | Salt used for encrypting password                                   | `openblocks.dev`                                        |
| `CORS_ALLOWED_DOMAINS`          | CORS allowed domains                                                | `*`                                                     |


## Building node-service image

Standalone Openblocks node-service (JS executor) image.

### Building the image

From project root run:

```
DOCKER_BUILDKIT=1 docker build -f deploy/docker/Dockerfile -t openblocksdev/openblocks-ce-node-service --target openblocks-ce-node-service .
```

### Configuration

Image can be configured by setting environment variables.

| Environment variable            | Description                                                         | Value                                                   |
| --------------------------------| --------------------------------------------------------------------| ------------------------------------------------------- |
| `PUID`                          | ID of user running services. It will own all created logs and data. | `9001`                                                  |
| `PGID`                          | ID of group of the user running services.                           | `9001`                                                  |
| `OPENBLOCKS_API_SERVICE_URL`    | Openblocks API service URL                                          | `http://localhost:8080`                                 |

## Building web frontend image

Standalone Openblocks web frontend image.

### Building the image

From project root run:

```
DOCKER_BUILDKIT=1 docker build -f deploy/docker/Dockerfile -t openblocksdev/openblocks-ce-frontend --target openblocks-ce-frontend .
```

### Configuration

Image can be configured by setting environment variables.

| Environment variable            | Description                                                         | Value                                                   |
| --------------------------------| --------------------------------------------------------------------| ------------------------------------------------------- |
| `PUID`                          | ID of user running services. It will own all created logs and data. | `9001`                                                  |
| `PGID`                          | ID of group of the user running services.                           | `9001`                                                  |
| `OPENBLOCKS_API_SERVICE_URL`    | Openblocks API service URL                                          | `http://localhost:8080`                                 |
| `OPENBLOCKS_NODE_SERVICE_URL`   | Openblocks Node service (js executor) URL                           | `http://localhost:6060`                                 |


