import { NumberInputComp } from "comps/comps/numberInputComp/numberInputComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function NumberInputExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.placeholder")}
          config={{
            placeholder: trans("componentDoc.pleaseInputNumber"),
            disabled: false,
          }}
          compFactory={NumberInputComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            placeholder: trans("componentDoc.pleaseInputName"),
            disabled: true,
          }}
          compFactory={NumberInputComp}
        />
      </ExampleGroup>

      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.left")}
          config={{
            label: { text: trans("componentDoc.labelText"), position: "row" },
            placeholder: trans("componentDoc.pleaseInputName"),
          }}
          compFactory={NumberInputComp}
        />
        <Example
          title={trans("componentDoc.column")}
          config={{
            label: { text: trans("componentDoc.labelText"), position: "column" },
            placeholder: trans("componentDoc.pleaseInputName"),
          }}
          compFactory={NumberInputComp}
        />
        <Example
          title={trans("componentDoc.textAlign")}
          config={{
            label: { text: trans("componentDoc.labelText"), align: "right" },
            placeholder: trans("componentDoc.pleaseInputName"),
          }}
          compFactory={NumberInputComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.format")} description="">
        <Example
          title={trans("componentDoc.percent")}
          config={{
            value: "123",
            formatter: "percent",
          }}
          compFactory={NumberInputComp}
        />
        <Example
          title={trans("componentDoc.thousandsSeparator")}
          config={{
            value: "12345678",
            thousandsSeparator: true,
          }}
          compFactory={NumberInputComp}
        />
        <Example
          title={trans("componentDoc.precision")}
          config={{
            value: "12.34",
            precision: "3",
          }}
          compFactory={NumberInputComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.validation")}>
        <Example
          title={trans("componentDoc.mostValue")}
          config={{
            min: "1",
            max: "10",
          }}
          compFactory={NumberInputComp}
        />
        <Example
          title={trans("componentDoc.required")}
          config={{
            required: true,
          }}
          compFactory={NumberInputComp}
        />
      </ExampleGroup>
    </>
  );
}
