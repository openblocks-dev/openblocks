import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { withDefault } from "comps/generators";
import { UICompBuilder } from "comps/generators/uiCompBuilder";
import {
  disabledPropertyView,
  hiddenPropertyView,
  loadingPropertyView,
} from "comps/utils/propertyUtils";
import { Section, sectionNames } from "openblocks-design";
import { trans } from "i18n";
import styled from "styled-components";
import { ChangeEventHandlerControl } from "../../controls/eventHandlerControl";
import {
  CommonNameConfig,
  NameConfig,
  withExposingConfigs,
} from "../../generators/withExposing";
import { Button100, ButtonCompWrapper } from "./buttonCompConstants";
import { IconControl } from "comps/controls/iconControl";
import {
  AlignWithStretchControl,
  LeftRightControl,
} from "comps/controls/dropdownControl";
import { booleanExposingStateControl } from "comps/controls/codeStateControl";
import { ToggleButtonStyle } from "comps/controls/styleControlConstants";
import { styleControl } from "comps/controls/styleControl";
import { BoolControl } from "comps/controls/boolControl";
import { PaddingControl } from "../../controls/paddingControl";
import { MarginControl } from "../../controls/marginControl";

const IconWrapper = styled.div`
  display: flex;
`;

const ButtonCompWrapperStyled = styled(ButtonCompWrapper)<{
  align: "left" | "center" | "right" | "stretch";
  showBorder: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.align};

  > button {
    width: ${(props) => props.align !== "stretch" && "auto"};
    border: ${(props) => !props.showBorder && "none"};
    box-shadow: ${(props) => !props.showBorder && "none"};
  }
`;

const ToggleTmpComp = (function () {
  const childrenMap = {
    value: booleanExposingStateControl("value"),
    showText: withDefault(BoolControl, true),
    trueText: withDefault(StringControl, trans("toggleButton.trueDefaultText")),
    falseText: withDefault(
      StringControl,
      trans("toggleButton.falseDefaultText")
    ),
    onEvent: ChangeEventHandlerControl,
    disabled: BoolCodeControl,
    loading: BoolCodeControl,
    trueIcon: withDefault(IconControl, "/icon:solid/AngleUp"),
    falseIcon: withDefault(IconControl, "/icon:solid/AngleDown"),
    iconPosition: LeftRightControl,
    alignment: AlignWithStretchControl,
    style: styleControl(ToggleButtonStyle),
    showBorder: withDefault(BoolControl, true),
    margin: MarginControl,
    padding: PaddingControl,
  };
  return new UICompBuilder(childrenMap, (props) => {
    const text = props.showText
      ? (props.value.value ? props.trueText : props.falseText) || undefined
      : undefined;
    return (
      <ButtonCompWrapperStyled
        disabled={props.disabled}
        align={props.alignment}
        showBorder={props.showBorder}
      >
        <Button100
          $buttonStyle={props.style}
          loading={props.loading}
          disabled={props.disabled}
          onClick={() => {
            props.onEvent("change");
            props.value.onChange(!props.value.value);
          }}
          style={{
            marginTop: props.margin.top ? props.margin.top : 0,
            marginRight: props.margin.right ? props.margin.right : 0,
            marginBottom: props.margin.bottom ? props.margin.bottom : 0,
            marginLeft: props.margin.left ? props.margin.left : 0,
            paddingTop: props.padding.top ? props.padding.top : 0,
            paddingRight: props.padding.right ? props.padding.right : 0,
            paddingBottom: props.padding.bottom ? props.padding.bottom : 0,
            paddingLeft: props.padding.left ? props.padding.left : 0,
          }}
        >
          {props.iconPosition === "right" && text}
          {
            <IconWrapper>
              {props.value.value ? props.trueIcon : props.falseIcon}
            </IconWrapper>
          }
          {props.iconPosition === "left" && text}
        </Button100>
      </ButtonCompWrapperStyled>
    );
  })
    .setPropertyViewFn((children) => (
      <>
        <Section name={sectionNames.basic}>
          {children.value.propertyView({
            label: trans("prop.defaultValue"),
            tooltip: trans("toggleButton.valueDesc"),
          })}
          {children.showText.propertyView({
            label: trans("toggleButton.showText"),
          })}
          {children.showText.getView() &&
            children.trueText.propertyView({
              label: trans("toggleButton.trueLabel"),
            })}
          {children.showText.getView() &&
            children.falseText.propertyView({
              label: trans("toggleButton.falseLabel"),
            })}
        </Section>

        <Section name={sectionNames.interaction}>
          {children.onEvent.getPropertyView()}
          {disabledPropertyView(children)}
          {loadingPropertyView(children)}
        </Section>

        <Section name={sectionNames.layout}>
          {children.trueIcon.propertyView({
            label: trans("toggleButton.trueIconLabel"),
          })}
          {children.falseIcon.propertyView({
            label: trans("toggleButton.falseIconLabel"),
          })}
          {children.showText.getView() &&
            children.iconPosition.propertyView({
              label: trans("toggleButton.iconPosition"),
              radioButton: true,
            })}
          {children.alignment.propertyView({
            label: trans("toggleButton.alignment"),
            radioButton: true,
          })}
          {hiddenPropertyView(children)}
        </Section>

        <Section name={sectionNames.style}>
          {children.showBorder.propertyView({
            label: trans("toggleButton.showBorder"),
          })}
          {children.style.getPropertyView()}
        </Section>
        <Section name={trans("style.margin")}>
          {children.margin.getPropertyView()}
        </Section>
        <Section name={trans("style.padding")}>
          {children.padding.getPropertyView()}
        </Section>
      </>
    ))
    .build();
})();

export const ToggleButtonComp = withExposingConfigs(ToggleTmpComp, [
  new NameConfig("value", trans("dropdown.textDesc")),
  new NameConfig("loading", trans("button.loadingDesc")),
  ...CommonNameConfig,
]);
