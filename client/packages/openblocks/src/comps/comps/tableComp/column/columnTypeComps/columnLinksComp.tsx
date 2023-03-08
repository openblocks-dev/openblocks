import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { ColumnTypeCompBuilder } from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { ActionSelectorControlInContext } from "comps/controls/actionSelector/actionSelectorControl";
import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { manualOptionsControl } from "comps/controls/optionsControl";
import { MultiCompBuilder } from "comps/generators";
import { disabledPropertyView, hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import styled from "styled-components";
import { ColumnLink } from "comps/comps/tableComp/column/columnTypeComps/columnLinkComp";
import { LightActiveTextColor, PrimaryColor } from "constants/style";

const LinksWrapper = styled.div`
  white-space: nowrap;

  > a {
    margin-right: 8px;
  }

  > a:last-child {
    margin-right: 0;
  }
`;

const MenuLinkWrapper = styled.div`
  > a {
    color: ${PrimaryColor} !important;

    :hover {
      color: ${LightActiveTextColor} !important;
    }
  }
`;

const OptionItem = new MultiCompBuilder(
  {
    label: StringControl,
    onClick: ActionSelectorControlInContext,
    hidden: BoolCodeControl,
    disabled: BoolCodeControl,
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
        {disabledPropertyView(children)}
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
                <MenuLinkWrapper>
                  <ColumnLink
                    disabled={option.disabled}
                    label={option.label}
                    onClick={option.onClick}
                  />
                </MenuLinkWrapper>
              </Menu.Item>
            ))}
        </Menu>
      );

      return (
        <LinksWrapper>
          {props.options
            .filter((o) => !o.hidden)
            .slice(0, 3)
            .map((option, i) => (
              <ColumnLink
                key={i}
                disabled={option.disabled}
                label={option.label}
                onClick={option.onClick}
              />
            ))}
          {menu && (
            <Dropdown overlay={menu} trigger={["hover"]}>
              <EllipsisOutlined onClick={(e) => e.preventDefault()} />
            </Dropdown>
          )}
        </LinksWrapper>
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
