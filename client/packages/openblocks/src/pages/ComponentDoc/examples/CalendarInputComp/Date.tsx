import { DatePickerComp } from "comps/comps/dateComp/dateComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function DateExample() {
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
            value: "2022-01-01",
            format: "YYYY-MM-DD",
            disabled: false,
            label: {
              text: trans("componentDoc.date"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={DatePickerComp}
        />
        <Example
          title={trans("componentDoc.noDefaultValue")}
          config={{
            value: trans("componentDoc.noValue"),
            format: "YYYY-MM-DD",
            disabled: false,
            label: {
              text: trans("componentDoc.date"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={DatePickerComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            value: "2022-01-01",
            format: "YYYY-MM-DD",
            disabled: true,
            label: {
              text: trans("componentDoc.date"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={DatePickerComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.leftLeftAlign")}
          config={{
            value: "2022-01-01",
            label: {
              text: trans("componentDoc.date"),
              position: "row",
              align: "left",
            },
          }}
          compFactory={DatePickerComp}
        />
        <Example
          title={trans("componentDoc.leftRightAlign")}
          config={{
            value: "2022-01-01",
            label: {
              text: trans("componentDoc.date"),
              position: "row",
              align: "right",
            },
          }}
          compFactory={DatePickerComp}
        />
        <Example
          title={trans("componentDoc.topLeftAlign")}
          config={{
            value: "2022-01-01",
            label: {
              text: trans("componentDoc.date"),
              position: "column",
              align: "left",
            },
          }}
          compFactory={DatePickerComp}
        />
        <Example
          title={trans("componentDoc.topRightAlign")}
          config={{
            value: "2022-01-01",
            label: {
              text: trans("componentDoc.date"),
              position: "column",
              align: "right",
            },
          }}
          compFactory={DatePickerComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.validation")}>
        <Example
          title={trans("componentDoc.required")}
          config={{
            required: true,
            label: {
              text: trans("componentDoc.date"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={DatePickerComp}
        />
        <Example
          title={trans("componentDoc.date")}
          config={{
            value: "2022-01-01",
            label: {
              text: trans("componentDoc.date"),
            },
            minDate: "2022-03-01",
            maxDate: "2022-04-01",
          }}
          blackListConfig={blackListConfig}
          compFactory={DatePickerComp}
        />
      </ExampleGroup>
    </>
  );
}
