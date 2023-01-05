import { TextComp } from "comps/comps/textComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function TextExample() {
  const nameMap: Record<string, string> = {
    type: trans("componentDoc.format"),
    text: trans("componentDoc.content"),
  };
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title="markdown"
          config={{
            text: trans("componentDoc.markdownDemoText"),
            type: "markdown",
          }}
          nameMap={nameMap}
          compFactory={TextComp}
        />
        <Example
          title={trans("componentDoc.text")}
          config={{
            text: trans("componentDoc.demoText"),
            type: "text",
          }}
          nameMap={nameMap}
          compFactory={TextComp}
        />
      </ExampleGroup>
    </>
  );
}
