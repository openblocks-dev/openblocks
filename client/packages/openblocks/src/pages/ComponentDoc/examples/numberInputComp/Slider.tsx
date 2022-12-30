import { SliderComp } from "comps/comps/numberInputComp/sliderComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function SliderExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.default")}
          config={{
            value: "60",
            disabled: "false",
            min: "0",
            max: "100",
            step: "10",
          }}
          compFactory={SliderComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            disabled: "true",
            value: "60",
            max: "100",
            min: "0",
            step: "10",
          }}
          compFactory={SliderComp}
        />
      </ExampleGroup>

      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.leftLeftAlign")}
          config={{
            label: {
              text: trans("componentDoc.labelText"),
              position: "row",
              align: "left",
            },
          }}
          compFactory={SliderComp}
        />
        <Example
          title={trans("componentDoc.leftRightAlign")}
          config={{
            label: {
              text: trans("componentDoc.labelText"),
              position: "row",
              align: "right",
            },
          }}
          compFactory={SliderComp}
        />
        <Example
          title={trans("componentDoc.topLeftAlign")}
          config={{
            label: {
              text: trans("componentDoc.labelText"),
              position: "column",
              align: "left",
            },
          }}
          compFactory={SliderComp}
        />
        <Example
          title={trans("componentDoc.topRightAlign")}
          config={{
            label: {
              text: trans("componentDoc.labelText"),
              position: "column",
              align: "right",
            },
          }}
          compFactory={SliderComp}
        />
      </ExampleGroup>
    </>
  );
}
