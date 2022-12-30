import _ from "lodash";
import {
  Comp,
  CompAction,
  CompActionTypes,
  CompParams,
  ConstructorToComp,
  ConstructorToNodeType,
  ConstructorToView,
  customAction,
  fromRecord,
  fromValue,
  isMyCustomAction,
  MultiBaseComp,
  MultiCompConstructor,
  Node,
  NodeToValue,
  updateNodesV2Action,
  ValueFn,
  WrapContextNodeV2,
  wrapDispatch,
} from "openblocks-core";
import { ReactNode } from "react";
import { JSONValue } from "util/jsonTypes";
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

  type SetCompAction = {
    type: "setComp";
    comp: ConstructorToComp<TCtor>;
  };

  type ViewReturn = ConstructorToView<TCtor>;
  type ChildrenType = {
    comp: ConstructorToComp<TCtor>;
  };
  type CompNodeValue = NodeToValue<ConstructorToNodeType<TCtor>>;
  type NodeType = Node<{ wrap: ValueFn<CompNodeValue>; original: CompNodeValue }> | undefined;

  class WithParamComp
    extends MultiBaseComp<ChildrenType, JSONValue, NodeType>
    implements Comp<ViewReturn>
  {
    private readonly wrapValue?: ValueFn<CompNodeValue>;
    private readonly params: ParamValues;

    /**
     * this action requires eval to be valid, don't use it directly with reduce
     */
    static changeParamDataAction(paramData: ParamValues) {
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
      return this.getComp().getPropertyView();
    }

    override reduce(action: CompAction): this {
      if (isMyCustomAction<ChangeParamDataAction>(action, "setParamData")) {
        const data = action.value.data;
        return this.setParams(data);
      }
      if (isMyCustomAction<SetCompAction>(action, "setComp")) {
        const child = action.value.comp.changeDispatch(this.getComp().dispatch);
        return this.setChild("comp", child);
      }
      if (action.type === CompActionTypes.UPDATE_NODES_V2) {
        let child = this.getComp().reduce(updateNodesV2Action(action.value.original));
        let comp = this.setChild("comp", child);
        const wrap = action.value.wrap;
        if (wrap && this.wrapValue !== wrap) {
          comp = setFieldsNoTypeCheck(comp, { wrapValue: wrap });
        }
        // console.info("WithParamsReduce. action: ", action, " original: ", action.value.original, " oldComp: ", this, " newComp: ", comp);
        return comp;
      }
      return super.reduce(action);
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

    override nodeWithoutCache() {
      const compNode: ConstructorToNodeType<TCtor> = this.getComp().node();
      if (_.isNil(compNode)) return undefined;
      const paramName = Object.keys(defaultParamValues).join(",");
      const wrapNode = compNode.wrapContext(paramName);

      const paramNodes = this.getParamNodes();
      const originalNode = new WrapContextNodeV2(compNode, paramNodes);
      return fromRecord({ wrap: wrapNode, original: originalNode }) as NonNullable<NodeType>;
    }

    private getParamNodes(): Record<keyof ParamValues, Node<unknown>> {
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
      const paramValue = Object.keys(defaultParamValues).map((key) => params[key]);
      return this.wrapValue?.(...paramValue);
    }
  }

  return WithParamComp;
}
