import { Switch } from "antd";
import { BoolCodeControl } from "comps/controls/codeControl";
import { booleanExposingStateControl } from "comps/controls/codeStateControl";
import { changeEvent, eventHandlerControl } from "comps/controls/eventHandlerControl";
import { LabelControl } from "comps/controls/labelControl";
import { styleControl } from "comps/controls/styleControl";
import { SwitchStyle, SwitchStyleType } from "comps/controls/styleControlConstants";
import { migrateOldData } from "comps/generators/simpleGenerators";
import { Section, sectionNames } from "openblocks-design";
import styled, { css } from "styled-components";
import { UICompBuilder } from "../generators";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../generators/withExposing";
import { formDataChildren, FormDataPropertyView } from "./formComp/formDataConstants";
import { hiddenPropertyView, disabledPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { RefControl } from "comps/controls/refControl";
import { refMethods } from "comps/generators/withMethodExposing";
import { blurMethod, clickMethod, focusWithOptions } from "comps/utils/methodUtils";

const EventOptions = [
  changeEvent,
  {
    label: trans("switchComp.open"),
    value: "true",
    description: trans("switchComp.openDesc"),
  },
  {
    label: trans("switchComp.close"),
    value: "false",
    description: trans("switchComp.closeDesc"),
  },
] as const;

const getStyle = (style: SwitchStyleType) => {
  return css`
    .ant-switch-handle::before {
      background-color: ${style.handle};
    }
    button {
      background-image: none;
      background-color: ${style.unchecked};
      &.ant-switch-checked {
        background-color: ${style.checked};
      }
    }
  `;
};

const SwitchWrapper = styled.div<{ disabled: boolean; $style: SwitchStyleType }>`
  min-height: 32px;
  display: flex;
  align-items: center;
  // Can respond to drag & select events when disabled
  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
    >button:disabled {
      pointer-events: none;
    }
  `};
  ${(props) => props.$style && getStyle(props.$style)}
`;

/**
 * compatible with old data 2022-08-23
 */
function fixOldData(oldData: any) {
  if (oldData && oldData.hasOwnProperty("unChecked")) {
    return {
      label: oldData.label,
      handle: oldData.handle,
      unchecked: oldData.unChecked,
      checked: oldData.checked,
    };
  }
  return oldData;
}

/**
 * Switch Comp
 */
let SwitchTmpComp = (function () {
  const childrenMap = {
    value: booleanExposingStateControl("value"),
    label: LabelControl,
    onEvent: eventHandlerControl(EventOptions),
    disabled: BoolCodeControl,
    style: migrateOldData(styleControl(SwitchStyle), fixOldData),
    viewRef: RefControl<HTMLElement>,

    ...formDataChildren,
  };
  return new UICompBuilder(childrenMap, (props) => {
    return props.label({
      style: props.style,
      children: (
        <SwitchWrapper disabled={props.disabled} $style={props.style}>
          <Switch
            checked={props.value.value}
            disabled={props.disabled}
            ref={props.viewRef}
            onChange={(checked) => {
              props.value.onChange(checked);
              props.onEvent("change");
              props.onEvent(checked ? "true" : "false");
            }}
          />
        </SwitchWrapper>
      ),
    });
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.value.propertyView({ label: trans("prop.defaultValue") })}
          </Section>
          <FormDataPropertyView {...children} />
          {children.label.getPropertyView()}

          <Section name={sectionNames.interaction}>
            {children.onEvent.getPropertyView()}
            {disabledPropertyView(children)}
          </Section>

          <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

          <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
        </>
      );
    })
    .setExposeMethodConfigs(refMethods([focusWithOptions, blurMethod, clickMethod]))
    .build();
})();

export const SwitchComp = withExposingConfigs(SwitchTmpComp, [
  new NameConfig("value", trans("switchComp.valueDesc")),
  ...CommonNameConfig,
]);
