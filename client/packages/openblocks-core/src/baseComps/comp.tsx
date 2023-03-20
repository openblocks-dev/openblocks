import { changeValueAction, ChangeValueAction, CompAction, CompActionTypes } from "actions";
import { Node } from "eval";
import { ReactNode } from "react";
import { memo } from "util/cacheUtils";
import { JSONValue } from "util/jsonTypes";
import { setFieldsNoTypeCheck } from "util/objectUtils";

export type OptionalNodeType = Node<unknown> | undefined;
export type DispatchType = (action: CompAction) => void;

/**
 */
export interface Comp<
  ViewReturn = any,
  DataType extends JSONValue = JSONValue,
  NodeType extends OptionalNodeType = OptionalNodeType
> {
  dispatch: DispatchType;

  getView(): ViewReturn;

  getPropertyView(): ReactNode;

  reduce(action: CompAction): this;

  node(): NodeType;

  toJsonValue(): DataType;

  /**
   * change current comp's dispatch function.
   * used when the comp is moved across the tree structure.
   */
  changeDispatch(dispatch: DispatchType): this;

  changeValueAction(value: DataType): ChangeValueAction;
}

export abstract class AbstractComp<
  ViewReturn = any,
  DataType extends JSONValue = JSONValue,
  NodeType extends OptionalNodeType = OptionalNodeType
> implements Comp<ViewReturn, DataType, NodeType>
{
  dispatch: DispatchType;

  constructor(params: CompParams) {
    this.dispatch = params.dispatch ?? ((_action: CompAction) => {});
  }

  abstract getView(): ViewReturn;

  abstract getPropertyView(): ReactNode;

  abstract toJsonValue(): DataType;

  abstract reduce(_action: CompAction): this;

  abstract nodeWithoutCache(): NodeType;

  changeDispatch(dispatch: DispatchType): this {
    return setFieldsNoTypeCheck(this, { dispatch: dispatch }, { keepCacheKeys: ["node"] });
  }

  /**
   * trigger changeValueAction, type safe
   */
  dispatchChangeValueAction(value: DataType) {
    this.dispatch(this.changeValueAction(value));
  }

  changeValueAction(value: DataType): ChangeValueAction {
    return changeValueAction(value, true);
  }

  /**
   * don't override the function, override nodeWithout function instead
   * FIXME: node reference mustn't be changed if this object is changed
   */
  @memo
  node(): NodeType {
    return this.nodeWithoutCache();
  }
}

export type OptionalComp<T = any> = Comp<T> | undefined;

export type CompConstructor<
  ViewReturn = any,
  DataType extends JSONValue = any,
  NodeType extends OptionalNodeType = OptionalNodeType
> = new (params: CompParams<DataType>) => Comp<ViewReturn, DataType, NodeType>;

/**
 * extract constructor's generic type
 */
export type ConstructorToView<T> = T extends CompConstructor<infer ViewReturn> ? ViewReturn : never;
export type ConstructorToComp<T> = T extends new (params: CompParams<any>) => infer X ? X : never;
export type ConstructorToDataType<T> = T extends new (params: CompParams<infer DataType>) => any
  ? DataType
  : never;
export type ConstructorToNodeType<T> = ConstructorToComp<T> extends Comp<any, any, infer NodeType>
  ? NodeType
  : never;

export type RecordConstructorToComp<T> = {
  [K in keyof T]: ConstructorToComp<T[K]>;
};
export type RecordConstructorToView<T> = {
  [K in keyof T]: ConstructorToView<T[K]>;
};

export interface CompParams<DataType extends JSONValue = JSONValue> {
  dispatch?: (action: CompAction) => void;
  value?: DataType;
}
