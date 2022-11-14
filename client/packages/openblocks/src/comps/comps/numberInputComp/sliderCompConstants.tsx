import { BoolCodeControl, NumberControl } from "../../controls/codeControl";
import { LabelControl } from "../../controls/labelControl";
import { withDefault } from "../../generators";
import { ChangeEventHandlerControl } from "../../controls/eventHandlerControl";
import { Section, sectionNames } from "openblocks-design";
import { RecordConstructorToComp } from "openblocks-core";
import { styleControl } from "comps/controls/styleControl";
import { SliderStyle, SliderStyleType } from "comps/controls/styleControlConstants";
import styled, { css } from "styled-components";
import { Slider } from "antd";
import { darkenColor, fadeColor } from "openblocks-design";
import { disabledPropertyView, hiddenPropertyView } from "comps/utils/propertyUtils";

const getStyle = (style: SliderStyleType) => {
  return css`
    &.ant-slider:not(.ant-slider-disabled) {
      &,
      &:hover,
      &:focus {
        .ant-slider-rail {
          background-color: ${style.track};
        }
        .ant-slider-track {
          background-color: ${style.fill};
        }
        .ant-slider-handle {
          background-color: ${style.thumb};
          border-color: ${style.thumbBoder};
        }
      }
      &:hover {
        .ant-slider-rail {
          background-color: ${darkenColor(style.track, 0.1)};
        }
      }
      .ant-slider-handle:focus {
        box-shadow: 0 0 0 5px ${fadeColor(darkenColor(style.thumbBoder, 0.08), 0.12)};
      }
    }
  `;
};

export const SliderStyled = styled(Slider)<{ $style: SliderStyleType }>`
  ${(props) => props.$style && getStyle(props.$style)}
`;

export const SliderChildren = {
  max: withDefault(NumberControl, "100"),
  min: withDefault(NumberControl, "0"),
  step: withDefault(NumberControl, "1"),
  label: LabelControl,
  disabled: BoolCodeControl,
  onEvent: ChangeEventHandlerControl,
  style: styleControl(SliderStyle),
};

export const SliderPropertyView = (
  children: RecordConstructorToComp<typeof SliderChildren & { hidden: typeof BoolCodeControl }>
) => (
  <>
    {children.label.getPropertyView()}

    <Section name={sectionNames.interaction}>
      {children.onEvent.getPropertyView()}
      {disabledPropertyView(children)}
    </Section>

    <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

    <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
  </>
);
