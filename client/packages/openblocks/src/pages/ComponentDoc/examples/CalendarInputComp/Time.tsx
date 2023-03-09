import { TimePickerComp } from "../../../../comps/comps/dateComp/timeComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function TimeExample() {
  const blackListConfig: string[] = [trans("componentDoc.labelText")];
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.value")}
          config={{
            value: "10:00:00",
            format: "hh:mm:ss",
            disabled: false,
            label: {
              text: trans("componentDoc.time"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={TimePickerComp}
        />
        <Example
          title={trans("componentDoc.noDefaultValue")}
          config={{
            value: trans("componentDoc.noValue"),
            format: "hh:mm:ss",
            disabled: false,
            label: {
              text: trans("componentDoc.time"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={TimePickerComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            value: "10:00:00",
            format: "hh:mm:ss",
            disabled: true,
            label: {
              text: trans("componentDoc.time"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={TimePickerComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.leftLeftAlign")}
          config={{
            value: "10:00:00",
            label: {
              text: trans("componentDoc.time"),
              position: "row",
              align: "left",
            },
          }}
          compFactory={TimePickerComp}
        />
        <Example
          title={trans("componentDoc.leftRightAlign")}
          config={{
            value: "10:00:00",
            label: {
              text: trans("componentDoc.time"),
              position: "row",
              align: "right",
            },
          }}
          compFactory={TimePickerComp}
        />
        <Example
          title={trans("componentDoc.topLeftAlign")}
          config={{
            value: "10:00:00",
            label: {
              text: trans("componentDoc.time"),
              position: "column",
              align: "left",
            },
          }}
          compFactory={TimePickerComp}
        />
        <Example
          title={trans("componentDoc.topRightAlign")}
          config={{
            value: "10:00:00",
            label: {
              text: trans("componentDoc.time"),
              position: "column",
              align: "right",
            },
          }}
          compFactory={TimePickerComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.validation")}>
        <Example
          title={trans("componentDoc.required")}
          config={{
            required: true,
            label: {
              text: trans("componentDoc.time"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={TimePickerComp}
        />
        <Example
          title={trans("componentDoc.time")}
          config={{
            value: "10:00:00",
            label: {
              text: trans("componentDoc.date"),
            },
            minTime: "11:00:00",
            maxTime: "12:00:00",
          }}
          blackListConfig={blackListConfig}
          compFactory={TimePickerComp}
        />
      </ExampleGroup>
    </>
  );
}
