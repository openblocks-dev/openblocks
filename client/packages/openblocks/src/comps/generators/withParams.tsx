import { getReduceContext, reduceInContext } from "comps/utils/reduceContext";
import _ from "lodash";
import {
  Comp,
  CompAction,
  CompParams,
  ConstructorToComp,
  ConstructorToNodeType,
  ConstructorToView,
  customAction,
  fromValue,
  isMyCustomAction,
  MultiBaseComp,
  MultiCompConstructor,
  Node,
  NodeToValue,
  RecordNode,
  updateActionContextAction,
  updateNodesV2Action,
  wrapChildAction,
  wrapContext,
  WrapContextFn,
  WrapContextNodeV2,
  wrapDispatch,
} from "openblocks-core";
import { ReactNode } from "react";
import { JSONValue } from "util/jsonTypes";
import { depthEqual, lastValueIfEqual, setFieldsNoTypeCheck } from "util/objectUtils";
import { CompExposingContext } from "./withContext";

type ParamValues = Record<string, unknown>;

export const paramsEqual = (
  params1: Record<string, unknown> | undefined,
  params2: Record<string, unknown> | undefined
) => {
  return depthEqual(params1, params2, 3);
};

export function withParams<TCtor extends MultiCompConstructor>(
  VariantCompCtor: TCtor,
  paramNames: string[]
) {
  const paramValues = _.mapValues(
    _.keyBy(paramNames, (x) => x),
    () => ""
  );
  return withParamsWithDefault(VariantCompCtor, paramValues);
}

/**
 * build a new Comp that contains parameters as nodes based on the input Comp
 */
export function withParamsWithDefault<TCtor extends MultiCompConstructor>(
  VariantCompCtor: TCtor,
  defaultParamValues: ParamValues
) {
  type SetPartialParamDataAction = {
    type: "setPartialParamData";
    data: Partial<ParamValues>;
  };

  type SetParamDataAction = {
    type: "setParamData";
    data: ParamValues;
  };

  type SetCompAction = {
    type: "setComp";
    comp: ConstructorToComp<TCtor>;
  };

  type ViewReturn = ConstructorToView<TCtor>;
  type ChildrenType = {
    comp: ConstructorToComp<TCtor>;
  };
  type CompNode = NonNullable<ConstructorToNodeType<TCtor>>;
  type CompNodeValue = NodeToValue<CompNode>;
  type NodeType = RecordNode<{
    wrap: Node<WrapContextFn<CompNodeValue>>;
    comp: WrapContextNodeV2<CompNodeValue>;
  }>;

  class WithParamComp
    extends MultiBaseComp<ChildrenType, JSONValue, NodeType>
    implements Comp<ViewReturn>
  {
    private readonly wrapFn?: WrapContextFn<CompNodeValue>;
    private readonly params: ParamValues;

    /**
     * this action requires eval to be valid, don't use it directly with reduce
     */
    static setPartialParamDataAction(paramData: Partial<ParamValues>) {
      return customAction(
        {
          type: "setPartialParamData",
          data: paramData,
        },
        false
      );
    }

    static setParamDataAction(paramData: ParamValues) {
      return customAction(
        {
          type: "setParamData",
          data: paramData,
        },
        false
      );
    }

    static setCompAction(comp: ConstructorToComp<TCtor>) {
      return customAction(
        {
          type: "setComp",
          comp,
        },
        true
      );
    }

    constructor(params: CompParams) {
      super(params);
      this.params = defaultParamValues;
    }

    override parseChildrenFromValue(params: CompParams): ChildrenType {
      const dispatch = params.dispatch ?? _.noop;
      const newParams = { ...params, dispatch: wrapDispatch(dispatch, "comp") };

      const comp = new VariantCompCtor(newParams) as unknown as ConstructorToComp<TCtor>;
      return { comp: comp };
    }

    override toJsonValue(): JSONValue {
      return this.getComp().toJsonValue();
    }

    getComp() {
      return this.children.comp;
    }

    override getView() {
      return this.getComp().getView();
    }

    override getPropertyView(): ReactNode {
      return (
        <CompExposingContext.Provider value={this.params}>
          {this.getComp().getPropertyView()}
        </CompExposingContext.Provider>
      );
    }

    override reduce(action: CompAction): this {
      if (isMyCustomAction<SetPartialParamDataAction>(action, "setPartialParamData")) {
        const data = action.value.data;
        return this.setPartialParams(data);
      }
      if (isMyCustomAction<SetParamDataAction>(action, "setParamData")) {
        const data = action.value.data;
        return this.setParams(data);
      }
      if (isMyCustomAction<SetCompAction>(action, "setComp")) {
        const child = action.value.comp.changeDispatch(this.getComp().dispatch);
        if (action.value.comp.node() !== child.node()) {
          console.error("withParams setComp node diff. action: ", action);
        }
        return this.setChild("comp", child);
      }

      const withParamsContext = getReduceContext().withParamsContext;
      let comp = reduceInContext(
        {
          withParamsContext: {
            params: {
              ...withParamsContext.params,
              ...this.getParams(),
            },
          },
        },
        () => super.reduce(action)
      );
      return comp;
    }

    setPartialParams(params: Partial<ParamValues>): this {
      const newParams = { ...this.params, ...params };
      return this.setParams(newParams);
    }

    setParams(params: ParamValues): this {
      if (this.params && paramsEqual(this.params, params)) {
        return this;
      }
      let comp = setFieldsNoTypeCheck(this, { params });
      const wrapValue = this.getWrapValue(params);
      if (wrapValue) {
        comp = comp
          .reduce(wrapChildAction("comp", updateNodesV2Action(wrapValue)))
          .reduce(updateActionContextAction(params));
      }
      return comp;
    }

    getParams() {
      return this.params;
    }

    protected override childrenNode() {
      const compNode: ConstructorToNodeType<TCtor> = this.getComp().node();
      if (_.isNil(compNode)) return {} as {};
      const paramNodes = this.getParamNodes();
      const originalNode = new WrapContextNodeV2(compNode, paramNodes);
      return { comp: originalNode };
    }

    protected override extraNode() {
      const compNode: ConstructorToNodeType<TCtor> = this.getComp().node();
      if (_.isNil(compNode)) return undefined;
      const wrapNode = wrapContext(compNode);
      const result = {
        node: { wrap: wrapNode },
        updateNodeFields: (value: any) => {
          return { wrapFn: value.wrap };
        },
      };
      return lastValueIfEqual(
        this,
        "extra_node",
        [result, compNode] as const,
        (a, b) => a[1] === b[1]
      )[0];
    }

    getParamNodes(): Record<keyof ParamValues, Node<unknown>> {
      return _.mapValues(this.params, (param, name) => {
        const paramNode = lastValueIfEqual(
          this,
          "param_node_" + name,
          [fromValue(param), param] as const,
          (a, b) => _.isEqual(a[1], b[1])
        )[0];
        return paramNode;
      });
    }

    private getWrapValue(params: ParamValues) {
      return this.wrapFn?.(params);
    }
  }

  return WithParamComp;
}
