import { TextAreaComp } from "comps/comps/textInputComp/textAreaComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function ButtonExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.placeholder")}
          config={{
            placeholder: trans("componentDoc.pleaseInputName"),
            disabled: false,
          }}
          compFactory={TextAreaComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            placeholder: trans("componentDoc.pleaseInputName"),
            disabled: true,
          }}
          compFactory={TextAreaComp}
        />
      </ExampleGroup>

      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.left")}
          config={{
            label: { text: trans("componentDoc.userName"), position: "row" },
            placeholder: trans("componentDoc.pleaseInputName"),
          }}
          compFactory={TextAreaComp}
        />
        <Example
          title={trans("componentDoc.column")}
          config={{
            label: { text: trans("componentDoc.userName"), position: "column" },
            placeholder: trans("componentDoc.pleaseInputName"),
          }}
          compFactory={TextAreaComp}
        />
        <Example
          title={trans("componentDoc.textAlign")}
          config={{
            placeholder: trans("componentDoc.pleaseInputName"),
            label: { text: trans("componentDoc.userName"), align: "right" },
          }}
          compFactory={TextAreaComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.validation")} description="">
        <Example
          title={trans("componentDoc.required")}
          width={340}
          config={{
            label: { text: trans("componentDoc.userName") },
            placeholder: trans("componentDoc.pleaseInputName"),
            required: true,
          }}
          compFactory={TextAreaComp}
        />
        <Example
          title={trans("componentDoc.length")}
          width={340}
          config={{
            label: { text: trans("componentDoc.userName") },
            placeholder: trans("componentDoc.pleaseInputName"),
            minLength: 3,
            maxLength: 6,
          }}
          compFactory={TextAreaComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.autoHeight")} description="">
        <Example
          title={trans("componentDoc.fixed")}
          width={340}
          config={{
            label: { text: trans("componentDoc.userName") },
            autoHeight: "fixed",
          }}
          compFactory={TextAreaComp}
        />
        <Example
          title={trans("componentDoc.auto")}
          width={340}
          config={{
            label: { text: trans("componentDoc.userName") },
            autoHeight: "auto",
          }}
          compFactory={TextAreaComp}
        />
      </ExampleGroup>
    </>
  );
}
