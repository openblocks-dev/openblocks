# MongoDB

MongoDB is a broadly used NoSQL database system that stores data in JSON-like documents with dynamic schemas and handles both unstructured and semi-structured data. By offering high performance, scalability, and ease of use, MongoDB is a versatile and robust solution for a wide range of use cases.

## Prerequisites

* Get MongoDB database connection parameters from the database owner.
* Refer to [IP allowlist](../configure-ip-allowlists.md) to add IP addresses of Openblocks to your allowlist (if needed).

## Connect to MongoDB data source

Follow the steps below:

1. Create a new data source in two ways. Note that this permission is restricted to workspace admins and developers.
   *   Navigate to the **Data Sources** tab on [Openblocks Homepage](https://openblocks.dev) and click **New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-1.PNG" alt=""><figcaption></figcaption></figure>
   *   When creating a new query in the app editor, click **+ New** > **+ New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-2.PNG" alt=""><figcaption></figcaption></figure>
2.  Select **Database** > **MongoDB** as the data source type.&#x20;

    <figure><img src="../../.gitbook/assets/mongodb-1.PNG" alt=""><figcaption></figcaption></figure>
3. Set its name and configure the parameters according to your **Connection Type**:
   *   **Regular**: Host, port, database name (required); user name, password (optional)&#x20;

       <figure><img src="../../.gitbook/assets/mongodb-2.PNG" alt=""><figcaption></figcaption></figure>
   *   **URI**: URI&#x20;

       <figure><img src="../../.gitbook/assets/mongodb-3.PNG" alt=""><figcaption></figcaption></figure>
4. (Optional) Click **Test connection** to check whether the new data source is successfully connected.
5. Click **Save**, and it will be saved to your data source library.
