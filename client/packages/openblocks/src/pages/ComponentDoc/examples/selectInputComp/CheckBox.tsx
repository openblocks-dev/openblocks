import { CheckboxComp } from "comps/comps/selectInputComp/checkboxComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function CheckboxExample() {
  const blackListConfig: string[] = ["options.manual.manual"];
  const options = {
    optionType: "manual",
    manual: {
      manual: [
        {
          value: trans("componentDoc.appleOptionLabel"),
          label: trans("componentDoc.appleOptionLabel"),
          disabled: "",
          hidden: "",
        },
        {
          value: trans("componentDoc.waterMelonOptionLabel"),
          label: trans("componentDoc.waterMelonOptionLabel"),
          disabled: "",
          hidden: "",
        },
        {
          value: trans("componentDoc.berryOptionLabel"),
          label: trans("componentDoc.berryOptionLabel"),
          disabled: "",
          hidden: "",
        },
        {
          value: trans("componentDoc.lemonOptionLabel"),
          label: trans("componentDoc.lemonOptionLabel"),
          disabled: "",
          hidden: "",
        },
        {
          value: trans("componentDoc.coconutOptionLabel"),
          label: trans("componentDoc.coconutOptionLabel"),
          disabled: "",
          hidden: "",
        },
      ],
    },
  };
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.value")}
          config={{
            value: JSON.stringify([
              trans("componentDoc.appleOptionLabel"),
              trans("componentDoc.waterMelonOptionLabel"),
            ]),
            disabled: false,
            options: options,
            label: {
              text: trans("componentDoc.likedFruits"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CheckboxComp}
        />
        <Example
          title={trans("componentDoc.noDefaultValue")}
          config={{
            value: trans("componentDoc.noValue"),
            disabled: false,
            options: options,
            label: {
              text: trans("componentDoc.likedFruits"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CheckboxComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            value: JSON.stringify([
              trans("componentDoc.appleOptionLabel"),
              trans("componentDoc.waterMelonOptionLabel"),
              trans("componentDoc.lemonOptionLabel"),
            ]),
            disabled: true,
            options: options,
            label: {
              text: trans("componentDoc.likedFruits"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CheckboxComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.leftLeftAlign")}
          config={{
            value: JSON.stringify([
              trans("componentDoc.appleOptionLabel"),
              trans("componentDoc.waterMelonOptionLabel"),
              trans("componentDoc.lemonOptionLabel"),
            ]),
            options: options,
            label: {
              text: trans("componentDoc.likedFruits"),
              position: "row",
              align: "left",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CheckboxComp}
        />
        <Example
          title={trans("componentDoc.leftRightAlign")}
          config={{
            value: JSON.stringify([
              trans("componentDoc.appleOptionLabel"),
              trans("componentDoc.waterMelonOptionLabel"),
              trans("componentDoc.lemonOptionLabel"),
            ]),
            options: options,
            label: {
              text: trans("componentDoc.likedFruits"),
              position: "row",
              align: "right",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CheckboxComp}
        />
        <Example
          title={trans("componentDoc.topLeftAlign")}
          config={{
            value: JSON.stringify([
              trans("componentDoc.appleOptionLabel"),
              trans("componentDoc.waterMelonOptionLabel"),
              trans("componentDoc.lemonOptionLabel"),
            ]),
            options: options,
            label: {
              text: trans("componentDoc.likedFruits"),
              position: "column",
              align: "left",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CheckboxComp}
        />
        <Example
          title={trans("componentDoc.topRightAlign")}
          config={{
            value: JSON.stringify([
              trans("componentDoc.appleOptionLabel"),
              trans("componentDoc.waterMelonOptionLabel"),
            ]),
            options: options,
            label: {
              text: trans("componentDoc.likedFruits"),
              position: "column",
              align: "right",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CheckboxComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.validation")}>
        <Example
          title={trans("componentDoc.required")}
          config={{
            required: true,
            value: "[]",
            options: options,
            label: {
              text: trans("componentDoc.likedFruits"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CheckboxComp}
        />
      </ExampleGroup>
    </>
  );
}
