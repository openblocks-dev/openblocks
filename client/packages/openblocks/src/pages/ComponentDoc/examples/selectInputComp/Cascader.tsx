import { CascaderWithDefault } from "comps/comps/selectInputComp/cascaderComp";
import { trans, i18nObjs } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

const options = JSON.stringify(i18nObjs.cascaderDefult);

export default function CascaderExample() {
  const blackListConfig: string[] = ["options"];
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.value")}
          config={{
            value: `["zhejiang","hangzhou","xihu"]`,
            disabled: false,
            options: options,
            label: {
              text: trans("componentDoc.pleaseSelectCity"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CascaderWithDefault}
        />
        <Example
          title={trans("componentDoc.noDefaultValue")}
          config={{
            value: trans("componentDoc.noValue"),
            disabled: false,
            options: options,
            label: {
              text: trans("componentDoc.pleaseSelectCity"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CascaderWithDefault}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            value: `["zhejiang","hangzhou","xihu"]`,
            disabled: true,
            options: options,
            label: {
              text: trans("componentDoc.pleaseSelectCity"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CascaderWithDefault}
        />
        <Example
          title={trans("componentDoc.placeholder")}
          config={{
            value: trans("componentDoc.noValue"),
            disabled: false,
            options: options,
            placeholder: trans("componentDoc.pleaseSelect"),
            label: {
              text: trans("componentDoc.pleaseSelectCity"),
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CascaderWithDefault}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.leftLeftAlign")}
          config={{
            value: `["zhejiang","hangzhou","xihu"]`,
            options: options,
            label: {
              text: trans("componentDoc.pleaseSelectCity"),
              position: "row",
              align: "left",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CascaderWithDefault}
        />
        <Example
          title={trans("componentDoc.leftRightAlign")}
          config={{
            value: `["zhejiang","hangzhou","xihu"]`,
            options: options,
            label: {
              text: trans("componentDoc.pleaseSelectCity"),
              position: "row",
              align: "right",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CascaderWithDefault}
        />
        <Example
          title={trans("componentDoc.topLeftAlign")}
          config={{
            value: `["zhejiang","hangzhou","xihu"]`,
            options: options,
            label: {
              text: trans("componentDoc.pleaseSelectCity"),
              position: "column",
              align: "left",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CascaderWithDefault}
        />
        <Example
          title={trans("componentDoc.topRightAlign")}
          config={{
            value: `["zhejiang","hangzhou","xihu"]`,
            options: options,
            label: {
              text: trans("componentDoc.pleaseSelectCity"),
              position: "column",
              align: "right",
            },
          }}
          blackListConfig={blackListConfig}
          compFactory={CascaderWithDefault}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.advanced")}>
        <Example
          title={trans("componentDoc.allowClear")}
          config={{
            value: `["zhejiang","hangzhou","xihu"]`,
            options: options,
            label: {
              text: trans("componentDoc.pleaseSelectCity"),
            },
            allowClear: true,
          }}
          blackListConfig={blackListConfig}
          compFactory={CascaderWithDefault}
        />
      </ExampleGroup>
    </>
  );
}
