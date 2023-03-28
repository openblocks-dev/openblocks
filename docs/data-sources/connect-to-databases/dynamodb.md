# DynamoDB

DynamoDB is a fully managed NoSQL database service offered by Amazon Web Services (AWS) that provides fast and predictable performance with seamless scalability, making it ideal for applications with high scalability requirements.

## Prerequisites

* Get DynamoDB database connection parameters from the database owner.
* Refer to [IP allowlist](../configure-ip-allowlists.md) to add IP addresses of Openblocks to your allowlist (if needed).

## Connect to DynamoDB data source

Follow the steps below:

1. Create a new data source in two ways. Note that this permission is restricted to workspace admins and developers.
   *   Navigate to the **Data Sources** tab on [Openblocks Homepage](https://openblocks.dev) and click **New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-1.PNG" alt=""><figcaption></figcaption></figure>
   *   When creating a new query in the app editor, click **+ New** > **+ New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-2.PNG" alt=""><figcaption></figcaption></figure>
2.  Select **Database** > **DynamoDB** as the data source type.&#x20;

    <figure><img src="../../.gitbook/assets/dynamodb-1.PNG" alt=""><figcaption></figcaption></figure>
3.  Set its name and configure general settings, including access key ID, secret key. You can also set endpoint URL and region.

    <figure><img src="../../.gitbook/assets/dynamodb-2.PNG" alt=""><figcaption></figcaption></figure>
4. (Optional) Click **Test connection** to check whether the new data source is successfully connected.
5. Click **Save**, and it will be saved to your data source library.
