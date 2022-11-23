---
description: Host Openblocks on your own device using Docker or Docker-Compose.
---

# Self-hosting

## Prerequisites

* [Docker](https://docs.docker.com/get-docker/) (version 20.10.7 or above)
* [Docker-Compose](https://docs.docker.com/compose/install/) (version 1.29.2 or above)

{% hint style="info" %}
System minimum requirements: 2-core CPU and 4 GB RAM.

Windows users are recommended to use PowerShell for running commands below.
{% endhint %}

In your working directory, run the following commands to make a directory named `openblocks` to store the data of Openblocks:

```powershell
mkdir openblocks
cd openblocks
```

## Deploy

{% tabs %}
{% tab title="Docker-Compose (Recommend)" %}
Follow the steps below:

1. Download the configuration file by clicking [docker-compose.yml](https://cdn-files.openblocks.dev/docker-compose.yml) or running the curl command: `curl https://cdn-files.openblocks.dev/docker-compose.yml -o $PWD/docker-compose.yml`\

2.  Start the Docker container by running this command: `docker-compose up -d`\
    ``\
    ``The docker image, about 400 MB, is downloaded during the initial start-up.

    <figure><img src="../.gitbook/assets/download-ce.png" alt=""><figcaption></figcaption></figure>

    After downloading, it usually takes less than 30 seconds to start the service.\

3.  Check the logs by running this command: `docker logs -f openblocks`\
    ``\
    ``When you see `frontend`, `backend`, `redis`, and `mongo` `entered the RUNNING state`, the Openblocks service has officially started:\


    <figure><img src="../.gitbook/assets/check-logs-ce.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Docker" %}
Run the command below:

{% code overflow="wrap" %}
```powershell
docker run -d --name openblocks -p 3000:3000 -v "$PWD/stacks:/openblocks-stacks" openblocksdev/openblocks-ce
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% hint style="info" %}
By default the supervisor will run under the user <mark style="background-color:yellow;">`uid=9001`</mark>. You can specify the uid by adding a docker environment variable <mark style="background-color:yellow;">`LOCAL_USER_ID`</mark> and setting its value.

* Docker-compose: Add an environment variable <mark style="background-color:yellow;">`LOCAL_USER_ID`</mark> in <mark style="background-color:yellow;">`docker-compose.yml`</mark> downloaded in your working directory.\
  ![](../.gitbook/assets/local-user-id.png)\
  After modifying the YML file, you may need to delete your current container and start a new one.\

* Docker: Add an environment variable <mark style="background-color:yellow;">`LOCAL_USER_ID`</mark> to the deploying command, as shown below:\
  <mark style="background-color:yellow;">`docker run -d --name openblocks -e LOCAL_USER_ID = YOUR_USER_ID -p 3000:3000 -v "$PWD/stacks:/openblocks-stacks" openblocksdev/openblocks-ce`</mark>
{% endhint %}

## Update

{% tabs %}
{% tab title="Docker-Compose" %}
Run the following commands to update to the latest Openblocks image:

```powershell
docker-compose pull
docker-compose rm -fsv openblocks
docker-compose up -d
```
{% endtab %}

{% tab title="Docker" %}
Run the following commands to update to the latest Openblocks image:

{% code overflow="wrap" %}
```powershell
docker pull openblocksdev/openblocks-ce
docker rm -fv openblocks
docker run -d --name openblocks -p 3000:3000 -v "$PWD/stacks:/openblocks-stacks" openblocksdev/openblocks-ce
```
{% endcode %}
{% endtab %}
{% endtabs %}

## Sign up

Visit **http://localhost:3000** and click **Sign up**. Openblocks will automatically create a workspace for you, then you can start building your apps and invite members to your workspace.

<figure><img src="../.gitbook/assets/after-deployment.png" alt=""><figcaption></figcaption></figure>
