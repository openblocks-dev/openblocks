import { ProgressComp } from "comps/comps/progressComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function ProgressExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.notComplete")}
          config={{
            value: "60",
            showInfo: true,
          }}
          compFactory={ProgressComp}
        />
        <Example
          title={trans("componentDoc.complete")}
          config={{
            value: "100",
            showInfo: true,
          }}
          compFactory={ProgressComp}
        />
      </ExampleGroup>
    </>
  );
}
