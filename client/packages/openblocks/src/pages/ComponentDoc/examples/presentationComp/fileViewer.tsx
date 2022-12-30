import { FileViewerComp } from "comps/comps/fileViewerComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function FileViewerExample() {
  const blackListConfig: string[] = [trans("componentDoc.src")];
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title=""
          width={1000}
          height={600}
          blackListConfig={blackListConfig}
          hideSettings={true}
          config={{
            src: "https://majiang-files.oss-cn-hangzhou.aliyuncs.com/quick-tutorial.pdf",
          }}
          compFactory={FileViewerComp}
        />
      </ExampleGroup>
    </>
  );
}
