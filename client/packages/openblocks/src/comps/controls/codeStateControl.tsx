import {
  ArrayStringControl,
  BoolCodeControl,
  CodeControlJSONType,
  jsonControl,
  jsonObjectControl,
  jsonValueControl,
  NumberControl,
  StringControl,
} from "comps/controls/codeControl";
import { ControlParams } from "comps/controls/controlParams";
import { MultiCompBuilder, stateComp, stateInstance, withDefault } from "comps/generators";
import { changeDataType } from "comps/generators/changeDataType";
import {
  ExposeMethodCompConstructor,
  withMethodExposingBase,
} from "comps/generators/withMethodExposing";
import { trans } from "i18n";
import _ from "lodash";
import {
  AbstractComp,
  AbstractNode,
  CompAction,
  CompActionTypes,
  ConstructorToView,
  evalNodeOrMinor,
  updateNodesV2Action,
} from "openblocks-core";
import { memo } from "util/cacheUtils";
import {
  toBoolean,
  toJSONObject,
  toJSONValue,
  toNumber,
  toString,
  toStringArray,
  toStringNumberArray,
} from "util/convertUtils";
import { JSONObject, JSONValue } from "util/jsonTypes";
import { getPromiseAfterDispatch } from "../../util/promiseUtils";
import { EvalParamType, ParamConfig, ParamType } from "./actionSelector/executeCompTypes";

export const __TMP_STATE_FIELD_NAME = "__TMP_STATE_FIELD_NAME";

interface IChangeMethods<V extends JSONValue = JSONValue> {
  change(value: V): void;
  reset(): void;
}

/**
 * In order to implement default value logic.
 * for example, in input components such as Input and Switch, the value of which can be edited by the user, but the default value can also be specified in the property panel.
 * When the default value is changed, the user-input value is replaced with the new default value.
 * A change in the default value may just be a reference change, in which case it also needs to be replaced.
 *
 * The input is the default value Comp, and the output is the new Comp, whose value supports user editing, but has replacement logic.
 *
 * @warn
 * This code requires an evaluator to ensure that the node's reference changes if and only if it is modified or the dependent node has a reference change.
 *
 * FIXME: T can only be CodeControl, and type constraints will be added later
 *
 * !!! Do not export this method, stay simple
 */
function withTmpState<T extends CodeControlJSONType>(
  control: T,
  initialValue: ConstructorToView<T>
) {
  const childrenMap = {
    value: stateComp<ConstructorToView<T>>(initialValue),
    defaultValue: control,
  };
  const MultiComp = new MultiCompBuilder(childrenMap, (props) => {
    // here's just type declaration, implementation goes to the getView() function below
    return {
      value: initialValue,
      onChange: (value: ConstructorToView<T>) => {},
    };
  })
    .setPropertyViewFn(() => <></>)
    .build();

  class TmpStateComp extends MultiComp implements IChangeMethods<ConstructorToView<T>> {
    override getView() {
      return {
        value: this.children.value.getView(),
        reset: () => this.reset(),
        onChange: (value: ConstructorToView<T>) => this.change(value),
      };
    }

    change(value: ConstructorToView<T>) {
      return getPromiseAfterDispatch(this.dispatch, this.changeChildAction("value", value), {
        autoHandleAfterReduce: true,
      });
    }

    reset() {
      this.change(this.children.defaultValue.getView() as ConstructorToView<T>);
    }

    override reduce(action: CompAction): this {
      if (action.type === CompActionTypes.UPDATE_NODES_V2) {
        const value = action.value;
        const evaledMultiValue = value[__TMP_STATE_FIELD_NAME];
        // log.log("TmpStateTmp reduce. value: ", value, " evaledMultiValue: ", evaledMultiValue);
        if (evaledMultiValue !== this.children.value.getView()) {
          return this.setChildren({
            value: stateInstance(evaledMultiValue),
            defaultValue: this.children.defaultValue.reduce(
              updateNodesV2Action(value["defaultValue"])
            ),
          });
        }
      }
      return super.reduce(action);
    }

    @memo
    exposingNode() {
      const defaultValueNode = this.children.defaultValue.exposingNode() as AbstractNode<
        ConstructorToView<T>
      >;
      return evalNodeOrMinor(defaultValueNode, this.children.value.node());
    }

    override extraNode() {
      return {
        node: {
          [__TMP_STATE_FIELD_NAME]: this.exposingNode(),
        },
        updateNodeFields: () => ({}),
      };
    }

    propertyView(params: ControlParams) {
      return this.children.defaultValue.propertyView(params);
    }
  }

  // only save defaultValue
  return changeDataType(
    TmpStateComp,
    (x) => x.defaultValue ?? "",
    (value) => {
      // compatible parse; if of old data, return directly
      if (typeof value !== "string") {
        return value;
      }
      return {
        defaultValue: value,
        value: initialValue,
      };
    }
  );
}

function convertValue(value: EvalParamType, type: ParamType) {
  switch (type) {
    case "string":
      return toString(value);
    case "number":
      return toNumber(value);
    case "boolean":
      return toBoolean(value);
    case "arrayString":
      return toStringArray(value);
    case "arrayNumberString":
      return toStringNumberArray(value);
    case "JSON":
      return toJSONObject(value);
    case "JSONValue":
      return toJSONValue(value);
  }
}

function getTypeDefaultValue(type: ParamType) {
  switch (type) {
    case "string":
    case "JSONValue":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "arrayString":
    case "arrayNumberString":
      return [];
    case "JSON":
      return {};
  }
}

// expose set***, clear***, reset*** methods
function stateControlMethodExposing<T extends ExposeMethodCompConstructor<AbstractComp>>(
  VariantComp: T,
  param: ParamConfig,
  transformer?: (value: unknown) => JSONValue
) {
  return withMethodExposingBase(VariantComp, [
    {
      method: {
        name: "set" + _.upperFirst(param.name),
        description: trans("exportMethod.setDesc", { property: param.name }),
        params: [param],
      },
      execute: (comp, values) => {
        return (comp as IChangeMethods).change(
          transformer ? transformer(values[0]) : convertValue(values[0], param.type)
        );
      },
    },
    {
      method: {
        name: "clear" + _.upperFirst(param.name),
        description: trans("exportMethod.clearDesc", { property: param.name }),
        params: [],
      },
      execute: (comp) =>
        (comp as IChangeMethods).change(
          transformer ? transformer("") : getTypeDefaultValue(param.type)
        ),
    },
    {
      method: {
        name: "reset" + _.upperFirst(param.name),
        description: trans("exportMethod.resetDesc", { property: param.name }),
        params: [],
      },
      execute: (comp) => (comp as IChangeMethods).reset(),
    },
  ]) as T;
}

export const stringStateControl = (defaultValue?: string) =>
  withTmpState(withDefault(StringControl, defaultValue ?? ""), "");

export const numberStateControl = (defaultValue?: number) =>
  withTmpState(
    defaultValue === undefined ? NumberControl : withDefault(NumberControl, "" + defaultValue),
    0
  );

export const arrayStringStateControl = (defaultValue?: string[]) =>
  withTmpState(
    defaultValue === undefined
      ? ArrayStringControl
      : withDefault(ArrayStringControl, JSON.stringify(defaultValue)),
    []
  );

export const jsonObjectStateControl = (defaultValue?: JSONObject) =>
  withTmpState(jsonObjectControl(defaultValue), {});

export const jsonValueStateControl = (defaultValue?: JSONValue) =>
  withTmpState(jsonValueControl(defaultValue), "");

export function jsonStateControl<T extends JSONValue>(
  transformer: (value: unknown) => T,
  defaultValue?: T,
  expectedType?: string
) {
  return withTmpState(jsonControl(transformer, defaultValue, expectedType), transformer(""));
}

export const StringStateControl = stringStateControl("");
export const BooleanStateControl = withTmpState(BoolCodeControl, false);
export const NumberStateControl = withTmpState(NumberControl, 0);

// stringStateControl with exposing will expose methods
export const stringExposingStateControl = (paramName: string, defaultValue?: string) =>
  stateControlMethodExposing(stringStateControl(defaultValue), {
    name: paramName,
    type: "string",
  });

export const booleanExposingStateControl = (paramName: string) =>
  stateControlMethodExposing(BooleanStateControl, {
    name: paramName,
    type: "boolean",
  });

export const numberExposingStateControl = (paramName: string, defaultValue?: number) =>
  stateControlMethodExposing(numberStateControl(defaultValue), {
    name: paramName,
    type: "number",
  });

export const arrayStringExposingStateControl = (paramName: string, defaultValue?: string[]) =>
  stateControlMethodExposing(arrayStringStateControl(defaultValue), {
    name: paramName,
    type: "arrayString",
  });

export const jsonObjectExposingStateControl = (paramName: string, defaultValue?: JSONObject) =>
  stateControlMethodExposing(jsonObjectStateControl(defaultValue), {
    name: paramName,
    type: "JSON",
  });

export const jsonValueExposingStateControl = (paramName: string, defaultValue?: JSONValue) =>
  stateControlMethodExposing(jsonValueStateControl(defaultValue), {
    name: paramName,
    type: "JSONValue",
  });

export function jsonExposingStateControl<T extends JSONValue>(
  paramName: string,
  transformer: (value: unknown) => T,
  defaultValue?: T,
  expectedType?: string
) {
  return stateControlMethodExposing(
    jsonStateControl(transformer, defaultValue, expectedType),
    { name: paramName, type: "JSONValue" },
    transformer
  );
}
