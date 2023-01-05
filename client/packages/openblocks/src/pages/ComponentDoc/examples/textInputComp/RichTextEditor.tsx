import { RichTextEditorComp } from "comps/comps/richTextEditorComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function InputExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example title="" config={{}} hideSettings={true} compFactory={RichTextEditorComp} />
      </ExampleGroup>
    </>
  );
}
