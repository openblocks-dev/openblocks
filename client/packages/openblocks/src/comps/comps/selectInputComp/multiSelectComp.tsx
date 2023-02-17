import { StringControl } from "@openblocks-ee/index.sdk";
import { styleControl } from "comps/controls/styleControl";
import { MultiSelectStyle } from "comps/controls/styleControlConstants";
import { trans } from "i18n";
import styled from "styled-components";
import { arrayStringExposingStateControl } from "../../controls/codeStateControl";
import { UICompBuilder, withDefault } from "../../generators";
import {
  CommonNameConfig,
  NameConfig,
  withExposingConfigs,
} from "../../generators/withExposing";
import {
  SelectChildrenMap,
  SelectPropertyView,
  SelectUIView,
} from "./selectCompConstants";
import {
  SelectInputInvalidConfig,
  useSelectInputValidate,
} from "./selectInputConstants";

const MarginContainer = styled.div<{}>`
  display: flex;
  justify-content: space-between;
  .hUXIwu {
    flex: 0 0 36px;
  }
  .fgbLEe {
    margin-right: 5px;
    margin-bottom: 10px;
  }
`;

const PaddingContainer = styled.div<{}>`
  display: flex;
  justify-content: space-between;
  .hUXIwu {
    flex: 0 0 36px;
  }
  .fgbLEe {
    margin-right: 5px;
    margin-bottom: 10px;
  }
`;

export const MultiSelectBasicComp = (function () {
  const childrenMap = {
    ...SelectChildrenMap,
    value: arrayStringExposingStateControl("value", ["1", "2"]),
    style: styleControl(MultiSelectStyle),
    marginLeft: withDefault(StringControl, ""),
    marginRight: withDefault(StringControl, ""),
    marginTop: withDefault(StringControl, ""),
    marginBottom: withDefault(StringControl, ""),
    paddingLeft: withDefault(StringControl, ""),
    paddingRight: withDefault(StringControl, ""),
    paddingTop: withDefault(StringControl, ""),
    paddingBottom: withDefault(StringControl, ""),
  };
  return new UICompBuilder(childrenMap, (props, dispatch) => {
    const valueSet = new Set<any>(props.options.map((o) => o.value)); // Filter illegal default values entered by the user
    const [validateState, handleValidate] = useSelectInputValidate(props);
    return props.label({
      required: props.required,
      style: props.style,
      children: (
        <SelectUIView
          {...props}
          mode={"multiple"}
          value={props.value.value.filter?.((v) => valueSet.has(v))}
          onChange={(value) => {
            handleValidate(value);
            props.value.onChange(value);
            props.onEvent("change");
          }}
          dispatch={dispatch}
        />
      ),
      ...validateState,
    });
  })
    .setPropertyViewFn((children) => <SelectPropertyView {...children} />)
    .build();
})();

export const MultiSelectComp = withExposingConfigs(MultiSelectBasicComp, [
  new NameConfig("value", trans("selectInput.valueDesc")),
  new NameConfig("inputValue", trans("select.inputValueDesc")),
  SelectInputInvalidConfig,
  ...CommonNameConfig,
]);
