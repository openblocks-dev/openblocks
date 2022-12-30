import { ProgressCircleComp } from "comps/comps/progressCircleComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function ProgressCircleExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.notComplete")}
          width={100}
          height={100}
          config={{
            value: "60",
          }}
          compFactory={ProgressCircleComp}
        />
        <Example
          title={trans("componentDoc.complete")}
          width={100}
          height={100}
          config={{
            value: "100",
          }}
          compFactory={ProgressCircleComp}
        />
      </ExampleGroup>
    </>
  );
}
