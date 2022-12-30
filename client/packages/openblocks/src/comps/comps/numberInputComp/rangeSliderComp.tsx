import { trans } from "i18n";
import { Section, sectionNames } from "openblocks-design";
import { numberExposingStateControl } from "../../controls/codeStateControl";
import { UICompBuilder } from "../../generators";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import { SliderChildren, SliderPropertyView, SliderStyled, SliderWrapper } from "./sliderCompConstants";
import { hasIcon } from "comps/utils";

const RangeSliderBasicComp = (function () {
  const childrenMap = {
    ...SliderChildren,
    start: numberExposingStateControl("start", 10),
    end: numberExposingStateControl("end", 60),
  };
  return new UICompBuilder(childrenMap, (props) => {
    return props.label({
      style: props.style,
      children: (
        <SliderWrapper
          onMouseDown={(e: any) => {
            e.stopPropagation();
            return false;
          }}
        >
          {hasIcon(props.prefixIcon) && props.prefixIcon}
          <SliderStyled
            {...props}
            range={true}
            value={[props.start.value, props.end.value]}
            $style={props.style}
            onChange={([start, end]) => {
              props.start.onChange(start);
              props.end.onChange(end);
              props.onEvent("change");
            }}
          />
          {hasIcon(props.suffixIcon) && props.suffixIcon}
        </SliderWrapper>
      ),
    });
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.start.propertyView({ label: trans("rangeSlider.start") })}
            {children.end.propertyView({ label: trans("rangeSlider.end") })}
            {children.max.propertyView({ label: trans("prop.maximum") })}
            {children.min.propertyView({ label: trans("prop.minimum") })}
            {children.step.propertyView({
              label: trans("rangeSlider.step"),
              tooltip: trans("rangeSlider.stepTooltip"),
            })}
          </Section>

          <SliderPropertyView {...children} />
        </>
      );
    })
    .build();
})();

export const RangeSliderComp = withExposingConfigs(RangeSliderBasicComp, [
  new NameConfig("start", trans("export.sliderStartDesc")),
  new NameConfig("end", trans("export.sliderEndDesc")),
  new NameConfig("max", trans("export.sliderMaxValueDesc")),
  new NameConfig("min", trans("export.sliderMinValueDesc")),
  ...CommonNameConfig,
]);
