import { IFrameComp } from "comps/comps/iframeComp";
import { trans } from "i18n";
import Example from "../common/Example";
import ExampleGroup from "../common/ExampleGroup";

export default function IFrameExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title=""
          width={1000}
          height={600}
          hideSettings={true}
          config={{}}
          compFactory={IFrameComp}
        />
      </ExampleGroup>
    </>
  );
}
