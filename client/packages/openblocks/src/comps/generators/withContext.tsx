import {
  CompAction,
  CompActionTypes,
  customAction,
  isMyCustomAction,
  Node,
  NodeToValue,
  updateActionContextAction,
  updateNodesV2Action,
  wrapContext,
  WrapContextFn,
} from "openblocks-core";
import { ConstructorToNodeType, ConstructorToView, MultiCompConstructor } from "openblocks-core";
import React from "react";
import { lastValueIfEqual, setFieldsNoTypeCheck, shallowEqual } from "util/objectUtils";
import _ from "lodash";

type NodeFnType<T> = ConstructorToNodeType<T> extends undefined
  ? undefined
  : Node<WrapContextFn<NodeToValue<ConstructorToNodeType<T>>>>;
export const CompExposingContext = React.createContext<Record<string, unknown> | undefined>(
  undefined
);

/**
 * Convert a Comp<T> to Comp<Func<T>>, the required context is passed in from the function parameter.
 * implemented as proxy mode.
 *
 * @param VariantComp must use getPropertyView(), otherwise the exposing context not works.
 *
 * FIXME: error handling
 */
export function withContext<ParamNames extends readonly string[], T extends MultiCompConstructor>(
  VariantComp: T,
  paramNames: ParamNames
) {
  type ContextDataType = Record<ParamNames[number], unknown>;
  type ChangeContextDataAction = {
    type: "setContextData";
    data: ContextDataType;
  };

  // @ts-ignore
  class TMP_CLASS extends VariantComp {
    private readonly valueV2?: any;
    private readonly contextData?: ContextDataType;
    private prevContextVal?: string;

    getSuperView(): ConstructorToView<T> {
      // cast, because we know the parent is of type T
      return super.getView() as unknown as ConstructorToView<T>;
    }

    getView() {
      // The most violent implementation, it doesn't seem to be slow with a cache?
      return (input: ContextDataType) => {
        const superNode = super.node() as unknown as ConstructorToNodeType<T>;
        if (superNode === undefined) {
          // child node has no node
          return this.getSuperView();
        }
        // react context
        return this.updateChildContextData(input)
          .reduce(updateActionContextAction(input))
          .getSuperView();
        // context
      };
    }

    override getPropertyView() {
      return (
        <CompExposingContext.Provider value={this.contextData}>
          {super.getPropertyView()}
        </CompExposingContext.Provider>
      );
    }

    static changeContextDataAction(contextData: ContextDataType) {
      return customAction(
        {
          type: "setContextData",
          data: contextData,
        },
        false
      );
    }

    private getContextValue(input: ContextDataType) {
      return this.valueV2(input);
    }

    /**
     * Update the value of the child node
     */
    private updateChildContextData(input: ContextDataType): this {
      return super.reduce(updateNodesV2Action(this.getContextValue(input)));
    }

    /**
     * Update the value of the child node to display the result prompt
     */
    private refreshChildContextData(): this {
      if (this.contextData && this.valueV2) {
        const newValue = this.getContextValue(this.contextData);
        if (!_.isEqual(this.prevContextVal, newValue)) {
          this.prevContextVal = newValue;
          return this.updateChildContextData(this.contextData);
        }
      }
      return this;
    }

    override reduce(action: CompAction): this {
      if (isMyCustomAction<ChangeContextDataAction>(action, "setContextData")) {
        // Set context data for code prompts
        const data = action.value.data;
        if (this.contextData && shallowEqual(this.contextData, data)) {
          return this;
        }
        return setFieldsNoTypeCheck(this, { contextData: data }).refreshChildContextData();
      }
      if (action.type === CompActionTypes.UPDATE_NODES_V2) {
        if (this.valueV2 !== action.value) {
          return setFieldsNoTypeCheck(this, { valueV2: action.value }).refreshChildContextData();
        }
      }
      const newComp = super.reduce(action);
      return newComp;
    }

    override node() {
      // node will not change if children do not change
      return lastValueIfEqual(
        this,
        "with_context",
        [this.children, this.nodeWithContext()],
        (a, b) => {
          return a[0] === b[0];
        }
      )[1];
    }

    nodeWithContext() {
      // extra node, but the original node needs to be able to access the variable and eval the result
      const superNode = super.nodeWithoutCache() as unknown as ConstructorToNodeType<T>;
      if (superNode === undefined) {
        return undefined as NodeFnType<T>;
      }
      return wrapContext(superNode) as NodeFnType<T>;
    }
  }

  return TMP_CLASS;
}
