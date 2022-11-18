# Security

## Does Openblocks store my data?

No, Openblocks doesn't store any data returned from your APIs or database queries.

Openblocks only serves as a proxy between client side and your data sources. When you query your APIs or databases, Openblocks server connects to the data source with your credentials, forwards the request, and returns the result data to the browser. During the whole process, Openblocks doesn't store any data from your requests or responses.

Openblocks also provides a self-hosted version. You can deploy self-hosted Openblocks images on your own device, on-premise deployment ensures you have total control over your resources and that your data is securely stored.

## Is it safe to log in to my databases on Openblocks Cloud?

Yes, it is very safe for the following reasons:

* All sensitive credentials, such as database passwords, are encrypted with [AES-256 encryption](https://en.wikipedia.org/wiki/Advanced\_Encryption\_Standard).
* All sensitive credentials will never be sent to the browser from the server. They are only used in server side and are never exposed to the browser, the browser will display "Encrypted on the server side" as a placeholder.

<figure><img src=".gitbook/assets/image (3) (1).png" alt=""><figcaption></figcaption></figure>

## Other security measures within Openblocks

Openblocks provides secure-by-default service.

* All connections on Openblocks Cloud are encrypted with [TLS](https://en.wikipedia.org/wiki/Public\_key\_certificate).
* Sensitive credentials, such as database access credentials, are encrypted with AES-256, and each self-hosted Openblocks instance can be configured with unique salt values.
* Openblocks Cloud only connects to your databases or APIs through allowed IPs: **54.149.191.117** & **54.71.67.239**, ensuring that your data won't be exposed to unknown IPs while using our cloud service.
* Openblocks Cloud service is deployed and hosted on AWS centers, which are certified with ISO 27001, SOC 1 and SOC 2 standards.
* Openblocks **** ensures data redundancy on all cloud instances, so you do not need to worry about single point of failure or data loss.
* Internal access to Openblocks Cloud is controlled through [two-factor authentication (2FA)](https://en.wikipedia.org/wiki/Help:Two-factor\_authentication) and audit logs.

## Feedback

Should you have any questions about data security in Openblocks, please feel free to contact us. We welcome any feedback on our service from security experts and all users.
