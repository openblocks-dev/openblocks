import _ from "lodash";
import {
  CompAction,
  CompParams,
  customAction,
  fromValue,
  isMyCustomAction,
  MultiCompConstructor,
  Node,
  WrapContextNodeV2,
} from "openblocks-core";
import { memo } from "util/cacheUtils";
import { lastValueIfEqual, setFieldsNoTypeCheck, shallowEqual } from "util/objectUtils";

export function withParams<
  ParamNames extends readonly string[],
  TCtor extends MultiCompConstructor
>(VariantCompCtor: TCtor, paramNames: ParamNames) {
  type ParamDataType = Record<ParamNames[number], unknown>;
  const paramValues = _.mapValues(
    _.keyBy(paramNames, (x) => x),
    () => ""
  ) as ParamDataType;
  return withParamsWithDefault(VariantCompCtor, paramValues);
}

/**
 * build a new Comp that contains parameters as nodes based on the input Comp
 */
export function withParamsWithDefault<
  ParamValues extends Record<string, unknown>,
  TCtor extends MultiCompConstructor
>(VariantCompCtor: TCtor, defaultParamValues: ParamValues) {
  type ChangeParamDataAction = {
    type: "setParamData";
    data: ParamValues;
  };

  // @ts-ignore
  class WithParamComp extends VariantCompCtor {
    private readonly params: ParamValues;

    constructor(params: CompParams) {
      super(params);
      this.params = defaultParamValues;
    }

    /**
     * this action requires eval to be valid, don't use it directly with reduce
     */
    static changeParamDataAction(paramData: ParamValues) {
      return customAction({
        type: "setParamData",
        data: paramData,
      });
    }

    override reduce(action: CompAction): this {
      if (isMyCustomAction<ChangeParamDataAction>(action, "setParamData")) {
        const data = action.value.data;
        return this.setParamData(data);
      }
      return super.reduce(action);
    }

    @memo
    override node() {
      return this.nodeWithParams();
    }

    nodeWithParams() {
      const superNode: Node<unknown> = super.node();
      if (_.isNil(superNode)) return undefined;
      const paramNodes = this.getParamNodes();
      const wrapNode = new WrapContextNodeV2(superNode, paramNodes);
      return wrapNode;
    }

    private getParamNodes(): Record<keyof ParamValues, Node<unknown>> {
      return _.mapValues(this.params, (param, name) => {
        const genNodeFn = fromValue(param);
        const paramNode = lastValueIfEqual(
          this,
          "param_node_" + name,
          [genNodeFn, param] as const,
          (a, b) => _.isEqual(a[1], b[1])
        )[0];
        return paramNode;
      });
    }

    private setParamData(paramData: ParamValues) {
      if (this.params && shallowEqual(this.params, paramData)) {
        return this;
      }
      return setFieldsNoTypeCheck(this, { params: paramData });
    }
  }

  return WithParamComp;
}
