import { TimeRangeComp } from "../../../../comps/comps/dateComp/timeComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function TimeRangeExample() {
  const blackListConfig: string[] = [
    trans("componentDoc.labelText"),
    trans("componentDoc.labelPosition"),
    trans("componentDoc.labelAlign"),
    "start",
    "end",
  ];
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.value")}
          config={{
            start: "10:00:00",
            end: "12:00:00",
            format: "hh:mm:ss",
            disabled: false,
            label: {
              text: trans("componentDoc.time"),
              position: "column",
              align: "left",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={TimeRangeComp}
        />
        <Example
          title={trans("componentDoc.noDefaultValue")}
          config={{
            format: "hh:mm:ss",
            disabled: false,
            label: {
              text: trans("componentDoc.time"),
              position: "column",
              align: "left",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={TimeRangeComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            start: "10:00:00",
            end: "12:00:00",
            format: "hh:mm:ss",
            disabled: true,
            label: {
              text: trans("componentDoc.time"),
              position: "column",
              align: "left",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={TimeRangeComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.leftLeftAlign")}
          width={350}
          config={{
            start: "10:00:00",
            end: "12:00:00",
            label: {
              text: trans("componentDoc.time"),
              position: "row",
              align: "left",
            },
          }}
          compFactory={TimeRangeComp}
        />
        <Example
          title={trans("componentDoc.leftRightAlign")}
          width={350}
          config={{
            start: "10:00:00",
            end: "12:00:00",
            label: {
              text: trans("componentDoc.time"),
              position: "row",
              align: "right",
            },
          }}
          compFactory={TimeRangeComp}
        />
        <Example
          title={trans("componentDoc.topLeftAlign")}
          config={{
            start: "10:00:00",
            end: "12:00:00",
            label: {
              text: trans("componentDoc.time"),
              position: "column",
              align: "left",
            },
          }}
          compFactory={TimeRangeComp}
        />
        <Example
          title={trans("componentDoc.topRightAlign")}
          config={{
            start: "10:00:00",
            end: "12:00:00",
            label: {
              text: trans("componentDoc.time"),
              position: "column",
              align: "right",
            },
          }}
          compFactory={TimeRangeComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.validation")}>
        <Example
          title={trans("componentDoc.required")}
          config={{
            required: true,
            label: {
              text: trans("componentDoc.time"),
              position: "column",
              align: "left",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={TimeRangeComp}
        />
        <Example
          title={trans("componentDoc.time")}
          config={{
            start: "10:00:00",
            end: "12:00:00",
            label: {
              text: trans("componentDoc.date"),
              position: "column",
              align: "left",
            },
            minTime: "11:00:00",
            maxTime: "12:00:00",
          }}
          blackListConfig={blackListConfig}
          compFactory={TimeRangeComp}
        />
      </ExampleGroup>
    </>
  );
}
