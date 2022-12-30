import { PasswordComp } from "comps/comps/textInputComp/passwordComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function PasswordExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.placeholder")}
          config={{
            placeholder: trans("componentDoc.pleaseInputPassword"),
            disabled: false,
          }}
          compFactory={PasswordComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            placeholder: trans("componentDoc.pleaseInputPassword"),
            disabled: true,
          }}
          compFactory={PasswordComp}
        />
      </ExampleGroup>

      <ExampleGroup title={trans("componentDoc.labelText")} description="">
        <Example
          title={trans("componentDoc.left")}
          config={{
            label: { text: trans("componentDoc.password"), position: "row" },
            placeholder: trans("componentDoc.pleaseInputPassword"),
          }}
          compFactory={PasswordComp}
        />
        <Example
          title={trans("componentDoc.column")}
          config={{
            label: { text: trans("componentDoc.password"), position: "column" },
            placeholder: trans("componentDoc.pleaseInputPassword"),
          }}
          compFactory={PasswordComp}
        />
        <Example
          title={trans("componentDoc.textAlign")}
          config={{
            label: { text: trans("componentDoc.password"), align: "right" },
            placeholder: trans("componentDoc.pleaseInputPassword"),
          }}
          compFactory={PasswordComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.validation")} description="">
        <Example
          title={trans("componentDoc.required")}
          width={340}
          config={{
            label: { text: trans("componentDoc.password") },
            placeholder: trans("componentDoc.pleaseInputPassword"),
            required: true,
          }}
          compFactory={PasswordComp}
        />
        <Example
          title={trans("componentDoc.length")}
          width={340}
          config={{
            label: { text: trans("componentDoc.password") },
            placeholder: trans("componentDoc.pleaseInputPassword"),
            minLength: 3,
            maxLength: 6,
          }}
          compFactory={PasswordComp}
        />
      </ExampleGroup>
    </>
  );
}
