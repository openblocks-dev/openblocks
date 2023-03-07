import { DateRangeComp } from "comps/comps/dateComp/dateComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function DateRangeExample() {
  const nameMap: Record<string, string> = {
    start: trans("componentDoc.defaultStartDateValue"),
    end: trans("componentDoc.defaultEndDateValue"),
  };
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
            start: "2022-01-01",
            end: "2022-02-01",
            format: "YYYY-MM-DD",
            disabled: false,
            label: {
              text: trans("componentDoc.date"),
              position: "column",
              align: "left",
            },
          }}
          nameMap={nameMap}
          blackListConfig={blackListConfig.slice(0, 3)}
          compFactory={DateRangeComp}
        />
        <Example
          title={trans("componentDoc.noDefaultValue")}
          config={{
            value: trans("componentDoc.noValue"),
            format: "YYYY-MM-DD",
            disabled: false,
            label: {
              text: trans("componentDoc.date"),
              position: "column",
              align: "left",
            },
          }}
          nameMap={nameMap}
          blackListConfig={blackListConfig.slice(0, 3)}
          compFactory={DateRangeComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            start: "2022-01-01",
            end: "2022-02-01",
            format: "YYYY-MM-DD",
            disabled: true,
            label: {
              text: trans("componentDoc.date"),
              position: "column",
              align: "left",
            },
          }}
          nameMap={nameMap}
          blackListConfig={blackListConfig.slice(0, 3)}
          compFactory={DateRangeComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.leftLeftAlign")}
          width={400}
          config={{
            start: "2022-01-01",
            end: "2022-02-01",
            label: {
              text: trans("componentDoc.date"),
              position: "row",
              align: "left",
            },
          }}
          nameMap={nameMap}
          compFactory={DateRangeComp}
        />
        <Example
          title={trans("componentDoc.leftRightAlign")}
          width={400}
          config={{
            start: "2022-01-01",
            end: "2022-02-01",
            label: {
              text: trans("componentDoc.date"),
              position: "row",
              align: "right",
            },
          }}
          nameMap={nameMap}
          compFactory={DateRangeComp}
        />
        <Example
          title={trans("componentDoc.topLeftAlign")}
          config={{
            start: "2022-01-01",
            end: "2022-02-01",
            label: {
              text: trans("componentDoc.date"),
              position: "column",
              align: "left",
            },
          }}
          nameMap={nameMap}
          compFactory={DateRangeComp}
        />
        <Example
          title={trans("componentDoc.topRightAlign")}
          config={{
            start: "2022-01-01",
            end: "2022-02-01",
            label: {
              text: trans("componentDoc.date"),
              position: "column",
              align: "right",
            },
          }}
          nameMap={nameMap}
          compFactory={DateRangeComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.validation")}>
        <Example
          title={trans("componentDoc.required")}
          config={{
            required: true,
            label: {
              text: trans("componentDoc.date"),
              position: "column",
              align: "left",
            },
          }}
          nameMap={nameMap}
          blackListConfig={blackListConfig.slice(0, 3)}
          compFactory={DateRangeComp}
        />
        <Example
          title={trans("componentDoc.date")}
          config={{
            start: "2022-01-01",
            end: "2022-02-01",
            label: {
              text: trans("componentDoc.date"),
              position: "column",
              align: "left",
            },
            minDate: "2022-03-01",
            maxDate: "2022-04-01",
          }}
          nameMap={nameMap}
          blackListConfig={blackListConfig.slice(0, 3)}
          compFactory={DateRangeComp}
        />
      </ExampleGroup>
    </>
  );
}
