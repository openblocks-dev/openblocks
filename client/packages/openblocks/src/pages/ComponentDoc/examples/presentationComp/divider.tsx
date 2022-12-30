import { DividerComp } from "comps/comps/dividerComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function DividerExample() {
  const nameMap: Record<string, string> = {
    title: trans("componentDoc.title"),
    align: trans("componentDoc.titleAlign"),
    color: trans("componentDoc.color"),
    dashed: trans("componentDoc.dashed"),
  };
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example title="" hideSettings={true} config={{}} compFactory={DividerComp} />
      </ExampleGroup>

      <ExampleGroup title={trans("componentDoc.titleAlign")}>
        <Example
          title={trans("componentDoc.left")}
          nameMap={nameMap}
          config={{
            title: trans("componentDoc.imADivider"),
            align: "left",
            color: "#222222",
          }}
          compFactory={DividerComp}
        />
        <Example
          title={trans("componentDoc.center")}
          nameMap={nameMap}
          config={{
            title: trans("componentDoc.imADivider"),
            align: "center",
            color: "#222222",
          }}
          compFactory={DividerComp}
        />
        <Example
          title={trans("componentDoc.right")}
          nameMap={nameMap}
          config={{
            title: trans("componentDoc.imADivider"),
            align: "right",
            color: "#222222",
          }}
          compFactory={DividerComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.style")}>
        <Example
          title={trans("componentDoc.dashed")}
          nameMap={nameMap}
          config={{
            title: trans("componentDoc.imADivider"),
            align: "left",
            color: "#222222",
            dashed: true,
          }}
          compFactory={DividerComp}
        />
        <Example
          title={trans("componentDoc.color")}
          nameMap={nameMap}
          config={{
            title: trans("componentDoc.imADivider"),
            align: "center",
            color: "#666666",
          }}
          compFactory={DividerComp}
        />
      </ExampleGroup>
    </>
  );
}
