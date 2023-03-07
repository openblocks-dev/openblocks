import { Button } from "antd";
import { ButtonCompWrapper, buttonRefMethods } from "comps/comps/buttonComp/buttonCompConstants";
import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { ButtonEventHandlerControl } from "comps/controls/eventHandlerControl";
import { styleControl } from "comps/controls/styleControl";
import { LinkStyle, LinkStyleType } from "comps/controls/styleControlConstants";
import { withDefault } from "comps/generators";
import { migrateOldData } from "comps/generators/simpleGenerators";
import { UICompBuilder } from "comps/generators/uiCompBuilder";
import { Section, sectionNames } from "openblocks-design";
import styled from "styled-components";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import {
  hiddenPropertyView,
  disabledPropertyView,
  loadingPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { IconControl } from "comps/controls/iconControl";
import { hasIcon } from "comps/utils";
import { RefControl } from "comps/controls/refControl";

const Link = styled(Button)<{ $style: LinkStyleType }>`
  ${(props) => `color: ${props.$style.text};`}
  &.ant-btn {
    display: inline-flex;
    align-items: center;
    > span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: 1px;
    }
  }
`;

const IconWrapper = styled.span`
  display: flex;
`;

/**
 * compatible with old data 2022-08-26
 */
function fixOldData(oldData: any) {
  if (oldData && oldData.hasOwnProperty("color")) {
    return {
      text: oldData.color,
    };
  }
  return oldData;
}

const LinkTmpComp = (function () {
  const childrenMap = {
    text: withDefault(StringControl, trans("link.link")),
    onEvent: ButtonEventHandlerControl,
    disabled: BoolCodeControl,
    loading: BoolCodeControl,
    style: migrateOldData(styleControl(LinkStyle), fixOldData),
    prefixIcon: IconControl,
    suffixIcon: IconControl,
    viewRef: RefControl<HTMLElement>,
  };
  return new UICompBuilder(childrenMap, (props) => {
    // chrome86 bug: button children should not contain only empty span
    const hasChildren = hasIcon(props.prefixIcon) || !!props.text || hasIcon(props.suffixIcon);
    return (
      <ButtonCompWrapper disabled={props.disabled}>
        <Link
          ref={props.viewRef}
          $style={props.style}
          loading={props.loading}
          disabled={props.disabled}
          onClick={() => props.onEvent("click")}
          type={"link"}
        >
          {hasChildren && (
            <span>
              {hasIcon(props.prefixIcon) && <IconWrapper>{props.prefixIcon}</IconWrapper>}
              {!!props.text && props.text}
              {hasIcon(props.suffixIcon) && <IconWrapper>{props.suffixIcon}</IconWrapper>}
            </span>
          )}
        </Link>
      </ButtonCompWrapper>
    );
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.text.propertyView({ label: trans("text") })}
          </Section>

          <Section name={sectionNames.interaction}>
            {children.onEvent.getPropertyView()}
            {disabledPropertyView(children)}
            {loadingPropertyView(children)}
          </Section>

          <Section name={sectionNames.layout}>
            {children.prefixIcon.propertyView({ label: trans("button.prefixIcon") })}
            {children.suffixIcon.propertyView({ label: trans("button.suffixIcon") })}
            {hiddenPropertyView(children)}
          </Section>

          <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
        </>
      );
    })
    .setExposeMethodConfigs(buttonRefMethods)
    .build();
})();

export const LinkComp = withExposingConfigs(LinkTmpComp, [
  new NameConfig("text", trans("link.textDesc")),
  new NameConfig("loading", trans("link.loadingDesc")),
  ...CommonNameConfig,
]);
