import { styleControl } from "comps/controls/styleControl";
import { SelectStyle } from "comps/controls/styleControlConstants";
import { trans } from "i18n";
import { stringExposingStateControl } from "../../controls/codeStateControl";
import { UICompBuilder } from "../../generators";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import { SelectChildrenMap, SelectPropertyView, SelectUIView } from "./selectCompConstants";
import { SelectInputInvalidConfig, selectInputValidate } from "./selectInputConstants";

export const SelectBasicComp = (function () {
  const childrenMap = {
    ...SelectChildrenMap,
    value: stringExposingStateControl("value"),
    style: styleControl(SelectStyle),
  };
  return new UICompBuilder(childrenMap, (props, dispatch) => {
    const valueSet = new Set<any>(props.options.map((o) => o.value)); // Filter illegal default values entered by the user
    return props.label({
      required: props.required,
      style: props.style,
      children: (
        <SelectUIView
          {...props}
          value={valueSet.has(props.value.value) ? props.value.value : undefined}
          onChange={(value) => {
            props.value.onChange(value ?? "");
            props.onEvent("change");
          }}
          dispatch={dispatch}
        />
      ),
      ...selectInputValidate(props),
    });
  })
    .setPropertyViewFn((children) => <SelectPropertyView {...children} />)
    .build();
})();

export const SelectComp = withExposingConfigs(SelectBasicComp, [
  new NameConfig("value", trans("selectInput.valueDesc")),
  new NameConfig("inputValue", trans("select.inputValueDesc")),
  SelectInputInvalidConfig,
  ...CommonNameConfig,
]);
