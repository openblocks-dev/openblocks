import { SwitchComp } from "comps/comps/switchComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function SwitchExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.open")}
          config={{
            value: "true",
            disabled: false,
          }}
          compFactory={SwitchComp}
        />
        <Example
          title={trans("componentDoc.close")}
          config={{
            value: "false",
            disabled: false,
          }}
          compFactory={SwitchComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            value: "true",
            disabled: true,
          }}
          compFactory={SwitchComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.leftLeftAlign")}
          config={{
            value: "true",
            label: {
              text: trans("componentDoc.labelText"),
              position: "row",
              align: "left",
            },
          }}
          compFactory={SwitchComp}
        />
        <Example
          title={trans("componentDoc.leftRightAlign")}
          config={{
            value: "true",
            label: {
              text: trans("componentDoc.labelText"),
              position: "row",
              align: "right",
            },
          }}
          compFactory={SwitchComp}
        />
        <Example
          title={trans("componentDoc.topLeftAlign")}
          config={{
            value: "true",
            label: {
              text: trans("componentDoc.labelText"),
              position: "column",
              align: "left",
            },
          }}
          compFactory={SwitchComp}
        />
        <Example
          title={trans("componentDoc.topRightAlign")}
          config={{
            value: "true",
            label: {
              text: trans("componentDoc.labelText"),
              position: "column",
              align: "right",
            },
          }}
          compFactory={SwitchComp}
        />
      </ExampleGroup>
    </>
  );
}
