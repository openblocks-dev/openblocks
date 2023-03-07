import { styleControl } from "comps/controls/styleControl";
import { SelectStyle } from "comps/controls/styleControlConstants";
import { trans } from "i18n";
import { stringExposingStateControl } from "../../controls/codeStateControl";
import { UICompBuilder } from "../../generators";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import {
  baseSelectRefMethods,
  SelectChildrenMap,
  SelectPropertyView,
  SelectUIView,
} from "./selectCompConstants";
import {
  SelectInputCommonConfig,
  SelectInputInvalidConfig,
  useSelectInputValidate,
} from "./selectInputConstants";
import { useRef } from "react";
import { RecordConstructorToView } from "openblocks-core";

const SelectBasicComp = (function () {
  const childrenMap = {
    ...SelectChildrenMap,
    value: stringExposingStateControl("value"),
    style: styleControl(SelectStyle),
  };
  return new UICompBuilder(childrenMap, (props, dispatch) => {
    const [validateState, handleValidate] = useSelectInputValidate(props);

    const propsRef = useRef<RecordConstructorToView<typeof childrenMap>>(props);
    propsRef.current = props;

    const valueSet = new Set<any>(props.options.map((o) => o.value)); // Filter illegal default values entered by the user
    return props.label({
      required: props.required,
      style: props.style,
      children: (
        <SelectUIView
          {...props}
          value={valueSet.has(props.value.value) ? props.value.value : undefined}
          onChange={(value) => {
            props.value.onChange(value ?? "").then(() => {
              propsRef.current.onEvent("change");
              handleValidate(value ?? "");
            });
          }}
          dispatch={dispatch}
        />
      ),
      ...validateState,
    });
  })
    .setPropertyViewFn((children) => <SelectPropertyView {...children} />)
    .setExposeMethodConfigs(baseSelectRefMethods)
    .build();
})();

export const SelectComp = withExposingConfigs(SelectBasicComp, [
  new NameConfig("value", trans("selectInput.valueDesc")),
  new NameConfig("inputValue", trans("select.inputValueDesc")),
  SelectInputInvalidConfig,
  ...SelectInputCommonConfig,
  ...CommonNameConfig,
]);
