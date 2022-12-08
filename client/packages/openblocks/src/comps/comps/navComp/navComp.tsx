import { NameConfig, NameConfigHidden, withExposingConfigs } from "comps/generators/withExposing";
import { UICompBuilder, withDefault } from "comps/generators";
import { Section, sectionNames } from "openblocks-design";
import styled from "styled-components";
import { clickEvent, eventHandlerControl } from "comps/controls/eventHandlerControl";
import { StringControl } from "comps/controls/codeControl";
import { alignWithJustifyControl } from "comps/controls/alignControl";
import { navListComp } from "./navItemComp";
import { menuPropertyView } from "./components/MenuItemList";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, MenuProps } from "antd";
import { migrateOldData } from "comps/generators/simpleGenerators";
import { styleControl } from "comps/controls/styleControl";
import { NavigationStyle } from "comps/controls/styleControlConstants";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";

type IProps = {
  justify: boolean;
  bgColor: string;
  borderColor: string;
};

const Wrapper = styled("div")<Pick<IProps, "bgColor" | "borderColor">>`
  height: 100%;
  border-radius: 2px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.bgColor};
`;

const NavInner = styled("div")<Pick<IProps, "justify">>`
  margin: 0 -16px;
  height: 100%;
  display: flex;
  justify-content: ${(props) => (props.justify ? "space-between" : "left")};
`;

const Item = styled.div<{
  active: boolean;
  activeColor: string;
  color: string;
}>`
  height: 30px;
  line-height: 30px;
  padding: 0 16px;
  color: ${(props) => (props.active ? props.activeColor : props.color)};
  font-weight: 500;

  &:hover {
    color: ${(props) => props.activeColor};
    cursor: pointer;
  }

  .anticon {
    margin-left: 5px;
  }
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  height: 30px;
  line-height: 0;
  margin-left: 16px;

  img {
    height: 100%;
  }
`;

const ItemList = styled.div<{ align: string }>`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.align};
`;

const StyledMenu = styled(Menu)<MenuProps>`
  &.ant-dropdown-menu {
    min-width: 160px;
  }
`;

const logoEventHandlers = [clickEvent];

// Compatible with historical style data 2022-8-26
function fixOldStyleData(oldData: any) {
  if (
    oldData &&
    (oldData.hasOwnProperty("accentColor") ||
      oldData.hasOwnProperty("backgroundColor") ||
      oldData.hasOwnProperty("borderColor") ||
      oldData.hasOwnProperty("color"))
  ) {
    return {
      text: oldData.color,
      accent: oldData.accentColor,
      background: oldData.backgroundColor,
      border: oldData.borderColor,
    };
  }
  return oldData;
}

const childrenMap = {
  logoUrl: StringControl,
  logoEvent: withDefault(eventHandlerControl(logoEventHandlers), [{ name: "click" }]),
  horizontalAlignment: alignWithJustifyControl(),
  style: migrateOldData(styleControl(NavigationStyle), fixOldStyleData),
  items: withDefault(navListComp(), [
    {
      label: trans("menuItem") + " 1",
    },
  ]),
};

const NavCompBase = new UICompBuilder(childrenMap, (props) => {
  const data = props.items;
  const items = (
    <>
      {data.map((menuItem, idx) => {
        const { hidden, label, items, active, onEvent } = menuItem.getView();
        if (hidden) {
          return null;
        }
        const visibleSubItems = items.filter((item) => !item.children.hidden.getView());
        const subMenuItems: Array<{ key: string; label: string }> = [];
        const subMenuSelectedKeys: Array<string> = [];
        visibleSubItems.forEach((subItem, index) => {
          const key = index + "";
          subItem.children.active.getView() && subMenuSelectedKeys.push(key);
          subMenuItems.push({
            key: key,
            label: subItem.children.label.getView(),
          });
        });
        const item = (
          <Item
            key={idx}
            active={active || subMenuSelectedKeys.length > 0}
            color={props.style.text}
            activeColor={props.style.accent}
            onClick={() => onEvent("click")}
          >
            {label}
            {items.length > 0 && <DownOutlined />}
          </Item>
        );
        if (visibleSubItems.length > 0) {
          const subMenu = (
            <StyledMenu
              onClick={(e) => {
                const { onEvent: onSubEvent } = items[Number(e.key)]?.getView();
                onSubEvent("click");
              }}
              selectedKeys={subMenuSelectedKeys}
              items={subMenuItems}
            />
          );
          return (
            <Dropdown key={idx} overlay={subMenu}>
              {item}
            </Dropdown>
          );
        }
        return item;
      })}
    </>
  );

  const justify = props.horizontalAlignment === "justify";

  return (
    <Wrapper borderColor={props.style.border} bgColor={props.style.background}>
      <NavInner justify={justify}>
        {props.logoUrl && (
          <LogoWrapper onClick={() => props.logoEvent("click")}>
            <img src={props.logoUrl} alt="LOGO" />
          </LogoWrapper>
        )}
        {!justify ? <ItemList align={props.horizontalAlignment}>{items}</ItemList> : items}
      </NavInner>
    </Wrapper>
  );
})
  .setPropertyViewFn((children) => {
    return (
      <>
        <Section name={trans("prop.logo")}>
          {children.logoUrl.propertyView({ label: trans("navigation.logoURL") })}
          {children.logoUrl.getView() && children.logoEvent.propertyView({ inline: true })}
        </Section>
        <Section name={trans("menu")}>
          {menuPropertyView(children.items)}
          {children.horizontalAlignment.propertyView({
            label: trans("navigation.horizontalAlignment"),
            radioButton: true,
          })}
        </Section>
        <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    );
  })
  .build();

export const NavComp = withExposingConfigs(NavCompBase, [
  new NameConfig("logoUrl", trans("navigation.logoURLDesc")),
  NameConfigHidden,
  new NameConfig("items", trans("navigation.itemsDesc")),
]);
