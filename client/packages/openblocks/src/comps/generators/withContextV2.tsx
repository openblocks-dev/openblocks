import _ from "lodash";
import {
  CompAction,
  CompActionTypes,
  ConstructorToComp,
  ConstructorToNodeType,
  customAction,
  fromRecord,
  isMyCustomAction,
  MultiCompConstructor,
  Node,
  NodeToValue,
  updateNodesV2Action,
  WrapContextFn,
  withFunction,
  wrapContext,
} from "openblocks-core";
import React from "react";
import { lastValueIfEqual, setFieldsNoTypeCheck, shallowEqual } from "util/objectUtils";

export const CompExposingContext = React.createContext<Record<string, unknown> | undefined>(
  undefined
);

/**
 * set params as Context in VariantComp
 */
export function withContextV2<ParamNames extends readonly string[], T extends MultiCompConstructor>(
  VariantComp: T,
  paramNames: ParamNames
) {
  type ContextDataType = Record<ParamNames[number], unknown>;
  type NodeValue = NodeToValue<ConstructorToNodeType<T>>;
  // type NodeType = Node<(key: string, input: ContextDataType) => NodeValue> | undefined;

  type ChangeContextDataAction = {
    type: "setContextData";
    data: ContextDataType;
  };

  type SetCompAction = {
    type: "setComp";
    comp: ConstructorToComp<typeof WithContextV2Comp>;
  };

  // @ts-ignore
  class WithContextV2Comp extends VariantComp {
    private readonly nodeValue?: WrapContextFn<NodeValue>;
    private readonly contextData?: ContextDataType;

    static changeContextDataAction(contextData: ContextDataType) {
      return customAction({
        type: "setContextData",
        data: contextData,
      });
    }

    static setCompAction(comp: ConstructorToComp<typeof WithContextV2Comp>) {
      return customAction({
        type: "setComp",
        comp,
      });
    }

    override getPropertyView() {
      return (
        <CompExposingContext.Provider value={this.contextData}>
          {super.getPropertyView()}
        </CompExposingContext.Provider>
      );
    }

    override reduce(action: CompAction): this {
      if (isMyCustomAction<ChangeContextDataAction>(action, "setContextData")) {
        const data = action.value.data;
        return this.setContextData(data);
      }
      if (isMyCustomAction<SetCompAction>(action, "setComp")) {
        const comp = (action.value.comp as unknown as this).changeDispatch(this.dispatch);
        return this.contextData ? comp.setContextData(this.contextData) : comp;
      }
      if (action.type === CompActionTypes.UPDATE_NODES_V2) {
        // log.debug("withContextV2 reduce UPDATE_NODE_V2. action: ", action.value, " nodeValue: ", this.nodeValue, " equal: ", this.nodeValue === action.value);
        const wrap = action.value?.wrap;
        if (wrap && this.nodeValue !== wrap) {
          return setFieldsNoTypeCheck(this, { nodeValue: wrap }).refreshChildContextData();
        }
        return this;
      }
      return super.reduce(action);
    }

    override node() {
      // node will not change if children do not change
      const nd = lastValueIfEqual(
        this,
        "with_context",
        [this.nodeWithContext(), this.children, this.contextData] as const,
        (a, b) => {
          return a[1] === b[1] && a[2] === b[2];
        }
      )[0];
      return nd;
    }

    getContextData() {
      return this.contextData;
    }

    private nodeWithContext() {
      const childNode: Node<unknown> = super.node();
      if (_.isNil(childNode)) return undefined;
      const wrapNode = wrapContext(childNode);
      const originalNode = withFunction(wrapNode, (wrapFn) => wrapFn(this.contextData ?? {}));
      return fromRecord({ wrap: wrapNode, original: originalNode });
    }

    private setContextData(contextData: ContextDataType) {
      if (this.contextData && shallowEqual(this.contextData, contextData)) {
        return this;
      }
      return setFieldsNoTypeCheck(this, { contextData }).refreshChildContextData();
    }

    private refreshChildContextData(): this {
      if (this.contextData && this.nodeValue) {
        const newComp = super.reduce(
          updateNodesV2Action(this.getChildValueWithContext(this.contextData))
        );
        return newComp;
      }
      return this;
    }

    private getChildValueWithContext(input: ContextDataType): NodeValue | undefined {
      return this.nodeValue?.(input);
    }
  }

  return WithContextV2Comp;
}
