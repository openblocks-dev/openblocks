import { Rate } from "antd";
import styled, { css } from "styled-components";
import { Section, sectionNames } from "openblocks-design";
import { NumberControl } from "../controls/codeControl";
import { BoolControl } from "../controls/boolControl";
import { changeEvent, eventHandlerControl } from "../controls/eventHandlerControl";
import { LabelControl } from "../controls/labelControl";
import { numberExposingStateControl } from "../controls/codeStateControl";
import { UICompBuilder, withDefault } from "../generators";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../generators/withExposing";
import { formDataChildren, FormDataPropertyView } from "./formComp/formDataConstants";
import { styleControl } from "comps/controls/styleControl";
import { RatingStyle, RatingStyleType } from "comps/controls/styleControlConstants";
import { migrateOldData } from "comps/generators/simpleGenerators";
import { disabledPropertyView, hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";

const EventOptions = [changeEvent] as const;

/**
 * Compatible with old data 2022-08-23
 */
function fixOldData(oldData: any) {
  if (oldData && oldData.hasOwnProperty("unChecked")) {
    return {
      label: oldData.label,
      checked: oldData.checked,
      unchecked: oldData.unChecked,
    };
  }
  return oldData;
}

const RatingBasicComp = (function () {
  const childrenMap = {
    value: numberExposingStateControl("value"),
    max: withDefault(NumberControl, "5"),
    label: LabelControl,
    allowHalf: BoolControl,
    disabled: BoolControl,
    onEvent: eventHandlerControl(EventOptions),
    style: migrateOldData(styleControl(RatingStyle), fixOldData),
    ...formDataChildren,
  };
  return new UICompBuilder(childrenMap, (props) => {
    return props.label({
      style: props.style,
      children: (
        <RateStyled
          count={props.max}
          value={props.value.value}
          onChange={(e) => {
            props.value.onChange(e);
            props.onEvent("change");
          }}
          allowHalf={props.allowHalf}
          disabled={props.disabled}
          $style={props.style}
        />
      ),
    });
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.value.propertyView({ label: trans("prop.defaultValue") })}
            {children.max.propertyView({
              label: trans("rating.max"),
            })}
            {children.allowHalf.propertyView({
              label: trans("rating.allowHalf"),
            })}
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
    .build();
})();

export const RatingComp = withExposingConfigs(RatingBasicComp, [
  new NameConfig("value", trans("export.ratingValueDesc")),
  new NameConfig("max", trans("export.ratingMaxDesc")),
  ...CommonNameConfig,
]);

const getStyle = (style: RatingStyleType) => {
  return css`
    .ant-rate {
      color: ${style.checked};
    }

    .ant-rate-star-half .ant-rate-star-first,
    .ant-rate-star-full .ant-rate-star-second {
      color: ${style.checked};
    }

    .ant-rate-star-first,
    .ant-rate-star-second {
      color: ${style.unchecked};
    }
  `;
};

export const RateStyled = styled(Rate)<{ $style: RatingStyleType }>`
  ${(props) => props.$style && getStyle(props.$style)}
`;
