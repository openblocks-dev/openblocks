import { MultiCompBuilder } from "comps/generators";
import { Dropdown, Menu, Space } from "antd";
import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { manualOptionsControl } from "comps/controls/optionsControl";
import { ActionSelectorControlInContext } from "comps/controls/actionSelector/actionSelectorControl";
import { EllipsisOutlined } from "@ant-design/icons";
import { ColumnTypeCompBuilder } from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { trans } from "i18n";
import { hiddenPropertyView } from "comps/utils/propertyUtils";

const OptionItem = new MultiCompBuilder(
  {
    label: StringControl,
    onClick: ActionSelectorControlInContext,
    hidden: BoolCodeControl,
  },
  (props) => {
    return props;
  }
)
  .setPropertyViewFn((children) => {
    return (
      <>
        {children.label.propertyView({ label: trans("label") })}
        {children.onClick.propertyView({
          label: trans("table.action"),
          placement: "table",
        })}
        {hiddenPropertyView(children)}
      </>
    );
  })
  .build();

export const ColumnLinksComp = (function () {
  const childrenMap = {
    options: manualOptionsControl(OptionItem, {
      initOptions: [{ label: trans("table.option1") }],
    }),
  };
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props) => {
      const menu = props.options.length > 3 && (
        <Menu>
          {props.options
            .filter((o) => !o.hidden)
            .slice(3)
            .map((option, index) => (
              <Menu.Item key={index}>
                <a onClick={option.onClick} style={{ color: "#3377FF" }}>
                  {option.label}
                </a>
              </Menu.Item>
            ))}
        </Menu>
      );

      return (
        <>
          <Space>
            {props.options
              .filter((o) => !o.hidden)
              .slice(0, 3)
              .map((option, i) => (
                <a onClick={option.onClick} key={i}>
                  {option.label}
                </a>
              ))}
            {menu && (
              <Dropdown overlay={menu} trigger={["hover"]}>
                <EllipsisOutlined onClick={(e) => e.preventDefault()} />
              </Dropdown>
            )}
          </Space>
        </>
      );
    },
    () => ""
  )
    .setPropertyViewFn((children) => (
      <>
        {children.options.propertyView({
          newOptionLabel: trans("table.option"),
          title: trans("table.optionList"),
        })}
      </>
    ))
    .build();
})();
