# Use third-party libraries

Every developer learns one of the most important principles of software engineering early in their career: DRY (Don’t Repeat Yourself). Using third-party libraries can save your time as you do not need to develop the functionality that the library provides. Openblocks provides some built-in third-party libraries for common uses, and you can manually import other libraries on demand.

## Built-in libraries

Openblocks provides some JavaScript built-in libraries for use:

| Library   | Docs                                                                 | Version                    |
| --------- | -------------------------------------------------------------------- | -------------------------- |
| lodash    | [https://lodash.com/docs/](https://lodash.com/docs/)                 | 4.17.21                    |
| moment    | [https://momentjs.com/docs/](https://momentjs.com/docs/)             | 2.29.3                     |
| uuid      | [https://github.com/uuidjs/uuid](https://github.com/uuidjs/uuid)     | 8.3.2（Support v1/v3/v4/v5） |
| numbro    | [https://numbrojs.com/format.html](https://numbrojs.com/format.html) | 2.3.6                      |
| papaparse | [https://www.papaparse.com/docs](https://www.papaparse.com/docs)     | 5.3.2                      |

## Manually import libraries

Openblocks supports setting up preloaded JavaScript and libraries which can be **app-level** or **workspace-level**.

* **App-level** libraries **** get loaded only in the app where defined. Plus, app A cannot use libraries that are set up for app B.
* **Workspace-level** libraries **** will be loaded when you open any application in your workspace. All the apps can access those libraries. There can be a certain impact on app performance, especially when you have complex JavaScript functions that aren't being used in every app.

{% hint style="info" %}
**Tips you should know before setting up libraries:**

* External libraries are loaded and run in the browser.
* NodeJS-only libraries are not supported now.
* URLs of external libraries need to support cross-domain.
* The export of the library must be set directly on the window object, global variables like `var xxx = xxx` do not take effect.
*   The external libraries run in a restricted sandbox environment and the following global variables are not available:

    <mark style="background-color:yellow;">`parent`</mark>

    <mark style="background-color:yellow;">`document`</mark>

    <mark style="background-color:yellow;">`location`</mark>

    <mark style="background-color:yellow;">`chrome`</mark>

    <mark style="background-color:yellow;">`setTimeout`</mark>

    <mark style="background-color:yellow;">`fetch`</mark>

    <mark style="background-color:yellow;">`setInterval`</mark>

    <mark style="background-color:yellow;">`clearInterval`</mark>

    <mark style="background-color:yellow;">`setImmediate`</mark>

    <mark style="background-color:yellow;">`XMLHttpRequest`</mark>

    <mark style="background-color:yellow;">`importScripts`</mark>

    <mark style="background-color:yellow;">`Navigator`</mark>

    <mark style="background-color:yellow;">`MutationObserver`</mark>
{% endhint %}

\
Now let's take [<mark style="color:blue;">**cowsay**</mark>](https://github.com/piuccio/cowsay) as an example and import it on app-level and workspace-level.

Library link:

```url
https://unpkg.com/cowsay@1.5.0/build/cowsay.umd.js
```

### Import on App-level

Navigate to the left sidebar, click <img src="../.gitbook/assets/image (1).png" alt="" data-size="line"> > **Other** > **Scripts and style** > **Add a library**. Then paste the **cowsay** link here.

<figure><img src="../.gitbook/assets/Add a library (2).png" alt=""><figcaption></figcaption></figure>

Now you can write code in **JS query** to test its usage with `cowsay.say`:

<figure><img src="../.gitbook/assets/write code in JS query (2).png" alt=""><figcaption></figcaption></figure>

or in component **Properties**:

<figure><img src="../.gitbook/assets/or in Properties (2).png" alt=""><figcaption></figcaption></figure>

And since you have set up cowsay just for **Openblocks's new application 1,** you can not use cowsay in another app.

<figure><img src="../.gitbook/assets/in another app (1).png" alt=""><figcaption></figcaption></figure>

### Import on Workspace-level

On Openblocks homepage, go to **Settings** > **Advanced** > **JavaScript library**. Click **+ Add a library**, paste the **cowsay** link here and click **Save**. Then you can use **cowsay** library **** in any app of your workspace.

<figure><img src="../.gitbook/assets/thirdparty library-5.png" alt=""><figcaption></figcaption></figure>
