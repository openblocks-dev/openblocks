# Openblocks

Openblocks is a developer-friendly open-source low code platform to build internal apps within minutes.

[Overview of Openblocks](https://docs.openblocks.dev/)

## Introduction

This chart bootstraps an Openblocks deployment on a [Kubernetes](https://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.2.0+
- PV provisioner support in the underlying infrastructure
- Bitnami helm chart repository (if mongodb and/or redis is installed)

## Installing the Chart

To install the chart with the release name `my-openblocks` into namespace `openblocks`:

```bash
# If installing mongodb and/or redis, add bitnami chart repository and update chart dependenices
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm dependency update

# Install the chart
$ helm install -n openblocks my-openblocks .
```

## Uninstalling the Chart

To uninstall/delete the `my-openblocks` deployment from namespace `openblocks`:

```bash
$ helm delete -n openblocks my-openblocks
```

## Parameters

### Redis

| Name                                 | Description                                                                 | Value            |
| ------------------------------------ | --------------------------------------------------------------------------- | ---------------- |
| `redis.enabled`                      | Install our own instance of redis                                           | `true`           |
| `redis.externalUrl`                  | External Redis URL used when `redis.enabled` is `false`                     | `""`             |

All available parameters can be found in [Bitnami Redis Chart](https://github.com/bitnami/charts/tree/main/bitnami/redis/#parameters)

### MongoDB

| Name                                 | Description                                                                 | Value            |
| ------------------------------------ | --------------------------------------------------------------------------- | ---------------- |
| `mongodb.enabled`                    | Install our own instance of mongo database                                  | `true`           |
| `mongodb.externalUrl`                | External mongo database connection string when `mongodb.enabled` is `false` | `""`             |

All available parameters can be found in [Bitnami MongoDB Chart](https://github.com/bitnami/charts/tree/main/bitnami/mongodb/#parameters)

### Openblocks backend (server)

| Name                                 | Description                                                                 | Value            |
| ------------------------------------ | --------------------------------------------------------------------------- | ---------------- |
| `backend.config.userId`              | User ID of user running Openblocks server application in container          | `9001`           |
| `backend.config.groupId`             | Group ID of user running Openblocks server application in container         | `9001`           |
| `backend.config.corsAllowedDomains`  | CORS allowed domains                                                        | `*`              |
| `backend.config.encryption.password` | Encryption password                                                         | `openblocks.dev` |
| `backend.config.encryption.salt`     | Encryption salt                                                             | `openblocks.dev` |

### Openblocks frontend (client)

| Name                                 | Description                                                                 | Value            |
| ------------------------------------ | --------------------------------------------------------------------------- | ---------------- |
| `frontend.config.userId`             | User ID of nginx user running Openblocks client application in container    | `9001`           |
| `frontend.config.groupId`            | Group ID of nginx user running Openblocks client application in container   | `9001`           |
| `frontend.config.backendUrl`         | URL to backend server if using external Openblocks server                   | `""`             |

