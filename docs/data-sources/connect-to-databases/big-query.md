# Big Query

Big Query is a fully managed cloud-based data warehouse offered by Google Cloud Platform that provides high-speed querying and interactive analysis of large datasets using SQL-like queries.

## Prerequisites

* Get Big Query database connection parameters from the database owner.
* Refer to [IP allowlist](../configure-ip-allowlists.md) to add IP addresses of Openblocks to your allowlist (if needed).

## Connect to Big Query data source

Follow the steps below:

1. Create a new data source in two ways. Note that this permission is restricted to workspace admins and developers.
   *   Navigate to the **Data Sources** tab on [Openblocks Homepage](https://openblocks.dev) and click **New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-1.PNG" alt=""><figcaption></figcaption></figure>
   *   When creating a new query in the app editor, click **+ New** > **+ New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-2.PNG" alt=""><figcaption></figcaption></figure>
2.  Select **Database** > **Big Query** as the data source type.&#x20;

    <figure><img src="../../.gitbook/assets/bigquery-1.png" alt=""><figcaption></figcaption></figure>
3.  Set its name and service account.

    <figure><img src="../../.gitbook/assets/bigquery-2.png" alt=""><figcaption></figcaption></figure>
4. (Optional) Click **Test connection** to check whether the new data source is successfully connected.
5. Click **Save**, and it will be saved to your data source library.
