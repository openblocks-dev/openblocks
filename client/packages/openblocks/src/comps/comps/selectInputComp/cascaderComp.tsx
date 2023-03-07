import { Cascader } from "antd";
import { CascaderStyleType } from "comps/controls/styleControlConstants";
import { blurMethod, focusMethod } from "comps/utils/methodUtils";
import { trans } from "i18n";
import styled from "styled-components";
import { UICompBuilder, withDefault } from "../../generators";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import { CascaderChildren, CascaderPropertyView, defaultDataSource } from "./cascaderContants";
import { getStyle } from "./selectCompConstants";
import { refMethods } from "comps/generators/withMethodExposing";

const CascaderStyle = styled(Cascader)<{ $style: CascaderStyleType }>`
  width: 100%;
  ${(props) => props.$style && getStyle(props.$style)}
`;

let CascaderBasicComp = (function () {
  const childrenMap = CascaderChildren;

  return new UICompBuilder(childrenMap, (props) => {
    return props.label({
      style: props.style,
      children: (
        <CascaderStyle
          ref={props.viewRef}
          value={props.value.value}
          disabled={props.disabled}
          defaultValue={props.value.value}
          options={props.options}
          allowClear={props.allowClear}
          placeholder={props.placeholder}
          showSearch={props.showSearch}
          $style={props.style}
          onFocus={() => props.onEvent("focus")}
          onBlur={() => props.onEvent("blur")}
          onChange={(value: (string | number)[]) => {
            props.value.onChange(value as string[]);
            props.onEvent("change");
          }}
        />
      ),
    });
  })
    .setPropertyViewFn((children) => (
      <>
        <CascaderPropertyView {...children} />
      </>
    ))
    .setExposeMethodConfigs(refMethods([focusMethod, blurMethod]))
    .build();
})();

const CascaderComp = withExposingConfigs(CascaderBasicComp, [
  new NameConfig("value", trans("selectInput.valueDesc")),
  ...CommonNameConfig,
]);

export const CascaderWithDefault = withDefault(CascaderComp, {
  options: defaultDataSource,
});
