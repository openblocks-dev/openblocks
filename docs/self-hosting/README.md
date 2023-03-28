# Self-hosting

In this article, you will be guided through hosting Openblocks on your own server using Docker-Compose or Docker.

For easy setup and deployment, we provide an [all-in-one image](https://hub.docker.com/r/openblocksdev/openblocks-ce) which bundles frontend, backend and data persistence services altogether in one single container.&#x20;

Also, for developers in need of stateless containers in cluster environment, we provide [separate images](https://hub.docker.com/u/openblocksdev) of backend and frontend services with a customizable Dockerfile.

## All-in-one image: all services in one container <a href="#all-in-one" id="all-in-one"></a>

### Prerequisites

* [Docker](https://docs.docker.com/get-docker/) (version 20.10.7 or above)
* [Docker-Compose](https://docs.docker.com/compose/install/) (version 1.29.2 or above)

{% hint style="info" %}
Recommended system spec: 1-core CPU and 2 GB RAM.

Windows users are recommended to use PowerShell for running commands below.
{% endhint %}

In your working directory, run the following commands to make a directory named `openblocks` to store the data of Openblocks:

```bash
mkdir openblocks
cd openblocks
```

### Deploy

{% tabs %}
{% tab title="Docker-Compose (Recommend)" %}
Follow the steps below:

1.  Download the configuration file by clicking [docker-compose.yml](https://cdn-files.openblocks.dev/docker-compose.yml) or running the curl command:&#x20;

    {% code overflow="wrap" %}
    ```bash
    curl https://cdn-files.openblocks.dev/docker-compose.yml -o $PWD/docker-compose.yml
    ```
    {% endcode %}
2.  Start the Docker container by running this command:

    ```bash
    docker-compose up -d
    ```

    \
    The docker image, about 400 MB, is downloaded during the initial start-up.\


    <figure><img src="../.gitbook/assets/download-ce.png" alt=""><figcaption></figcaption></figure>

    After downloading, it usually takes less than 30 seconds to start the service.\

3.  Check the logs by running this command:

    ```bash
    docker logs -f openblocks
    ```



    When you see `frontend`, `backend`, `redis`, and `mongo` `entered the RUNNING state`, the Openblocks service has officially started:&#x20;

    <figure><img src="../.gitbook/assets/check-logs-ce.png" alt=""><figcaption></figcaption></figure>
4.  Visit [**http://localhost:3000**](http://localhost:3000) and click **Sign up**. Openblocks will automatically create a workspace for you, then you can start building your apps and invite members to your workspace.

    <figure><img src="../.gitbook/assets/after-deployment.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Docker" %}
Run the command below:

{% code overflow="wrap" %}
```bash
docker run -d --name openblocks -p 3000:3000 -v "$PWD/stacks:/openblocks-stacks" openblocksdev/openblocks-ce
```
{% endcode %}
{% endtab %}
{% endtabs %}

### Update

{% tabs %}
{% tab title="Docker-Compose" %}
Run the following commands to update to the latest Openblocks image:

```bash
docker-compose pull
docker-compose rm -fsv openblocks
docker-compose up -d
```
{% endtab %}

{% tab title="Docker" %}
Run the following commands to update to the latest Openblocks image:

{% code overflow="wrap" %}
```bash
docker pull openblocksdev/openblocks-ce
docker rm -fv openblocks
docker run -d --name openblocks -p 3000:3000 -v "$PWD/stacks:/openblocks-stacks" openblocksdev/openblocks-ce
```
{% endcode %}
{% endtab %}
{% endtabs %}

## Separate images: services in different containers <a href="#multi" id="multi"></a>

For developers who require stateless containers in a cluster environment, we offer separate images of backend and frontend service with a customizable Dockerfile. A well-functioning Openblocks deployment consists of below services:

* **api-service**: Backend service.
* **node-service**: Backend service.
* **frontend**: Frontend service.
* **MongoDB**: Used for persisting data of users, apps, data sources, etc.
* **Redis**: Used for maintaining user sessions, rate limiter, etc.

### Prerequisites

* [Docker-Compose](https://docs.docker.com/compose/install/) (version 1.29.2 or above)

### Deploy

1.  In your working directory, run the following commands to make a directory named `openblocks` to store the data of Openblocks:

    ```bash
    mkdir openblocks
    cd openblocks
    ```
2.  Download the configuration file by clicking [docker-compose-multi.yml](https://cdn-files.openblocks.dev/docker-compose-multi.yml) or running the curl command:

    <pre class="language-bash" data-overflow="wrap"><code class="lang-bash"><strong>curl https://cdn-files.openblocks.dev/docker-compose-multi.yml -o $PWD/docker-compose-multi.yml
    </strong></code></pre>
3.  Modify service configurations in the downloaded Dockerfile according to your needs:

    <figure><img src="../.gitbook/assets/docker-compose-multi.jpeg" alt=""><figcaption></figcaption></figure>

    * **mongodb**: Start a new MongoDB instance on your host. You can delete this part  and modify the environment variable `MONGODB_URI` of **openblocks-api-service** to use your own MongoDB.
    * **redis**: Start a new Redis instance on your host. You can delete this part and modify the environment variable `REDIS_URI` of **openblocks-api-service** to use your own Redis.
    * **openblocks-api-service**: Required.&#x20;
    * **openblocks-node-service**: Required.
    * **openblocks-frontend**: Required. Can be optional if you deploy frontend on CDN.
4.  Start Docker containers by running this command:

    ```bash
    docker-compose -f docker-compose-multi.yml up -d
    ```
5.  Visit [**http://localhost:3000**](http://localhost:3000) and click **Sign up**. Openblocks will automatically create a workspace for you, then you can start building your apps and invite members to your workspace.

    <figure><img src="../.gitbook/assets/after-deployment.png" alt=""><figcaption></figcaption></figure>

### Update <a href="#update-multi" id="update-multi"></a>

Run the following commands to update services to the latest:

```bash
docker-compose -f docker-compose-multi.yml pull
docker-compose -f docker-compose-multi.yml up -d
```

## Customize configurations

This section shows how to customize deployment configurations by setting environment variables.&#x20;

If you have already started Docker containers, you need to restart the containers for new configurations to take effect. For example, the way to **restart** your container running an all-in-one image is:

{% tabs %}
{% tab title="Docker-Compose (Recommend)" %}
One single command:

```bash
docker-compose up -d
```

It picks up configuration changes by stopping containers already in service and recreating new ones.
{% endtab %}

{% tab title="Docker" %}
Run the following commands to stop, remove the container already in service, and start up a new one using the newly customized deployment command.

```bash
docker stop openblocks
docker rm openblocks
# run your new docker run command
```
{% endtab %}
{% endtabs %}

Below are examples of configuring all-in-one image by setting environment variables in `docker-compose.yml`. If you are self-hosting with separate images, modify `openblocks-api-service` part of `docker-compose-multi.yml` instead.&#x20;

{% hint style="info" %}
For more information about configurations and environment variables, see [Configuration](https://github.com/openblocks-dev/openblocks/tree/develop/deploy/docker#all-in-one-image).
{% endhint %}

### Use your own MongoDB and Redis

By default Openblocks uses the built-in MongoDB and Redis installed inside the container, and you can replace them with your own MongoDB and Redis clusters.

{% tabs %}
{% tab title="Docker-Compose" %}
Add environment variables `MONGODB_URI` and `REDIS_URI` in `docker-compose.yml` downloaded in your working directory.\
<img src="../.gitbook/assets/mongodb-redis-uri.png" alt="" data-size="original">
{% endtab %}

{% tab title="Docker" %}
Add environment variables `MONGODB_URI` and `REDIS_URI` to the deployment command, as shown below:

{% code overflow="wrap" %}
```bash
docker run -d --name openblocks -e MONGODB_URI=YOUR_MONGODB_URI REDIS_URI=YOUR_REDIS_URI -p 3000:3000 -v "$PWD/stacks:/openblocks-stacks openblocksdev/openblocks-ce
```
{% endcode %}
{% endtab %}
{% endtabs %}

### Run as non-root user

By default the supervisor will run under the user `uid=9001`. You can specify the uid by adding a docker environment variable `LOCAL_USER_ID` and setting its value to a **Number**, such as `10010`.

{% tabs %}
{% tab title="Docker-Compose" %}
Add an environment variable `LOCAL_USER_ID` in `docker-compose.yml` downloaded in your working directory.\
<img src="../.gitbook/assets/local-user-id (2).png" alt="" data-size="original">
{% endtab %}

{% tab title="Docker" %}
Add an environment variable `LOCAL_USER_ID` to the deployment command, as shown below:

{% code overflow="wrap" %}
```bash
docker run -d --name openblocks -e LOCAL_USER_ID=10010 -p 3000:3000 -v "$PWD/stacks:/openblocks-stacks" openblocksdev/openblocks-ce
```
{% endcode %}
{% endtab %}
{% endtabs %}

### Install SSL certificate

With an SSL certificate, you can securely visit self-hosted Openblocks with HTTPS protocol. Here are the steps to install your SSL certificate before starting a container:

{% tabs %}
{% tab title="Docker-Compose" %}
1. Copy `fullchain.pem` and `privkey.pem` to the `$PWD/stacks/ssl` directory.
2. In `$PWD/docker-compose.yml`, change the value of `ports` to `"3443:3443"`.\
   ![](../.gitbook/assets/ssl-certificates.png)
{% endtab %}

{% tab title="Docker" %}
1. Copy `fullchain.pem` and `privkey.pem` to the `$PWD/stacks/ssl` directory.
2. Change the `ports` in the deployment command to `3443:3443`, as shown below:

{% code overflow="wrap" %}
```bash
docker run -d --name openblocks -p 3443:3443 -v "$PWD/stacks:/openblocks-stacks" openblocksdev/openblocks-ce
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% hint style="info" %}
In cases where you have certificates with names: `server.crt` and `server.key`, you need to rename them first as follows:\
`server.crt` => `fullchain.pem`\
`server.key` => `privkey.pem`
{% endhint %}
