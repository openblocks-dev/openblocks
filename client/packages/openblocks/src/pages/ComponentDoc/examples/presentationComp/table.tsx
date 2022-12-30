import { TableComp } from "comps/comps/tableComp";
import { trans, i18nObjs } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

const data = JSON.stringify(i18nObjs.table.defaultData);

export default function TableExample() {
  const blackListConfig: string[] = ["data", "size"];
  const nameMap: Record<string, string> = {
    size: trans("componentDoc.tableSize"),
  };
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.default")}
          width={400}
          config={{
            data: data,
            size: "middle",
          }}
          blackListConfig={blackListConfig}
          nameMap={nameMap}
          compFactory={TableComp}
        />
        <Example
          title={trans("componentDoc.small")}
          width={400}
          config={{
            data: data,
            size: "small",
          }}
          blackListConfig={blackListConfig}
          nameMap={nameMap}
          compFactory={TableComp}
        />
        <Example
          title={trans("componentDoc.large")}
          width={400}
          config={{
            data: data,
            size: "large",
          }}
          blackListConfig={blackListConfig}
          nameMap={nameMap}
          compFactory={TableComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.style")}>
        <Example
          title={trans("componentDoc.hideHeader")}
          width={400}
          config={{ data: data, hideHeader: true }}
          blackListConfig={blackListConfig}
          compFactory={TableComp}
        />
        <Example
          title={trans("componentDoc.hideBordered")}
          width={400}
          config={{ data: data, hideBordered: true }}
          blackListConfig={blackListConfig}
          compFactory={TableComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.selectionMode")}>
        <Example
          title={trans("componentDoc.single")}
          width={400}
          config={{ data: data, hideHeader: true, selection: { mode: "single" } }}
          blackListConfig={blackListConfig}
          compFactory={TableComp}
        />
        <Example
          title={trans("componentDoc.multi")}
          width={400}
          config={{ data: data, hideBordered: true, selection: { mode: "multi" } }}
          blackListConfig={blackListConfig}
          compFactory={TableComp}
        />
        <Example
          title={trans("componentDoc.close")}
          width={400}
          config={{ data: data, hideBordered: true, selection: { mode: "close" } }}
          blackListConfig={blackListConfig}
          compFactory={TableComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.paginationSetting")}>
        <Example
          title={trans("componentDoc.paginationShowQuickJumper")}
          width={400}
          config={{ data: data, hideHeader: true, pagination: { showQuickJumper: true } }}
          blackListConfig={blackListConfig}
          compFactory={TableComp}
        />
        <Example
          title={trans("componentDoc.paginationHideOnSinglePage")}
          width={400}
          config={{
            data: '[\n {\n  "id": 1,\n  "name": "Lucy",\n  "phoneNumber": "17137564247"}]',
            hideBordered: true,
            pagination: { hideOnSinglePage: true },
          }}
          blackListConfig={blackListConfig}
          compFactory={TableComp}
        />
        <Example
          title={trans("componentDoc.paginationShowSizeChanger")}
          width={400}
          config={{
            data: data,
            pagination: { showSizeChanger: true, pageSizeOptions: "[5, 10, 20, 50]" },
          }}
          blackListConfig={blackListConfig}
          compFactory={TableComp}
        />
      </ExampleGroup>
    </>
  );
}
