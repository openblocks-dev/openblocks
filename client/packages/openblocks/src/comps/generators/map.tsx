import _ from "lodash";
import {
  CompAction,
  CompConstructor,
  CompParams,
  ConstructorToComp,
  ConstructorToDataType,
  ConstructorToNodeType,
  customAction,
  fromRecord,
  isMyCustomAction,
  MultiBaseComp,
  Node,
  NodeToValue,
  wrapDispatch,
} from "openblocks-core";
import { ReactNode } from "react";
import { memo } from "util/cacheUtils";

export type BatchSetAction<DataType> = {
  type: "batchSet";
  value: Record<string, DataType>;
};

export type BatchSetCompAction<Comp> = {
  type: "batchSetComp";
  value: Record<string, Comp>;
};

export type ClearAction = {
  type: "clear";
};

export type BatchDeleteAction = {
  type: "batchDelete";
  keys: Array<string>;
};

export type FilterAction = {
  type: "filter";
  keys: Array<string>;
};

export type ForEachAction = {
  type: "forEach";
  action: CompAction;
};

export function map<ChildCompCtor extends CompConstructor<any, any>>(
  childConstructor: ChildCompCtor,
  inDSL: boolean
) {
  type Comp = ConstructorToComp<ChildCompCtor>;
  type DataType = ConstructorToDataType<ChildCompCtor>;
  type MapDataType = Record<string, DataType>;
  type NodeValue = NodeToValue<ConstructorToNodeType<ChildCompCtor>>;

  function newChild(
    dispatch: (action: CompAction) => void,
    childName: string,
    childValue: DataType
  ) {
    return new childConstructor({
      dispatch: wrapDispatch(dispatch, childName),
      value: childValue,
    }) as Comp;
  }

  class MapClass extends MultiBaseComp<
    Record<string, Comp>,
    MapDataType,
    Node<Record<string, NodeValue>>
  > {
    parseChildrenFromValue(params: CompParams<MapDataType>): Record<string, Comp> {
      const value = params.value;
      return _.mapValues(value, (data, key) => newChild(this.dispatch, key, data));
    }
    getView(): Record<string, Comp> {
      return this.children;
    }
    getPropertyView(): ReactNode {
      throw new Error("Method not implemented.");
    }
    override reduce(action: CompAction): this {
      if (isMyCustomAction<BatchSetAction<DataType>>(action, "batchSet")) {
        const { value } = action.value;
        const newComps = _.mapValues(value, (data, key) => newChild(this.dispatch, key, data));
        return this.setChildren({ ...this.children, ...newComps });
      } else if (isMyCustomAction<BatchSetCompAction<Comp>>(action, "batchSetComp")) {
        const { value } = action.value;
        const newComps = _.mapValues(value, (comp, key) =>
          comp.changeDispatch(wrapDispatch(this.dispatch, key))
        );
        return this.setChildren({ ...this.children, ...newComps });
      } else if (isMyCustomAction<ClearAction>(action, "clear")) {
        return this.setChildren({});
      } else if (isMyCustomAction<BatchDeleteAction>(action, "batchDelete")) {
        const { keys } = action.value;
        return this.setChildren(_.omit(this.children, keys));
      } else if (isMyCustomAction<FilterAction>(action, "filter")) {
        const { keys } = action.value;
        return this.setChildren(_.pick(this.children, keys));
      } else if (isMyCustomAction<ForEachAction>(action, "forEach")) {
        const newChildren = _.mapValues(this.children, (comp) => comp.reduce(action.value.action));
        return this.setChildren(newChildren);
      }
      return super.reduce(action);
    }
    @memo
    exposingNode() {
      const childrenExposingNodes = _.mapValues(this.children, (comp) =>
        (comp as any).exposingNode()
      );
      return fromRecord(childrenExposingNodes);
    }
    static batchSetAction(value: Record<string, DataType>) {
      return customAction<BatchSetAction<DataType>>(
        {
          type: "batchSet",
          value,
        },
        inDSL
      );
    }
    static batchSetCompAction(value: Record<string, Comp>) {
      return customAction<BatchSetCompAction<Comp>>(
        {
          type: "batchSetComp",
          value,
        },
        inDSL
      );
    }
    static clearAction() {
      return customAction<ClearAction>({ type: "clear" }, inDSL);
    }
    static batchDeleteAction(keys: Array<string>) {
      return customAction<BatchDeleteAction>({ type: "batchDelete", keys }, inDSL);
    }
    static filterAction(keys: Array<string>) {
      return customAction<FilterAction>({ type: "filter", keys }, inDSL);
    }
    static forEachAction(action: CompAction) {
      return customAction<ForEachAction>({ type: "forEach", action }, action.editDSL!);
    }
  }

  return MapClass;
}
