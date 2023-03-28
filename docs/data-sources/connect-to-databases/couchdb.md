# CouchDB

CouchDB is an open-source NoSQL document-oriented database management system that provides easy-to-use web-based interfaces for data storage, retrieval, and indexing, as well as built-in synchronization and replication capabilities.

## Prerequisites

* Get CouchDB database connection parameters from the database owner.
* Refer to [IP allowlist](../configure-ip-allowlists.md) to add IP addresses of Openblocks to your allowlist (if needed).

## Connect to CouchDB data source

Follow the steps below:

1. Create a new data source in two ways. Note that this permission is restricted to workspace admins and developers.
   *   Navigate to the **Data Sources** tab on [Openblocks Homepage](https://openblocks.dev) and click **New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-1.PNG" alt=""><figcaption></figcaption></figure>
   *   When creating a new query in the app editor, click **+ New** > **+ New data source**.&#x20;

       <figure><img src="../../.gitbook/assets/db-2.PNG" alt=""><figcaption></figcaption></figure>
2.  Select **Database** > **CouchDB** as the data source type.&#x20;

    <figure><img src="../../.gitbook/assets/couchdb-1.PNG" alt=""><figcaption></figcaption></figure>
3.  Set its name and configure the server URL. You can also set the user name and a password.&#x20;

    <figure><img src="../../.gitbook/assets/couchdb-2.PNG" alt=""><figcaption></figcaption></figure>
4. (Optional) Click **Test connection** to check whether the new data source is successfully connected.
5. Click **Save**, and it will be saved to your data source library.
