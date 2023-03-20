# MySQL

MySQL is a popular relational database management system (RDBMS) and is widely used in various industries due to its scalability, flexibility, and ease of use.

## Prerequisites

* Get MySQL database connection parameters from the database owner.
* Refer to [IP allowlist](../configure-ip-allowlists.md) to add IP addresses of Openblocks to your allowlist (if needed).

## Connect to MySQL data source

Follow the steps below:

1. Create a new data source in two ways. Note that this permission is restricted to workspace admins and developers.
   *   Navigate to the **Data Sources** tab on [Openblocks Homepage](https://openblocks.dev) and click **New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-1.PNG" alt=""><figcaption></figcaption></figure>
   *   When creating a new query in the app editor, click **+ New** > **+ New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-2.PNG" alt=""><figcaption></figcaption></figure>
2.  Select **Database** > **MySQL** as the data source type.&#x20;

    <figure><img src="../../.gitbook/assets/mysql-1.PNG" alt=""><figcaption></figcaption></figure>
3.  Set its name and configure general settings, including host, port, and database name. You can also set the user name and a password.&#x20;

    <figure><img src="../../.gitbook/assets/mysql-2.PNG" alt=""><figcaption></figcaption></figure>
4. (Optional) Click **Test connection** to check whether the new data source is successfully connected.
5. Click **Save**, and it will be saved to your data source library.

## Query a MySQL data source

Create `query1` and select the recently created data source. Insert a query and then click ▶ **Run**.

<figure><img src="../../.gitbook/assets/mysql-3.PNG" alt=""><figcaption></figcaption></figure>
