import { Button } from "antd";
import { ButtonCompWrapper } from "comps/comps/buttonComp/buttonCompConstants";
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

const Link = styled(Button)<{ $style: LinkStyleType }>`
  ${(props) => `color: ${props.$style.text}`}
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
  };
  return new UICompBuilder(childrenMap, (props) => {
    return (
      <ButtonCompWrapper disabled={props.disabled}>
        <Link
          $style={props.style}
          loading={props.loading}
          disabled={props.disabled}
          onClick={() => props.onEvent("click")}
          type={"link"}
        >
          {/* Avoid button disappearing */}
          {!props.text || props.text?.length === 0 ? " " : props.text}
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

          <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

          <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
        </>
      );
    })
    .build();
})();

export const LinkComp = withExposingConfigs(LinkTmpComp, [
  new NameConfig("text", trans("link.textDesc")),
  new NameConfig("loading", trans("link.loadingDesc")),
  ...CommonNameConfig,
]);
