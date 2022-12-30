import { DropdownComp } from "comps/comps/buttonComp/dropdownComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function DropdownExample() {
  const blackListConfig: string[] = ["options.manual.manual"];
  const options = {
    optionType: "manual",
    manual: {
      manual: [
        {
          label: `${trans("componentDoc.option")} 1`,
          disabled: "",
          hidden: "",
          onEvent: [],
        },
        {
          label: `${trans("componentDoc.option")} 2`,
          disabled: "",
          hidden: "",
          onEvent: [],
        },
        {
          label: `${trans("componentDoc.option")} 3`,
          disabled: "",
          hidden: "",
          onEvent: [],
        },
      ],
    },
  };
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.default")}
          width={120}
          config={{ type: "default", text: trans("componentDoc.menu"), options: options }}
          blackListConfig={blackListConfig}
          compFactory={DropdownComp}
        />
        <Example
          title={trans("componentDoc.loading")}
          width={120}
          config={{
            type: "default",
            text: trans("componentDoc.menu"),
            loading: true,
            options: options,
          }}
          blackListConfig={blackListConfig}
          compFactory={DropdownComp}
        />
        <Example
          title={trans("componentDoc.disabled")}
          width={120}
          config={{
            type: "default",
            text: trans("componentDoc.menu"),
            disabled: true,
            options: options,
          }}
          blackListConfig={blackListConfig}
          compFactory={DropdownComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.style")}>
        <Example
          title={trans("componentDoc.danger")}
          width={120}
          config={{
            style: { backgroundColor: "#CD574C", borderColor: "#AC3A32", color: "#e0ecf6" },
          }}
          compFactory={DropdownComp}
        />
        <Example
          title={trans("componentDoc.warning")}
          width={120}
          config={{
            style: { backgroundColor: "#F4A125", borderColor: "#DA7D16", color: "#000000" },
          }}
          compFactory={DropdownComp}
        />
        <Example
          title={trans("componentDoc.success")}
          width={120}
          config={{
            style: { backgroundColor: "#5E8D6E", borderColor: "#40694E", color: "#e0ecf6" },
          }}
          compFactory={DropdownComp}
        />
        <Example
          title={trans("componentDoc.onlyMenu")}
          width={120}
          config={{
            onlyMenu: true,
          }}
          compFactory={DropdownComp}
        />
      </ExampleGroup>
    </>
  );
}
