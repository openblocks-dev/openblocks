import { FileComp } from "comps/comps/fileComp/fileComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function FileExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.default")}
          config={{
            disabled: false,
          }}
          compFactory={FileComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          config={{
            disabled: true,
          }}
          compFactory={FileComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.option")}>
        <Example
          title={trans("componentDoc.singleFileUpload")}
          config={{
            disabled: false,
            filetype: '[".png", ".pdf", ".word"]',
            showUploadList: false,
            uploadType: "single",
          }}
          compFactory={FileComp}
        />
        <Example
          title={trans("componentDoc.multiFileUpload")}
          config={{
            disabled: false,
            filetype: '[".png", ".pdf", ".word"]',
            uploadType: "multiple",
          }}
          compFactory={FileComp}
        />
        <Example
          title={trans("componentDoc.folderUpload")}
          config={{
            disabled: false,
            filetype: '[".png", ".pdf", ".word"]',
            uploadType: "directory",
          }}
          compFactory={FileComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.validation")} description="">
        <Example
          title={trans("componentDoc.singleFile")}
          width={340}
          config={{
            minSize: "100KB",
            maxSize: "100MB",
          }}
          compFactory={FileComp}
        />
        <Example
          title={trans("componentDoc.multiple")}
          width={340}
          config={{
            maxFiles: "5",
            minSize: "200KB",
            maxSize: "100MB",
          }}
          compFactory={FileComp}
        />
        <Example
          title={trans("componentDoc.directory")}
          width={340}
          config={{
            maxFiles: "10",
            minSize: "10KB",
            maxSize: "100MB",
          }}
          compFactory={FileComp}
        />
      </ExampleGroup>
    </>
  );
}
