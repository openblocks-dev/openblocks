# openblocks-sdk

## Usage

yarn:

```bash
yarn add openblocks-sdk
```

npm:

```bash
npm install openblocks-sdk
```

## Integrate Openblocks' app/module into existing app page

1. Publish your app/module in Openblocks.
2. Set the app/module's access privilege as public.
3. Add code in your existing app as below.

### Import style

```ts
import "openblocks-sdk/dist/style.css";
```

### For react app:

```ts
import { OpenblocksAppView } from "openblocks-sdk";

<OpenblocksAppView appId="{YOUR_APPLICATION_ID}" />;
```

#### OpenblocksViewProps

| Name                   | Type                        | Description                                                                             | Default value              |
| ---------------------- | --------------------------- | --------------------------------------------------------------------------------------- | -------------------------- |
| appId                  | string                      | The app's id in Openblocks. Required!                                                   | --                         |
| baseUrl                | string                      | Openblocks' api base url                                                                | https://api.openblocks.dev |
| onModuleEventTriggered | (eventName: string) => void | Triggered when module's custom event is triggered. Works only when the app is a module. | --                         |
| onModuleOutputChange   | (output: any) => void       | Triggered when module's outputs change. Works only when the app is a module.            | --                         |

#### Invoke module methods

```tsx
import { useRef } from "ref";
import { OpenblocksAppView } from "openblocks-sdk";

function MyExistingAppPage() {
  const appRef = useRef();
  return (
    <div>
      <OpenblocksAppView appId={YOUR_APPLICATION_ID} ref={appRef} />;
      <button onClick={() => appRef.current?.invokeMethod("some-method-name")}>
        Invoke method
      </button>
    </div>
  );
}
```

### For vanilla js:

```js
import { bootstrapAppAt } from "openblocks-sdk";

const node = document.querySelector("#my-app");

async function bootstrap() {
  const instance = await bootstrapAppAt(YOUR_APPLICATION_ID, node);

  // set module inputs
  instance.setModuleInputs({ input1: "xxx", input2: "xxx" });

  // invoke module methods
  instance.setModuleInputs({ input1: "xxx", input2: "xxx" });

  // listen module event trigger
  instance.on("moduleEventTriggered", (eventName) => {
    console.info("event triggered:", eventName);
  });

  // listen module output change
  instance.on("moduleOutputChange", (data) => {
    console.info("output data:", data);
  });
}
```
