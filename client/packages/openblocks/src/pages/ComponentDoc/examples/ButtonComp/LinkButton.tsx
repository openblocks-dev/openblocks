import { LinkComp } from "comps/comps/buttonComp/linkComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function LinkExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.default")}
          config={{ text: trans("componentDoc.link") }}
          compFactory={LinkComp}
        />
        <Example
          title={trans("componentDoc.loading")}
          config={{ text: trans("componentDoc.link"), loading: true }}
          compFactory={LinkComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{ text: trans("componentDoc.link"), disabled: true }}
          compFactory={LinkComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.style")}>
        <Example
          title={trans("componentDoc.customAppearance")}
          config={{
            style: { color: "#A7392F" },
          }}
          compFactory={LinkComp}
        />
      </ExampleGroup>
    </>
  );
}
