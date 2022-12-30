import { ButtonComp } from "comps/comps/buttonComp/buttonComp";
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
          title={trans("componentDoc.default")}
          width={120}
          config={{ type: "default", text: trans("componentDoc.submit") }}
          compFactory={ButtonComp}
        />
        <Example
          title={trans("componentDoc.loading")}
          width={120}
          config={{ type: "default", text: trans("componentDoc.submit"), loading: true }}
          compFactory={ButtonComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          width={120}
          config={{ type: "default", text: trans("componentDoc.submit"), disabled: true }}
          compFactory={ButtonComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.style")}>
        <Example
          title={trans("componentDoc.danger")}
          width={120}
          config={{
            style: { backgroundColor: "#CD574C", borderColor: "#AC3A32", color: "#E0ECF6" },
          }}
          compFactory={ButtonComp}
        />
        <Example
          title={trans("componentDoc.warning")}
          width={120}
          config={{
            style: { backgroundColor: "#F4A125", borderColor: "#DA7D16", color: "#000000" },
          }}
          compFactory={ButtonComp}
        />
        <Example
          title={trans("componentDoc.success")}
          width={120}
          config={{
            style: { backgroundColor: "#5E8D6E", borderColor: "#40694E", color: "#E0ECF6" },
          }}
          compFactory={ButtonComp}
        />
      </ExampleGroup>
    </>
  );
}
