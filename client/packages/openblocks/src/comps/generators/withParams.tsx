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
  updateNodesV2Action,
  wrapContext,
  WrapContextFn,
  WrapContextNodeV2,
  wrapDispatch,
} from "openblocks-core";
import { ReactNode } from "react";
import { JSONValue } from "util/jsonTypes";
import { lastValueIfEqual, setFieldsNoTypeCheck, shallowEqual } from "util/objectUtils";
import { CompExposingContext } from "./withContext";

export function withParams<
  ParamNames extends readonly string[],
  TCtor extends MultiCompConstructor
>(VariantCompCtor: TCtor, paramNames: ParamNames) {
  type ParamValues = Record<ParamNames[number], unknown>;
  const paramValues = _.mapValues(
    _.keyBy(paramNames, (x) => x),
    () => ""
  ) as ParamValues;
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
    private readonly wrapValue?: WrapContextFn<CompNodeValue>;
    private readonly params: ParamValues;

    /**
     * this action requires eval to be valid, don't use it directly with reduce
     */
    static setParamDataAction(paramData: ParamValues) {
      return customAction({
        type: "setParamData",
        data: paramData,
      });
    }

    static setCompAction(comp: ConstructorToComp<TCtor>) {
      return customAction({
        type: "setComp",
        comp,
      });
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
      if (isMyCustomAction<ChangeParamDataAction>(action, "setParamData")) {
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
      const comp = super.reduce(action);
      return comp;
    }

    setParams(params: Partial<ParamValues>): this {
      const newParams = { ...this.params, ...params };
      if (this.params && shallowEqual(this.params, newParams)) {
        return this;
      }
      let comp = this;
      const wrapValue = this.getWrapValue(newParams);
      if (wrapValue) {
        const child = this.getComp().reduce(updateNodesV2Action(wrapValue));
        comp = comp.setChild("comp", child);
      }
      comp = setFieldsNoTypeCheck(comp, { params: newParams });
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
          return { wrapValue: value.wrap };
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
      return this.wrapValue?.(params);
    }
  }

  return WithParamComp;
}
