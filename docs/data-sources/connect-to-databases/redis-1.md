# Snowflake

Snowflake is a cloud-based data warehousing platform that provides scalable and flexible solutions for storing, processing, and analyzing large volumes of data.

## Prerequisites

* Get Snowflake database connection parameters from the database owner.
* Refer to [IP allowlist](../configure-ip-allowlists.md) to add IP addresses of Openblocks to your allowlist (if needed).

## Connect to Snowflake data source

Follow the steps below:

1. Create a new data source in two ways. Note that this permission is restricted to workspace admins and developers.
   *   Navigate to the **Data Sources** tab on [Openblocks Homepage](https://openblocks.dev) and click **New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-1.PNG" alt=""><figcaption></figcaption></figure>
   *   When creating a new query in the app editor, click **+ New** > **+ New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-2.PNG" alt=""><figcaption></figcaption></figure>
2.  Select **Database** > **Snowflake** as the data source type.&#x20;

    <figure><img src="../../.gitbook/assets/snowflake-1.png" alt=""><figcaption></figcaption></figure>
3.  Set its name and configure general settings, including account identifier, and database. You can also set schema, warehouse, user name, password, and so on.&#x20;



    <figure><img src="../../.gitbook/assets/snowflake-2.png" alt=""><figcaption></figcaption></figure>
4. (Optional) Click **Test connection** to check whether the new data source is successfully connected.
5. Click **Save**, and it will be saved to your data source library.
