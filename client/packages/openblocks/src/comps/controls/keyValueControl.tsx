import { ControlPropertyViewWrapper, KeyValueList, OptionsType } from "openblocks-design";
import { ReactNode } from "react";
import styled from "styled-components";
import { MultiCompBuilder } from "../generators";
import { list } from "../generators/list";
import { StringControl } from "./codeControl";
import { ControlParams } from "./controlParams";
import { dropdownControl } from "./dropdownControl";
import { ParamsControlType, ParamsStringControl } from "./paramsControl";
import { FunctionProperty } from "../queries/queryCompUtils";

const KeyValueWrapper = styled.div`
  display: flex;
  width: 424px;
  flex-grow: 1;

  .cm-editor {
    margin-top: 0;
  }
`;

const KeyWrapper = styled.div<{ flexBasics?: number }>`
  display: flex;
  margin-right: 8px;
  flex: 1;
  flex-basis: ${(props) => (props.flexBasics ? props.flexBasics + "px" : "0%")};

  & > div:first-child {
    flex-grow: 1;
    display: block;
  }
`;

const TypeWrapper = styled.div`
  margin-left: 8px;
  width: 25%;
  flex-shrink: 0;
`;

const ValueWrapper = styled.div<{ flexBasics?: number }>`
  flex: 1;
  flex-basis: ${(props) => (props.flexBasics ? props.flexBasics + "px" : "0%")};
`;

export type KeyValueControlParams = ControlParams & {
  showType?: boolean;
  typeTooltip?: ReactNode;
  keyFlexBasics?: number;
  valueFlexBasics?: number;
};

/**
 * Provide two input boxes for kv
 * controlType: params output: {key: {"1+2": () => "3"}, value: {"-1": () => "-1"}}
 * controlType: string output: {key: "xxx", value: "xxxx"}
 */
function keyValueControl<T extends OptionsType>(
  hasType: boolean = false,
  types: T,
  controlType: "params" | "string" = "params"
) {
  const childrenMap = {
    key: controlType === "params" ? ParamsStringControl : StringControl,
    value: controlType === "params" ? ParamsStringControl : StringControl,
    type: dropdownControl(types, types[0]?.value),
  };
  return class extends new MultiCompBuilder(childrenMap, (props) => {
    return hasType
      ? {
          key: props.key,
          value: props.value,
          type: props.type,
        }
      : {
          key: props.key,
          value: props.value,
        };
  })
    .setPropertyViewFn(() => <></>)
    .build() {
    propertyView(params: KeyValueControlParams) {
      return (
        <KeyValueWrapper>
          <KeyWrapper flexBasics={params.keyFlexBasics}>
            {this.children.key.propertyView({ placeholder: "key", indentWithTab: false })}
            {hasType && params.showType && (
              <TypeWrapper>
                {this.children.type.propertyView({
                  placeholder: "key",
                  indentWithTab: false,
                  tooltip: params.typeTooltip,
                })}
              </TypeWrapper>
            )}
          </KeyWrapper>
          <ValueWrapper flexBasics={params.valueFlexBasics}>
            {this.children.value.propertyView({
              placeholder: "value",
              indentWithTab: false,
            })}
          </ValueWrapper>
        </KeyValueWrapper>
      );
    }
  };
}

/**
 * Provides a list of kv input boxes with add and delete buttons
 * output [{key: "", value: ""}, {key: "", value: ""}]
 */
export function keyValueListControl<T extends OptionsType>(
  hasType: boolean = false,
  types: T | OptionsType = [],
  controlType: "params" | "string" = "params"
) {
  return class extends list(keyValueControl(hasType, types, controlType)) {
    getQueryParams() {
      if (controlType === "params") {
        return this.getView().reduce(
          (result: FunctionProperty[], kv) => [
            ...result,
            ...(kv.children.key as InstanceType<ParamsControlType>).getQueryParams(),
            ...(kv.children.value as InstanceType<ParamsControlType>).getQueryParams(),
          ],
          []
        );
      }
      return [];
    }

    propertyView(params: KeyValueControlParams): ReactNode {
      return (
        <ControlPropertyViewWrapper {...params}>
          <KeyValueList
            list={this.getView().map((child) => child.propertyView(params))}
            onAdd={() => this.dispatch(this.pushAction({}))}
            onDelete={(item, index) => this.dispatch(this.deleteAction(index))}
          />
        </ControlPropertyViewWrapper>
      );
    }
  };
}
