import { Dropdown, Menu } from "antd";
import { BoolControl } from "comps/controls/boolControl";
import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { ButtonStyleType } from "comps/controls/styleControlConstants";
import { withDefault } from "comps/generators";
import { UICompBuilder } from "comps/generators/uiCompBuilder";
import { disabledPropertyView, hiddenPropertyView } from "comps/utils/propertyUtils";
import { Section, sectionNames } from "openblocks-design";
import { trans } from "i18n";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { ButtonEventHandlerControl } from "../../controls/eventHandlerControl";
import { DropdownOptionControl } from "../../controls/optionsControl";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import {
  Button100,
  ButtonCompWrapper,
  ButtonStyleControl,
  getButtonStyle,
} from "./buttonCompConstants";

const DropdownButton = styled(Dropdown.Button)`
  width: 100%;

  .ant-btn-group {
    width: 100%;
  }
`;

const LeftButtonWrapper = styled.div<{ $buttonStyle: ButtonStyleType }>`
  width: calc(100% - 32px);

  .ant-btn {
    ${(props) => getButtonStyle(props.$buttonStyle)}
    &.ant-btn-default {
      ${(props) => `border-radius: ${props.$buttonStyle.radius} 0 0 ${props.$buttonStyle.radius};`}
    }
    width: 100%;
  }
`;

const RightButtonWrapper = styled.div<{ $buttonStyle: ButtonStyleType }>`
  width: 32px;
  margin-left: -1px;

  .ant-btn {
    ${(props) => getButtonStyle(props.$buttonStyle)}
    &.ant-btn-default {
      ${(props) => `border-radius: 0 ${props.$buttonStyle.radius} ${props.$buttonStyle.radius} 0;`}
    }
    width: 100%;
  }
`;

const DropdownTmpComp = (function () {
  const childrenMap = {
    text: withDefault(StringControl, trans("menu")),
    onlyMenu: BoolControl,
    options: DropdownOptionControl,
    disabled: BoolCodeControl,
    onEvent: ButtonEventHandlerControl,
    style: withDefault(ButtonStyleControl, { background: "#FFFFFF" }),
  };
  return new UICompBuilder(childrenMap, (props) => {
    const hasIcon =
      props.options.findIndex((option) => (option.prefixIcon as ReactElement)?.props.value) > -1;
    const items = props.options
      .filter((option) => !option.hidden)
      .map((option, index) => ({
        title: option.label,
        label: option.label,
        key: option.label + " - " + index,
        disabled: option.disabled,
        icon: hasIcon && <span>{option.prefixIcon}</span>,
        onEvent: option.onEvent,
      }));
    const menu = (
      <Menu
        items={items}
        onClick={({ key }) => items.find((o) => o.key === key)?.onEvent("click")}
      />
    );

    return (
      <ButtonCompWrapper disabled={props.disabled}>
        {props.onlyMenu ? (
          <Dropdown disabled={props.disabled} overlay={menu}>
            <Button100 $buttonStyle={props.style} disabled={props.disabled}>
              {props.text || " " /* Avoid button disappearing */}
            </Button100>
          </Dropdown>
        ) : (
          <DropdownButton
            disabled={props.disabled}
            overlay={menu}
            onClick={() => props.onEvent("click")}
            buttonsRender={([left, right]) => [
              <LeftButtonWrapper $buttonStyle={props.style}>
                {React.cloneElement(left as React.ReactElement<any, string>, {
                  disabled: props.disabled,
                })}
              </LeftButtonWrapper>,
              <RightButtonWrapper $buttonStyle={props.style}>
                {React.cloneElement(right as React.ReactElement<any, string>, {
                  disabled: props.disabled,
                })}
              </RightButtonWrapper>,
            ]}
          >
            {/* Avoid button disappearing */}
            {!props.text || props.text?.length === 0 ? " " : props.text}
          </DropdownButton>
        )}
      </ButtonCompWrapper>
    );
  })
    .setPropertyViewFn((children) => (
      <>
        <Section name={sectionNames.basic}>
          {children.options.propertyView({})}
          {children.text.propertyView({ label: trans("text") })}
          {children.onlyMenu.propertyView({ label: trans("dropdown.onlyMenu") })}
        </Section>

        <Section name={sectionNames.interaction}>
          {disabledPropertyView(children)}
          {!children.onlyMenu.getView() && children.onEvent.getPropertyView()}
        </Section>

        <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    ))
    .build();
})();

export const DropdownComp = withExposingConfigs(DropdownTmpComp, [
  new NameConfig("text", trans("dropdown.textDesc")),
  ...CommonNameConfig,
]);
