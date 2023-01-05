import { RangeSliderComp } from "comps/comps/numberInputComp/rangeSliderComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function RangeSliderExample() {
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
            start: "10",
            end: "70",
            min: "0",
            max: "100",
            step: "10",
          }}
          compFactory={RangeSliderComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            value: "60",
            disabled: "true",
            start: "10",
            end: "70",
            max: "100",
            min: "0",
            step: "10",
          }}
          compFactory={RangeSliderComp}
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
          compFactory={RangeSliderComp}
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
          compFactory={RangeSliderComp}
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
          compFactory={RangeSliderComp}
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
          compFactory={RangeSliderComp}
        />
      </ExampleGroup>
    </>
  );
}
