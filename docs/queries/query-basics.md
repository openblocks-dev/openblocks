# Query basics

Queries support you to read data from or write data to your data sources. You can create queries while editing an app or in the query library. This tutorial walks you through how to create a query and tailor it to your needs.

## Connect to a data source

You can connect to a data source that was already in your data source library or create a new one. For detailed information, see [data-source-basics.md](../data-sources/data-source-basics.md "mention").

<figure><img src="../.gitbook/assets/image (12) (1).png" alt=""><figcaption></figcaption></figure>

## Create a query

The UI of query editor varies when you choose different types of data sources. Below is an example of a connection to a PostgreSQL database and a corresponding statement.

<figure><img src="../.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure>

Openblocks evaluates your query statement with JavaScript code inside `{{ }}` in real-time, and the result is displayed below in a floating box, so you can use it to check the correctness of the query statement.

<figure><img src="../.gitbook/assets/image (36) (1).png" alt=""><figcaption></figcaption></figure>

## Metadata

You can view the metadata of databases such as PostgreSQL, MongoDB and MySQL. Click **Metadata**, then the database tables and their fields are displayed in a tree structure. Metadata is useful for writing queries and it enables auto-suggestion while you typing.

![](<../.gitbook/assets/image (23).png>)![](<../.gitbook/assets/image (26) (1).png>)

## Trigger when

Openblocks triggers your queries in two modes, either run automatically when inputs change or on page load, or manually invoked in event handlers.

<figure><img src="../.gitbook/assets/image (34).png" alt=""><figcaption></figcaption></figure>

### Inputs change or on page load

Queries set to this mode automatically run when dependent inputs change or on page load. For example, the query result of `select * from users where customer_id = {{input.value}}` updates immediately when `input.value` changes. **** This mode to run a query is recommended for queries reading data from data sources.

### Manually invoked

For this mode of queries, they run only with your manual trigger, such as a button or link click. You need to specify an event handler to trigger the query. This mode is recommended for queries writing data to data sources, because you may need to confirm that the input is complete and error-free before running it.

{% hint style="info" %}
**How to choose a query's trigger mode?**

In most cases, queries reading data, like **select** operations, can be set to the former mode, and those writing data, like **create**/**delete**/**update** operations, run the latter way.

When Openblocks detects your query statement switches from reading to writing data, the trigger mode switches to **Manually invoked** automatically, but not the other way around.
{% endhint %}

## Notification tab and Advanced tab

In notification and advanced tabs, you can configure settings regarding notifications, timeout, periodic run, and more. Settings in **Notification** tab and **Advanced** vary based on trigger mode of your query.

| Tab              | Settings                                    | Inputs change or on page load | Manually invoked |
| ---------------- | ------------------------------------------- | :---------------------------: | :--------------: |
| **Notification** | Display a Success message after running     |               🚫              |         ✅        |
|                  | Display a Failure message after running     |               ✅               |         ✅        |
| **Advanced**     | Display a confirmation modal before running |         <p>🚫<br></p>         |         ✅        |
|                  | Set timeout for query running               |               ✅               |         ✅        |
|                  | Perform query periodically                  |               ✅               |        🚫        |
