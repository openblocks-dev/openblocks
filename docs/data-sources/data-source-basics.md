# Data source basics

Data source is where you manage credentials and make connections to various popular databases such as PostgreSQL, MongoDB, Elasticsearch and all kinds of internal or third-party APIs.&#x20;

Openblocks stores your credentials securely and does not store any data from your requests or responses. It only serves as a proxy between client side and your data sources.

## Connect to a new data source

{% hint style="info" %}
Check out [IP allowlist](configure-ip-allowlists.md) and add Openblocks IP addresses to your data source allowlist when needed.
{% endhint %}

Follow the steps below:

1. Click **Data Sources** on Openblocks homepage.
2.  Click **New data source** on the upper right. This permission is restricted to workspace admins and developers.

    <figure><img src="../.gitbook/assets/image (31) (1).png" alt=""><figcaption></figcaption></figure>
3.  Select the database or API type you need to connect.&#x20;

    <figure><img src="../.gitbook/assets/data source basics-2.png" alt=""><figcaption></figcaption></figure>
4. Fill out data source connection fields. See docs in [Connect to databases](broken-reference) and [Connect to APIs](connect-to-databases/) for detailed tutorials.
5. Click **Test connection** to check whether you can make a successful connection to data source based on current settings.
6.  Click **Save**.

    <figure><img src="../.gitbook/assets/image (28).png" alt=""><figcaption></figcaption></figure>

You can also connect to a new data source when creating or editing queries in query library or query editor.

<figure><img src="../.gitbook/assets/image (37).png" alt=""><figcaption><p>Query editor</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (16).png" alt=""><figcaption><p>Query library</p></figcaption></figure>

## Permissions

Only workspace admins and developers can view the **Data Sources** page and create new data sources.

For each data source, workspace admins and the creator can change its **Access Control**. Go to Openblocks homepage > **Data Sources**, and click `···` > **Access Control**.

For more information about permissions for data sources, see [Data sources](../workspace-management/permissions-for-resources.md#data-sources).
