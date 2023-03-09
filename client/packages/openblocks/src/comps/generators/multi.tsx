import { JSONObject } from "util/jsonTypes";
import { NodeToValue, RecordNode } from "openblocks-core";
import _ from "lodash";
import React, { ReactNode } from "react";
import { CompAction } from "openblocks-core";
import { Comp, CompParams, MultiBaseComp, wrapDispatch } from "openblocks-core";

type ViewFnType<ViewReturn, ChildrenType> = (
  childrenType: ChildrenType,
  dispatch: (action: CompAction) => void
) => ViewReturn;

export type ToViewReturn<T> = {
  [K in keyof T]: T[K] extends Comp<infer X> ? X : unknown;
};
export type ToConstructor<T> = {
  [K in keyof T]: T[K] extends Comp<unknown, infer X> ? new (params: CompParams<X>) => T[K] : never;
};
export type ToInstanceType<T> = {
  [K in keyof T]: T[K] extends abstract new (...args: any) => any ? InstanceType<T[K]> : never;
};
export type ToDataType<T> = {
  [K in keyof T]?: T[K] extends Comp<unknown, infer X> ? X : never;
};

type CompToNodeType<T> = T extends Comp<unknown, any, infer X> ? X : never;

type NonOptionalKeys<T> = {
  [K in keyof T]-?: undefined extends CompToNodeType<T[K]> ? never : K;
}[keyof T];
type ToNodeTypeInner<T> = {
  [K in NonOptionalKeys<T>]: CompToNodeType<T[K]>;
};

export type ToNodeType<T extends Record<string, Comp<unknown>>> = NonOptionalKeys<T> extends never
  ? undefined
  : RecordNode<T extends Record<string, Comp<unknown>> ? ToNodeTypeInner<T> : never>;

type ToNodeValueTypeInner<T> = {
  [K in NonOptionalKeys<T>]: NodeToValue<CompToNodeType<T[K]>>;
};
export type ToChildrenNodeValueType<T extends Record<string, Comp<unknown>>> =
  NonOptionalKeys<T> extends never
    ? undefined
    : T extends Record<string, Comp<unknown>>
    ? ToNodeValueTypeInner<T>
    : never;

// Not very readable, but does not affect the running logic
export type ViewFnTypeForComp<ViewReturn, ChildrenCompMap> = ViewFnType<
  ViewReturn,
  ToViewReturn<ChildrenCompMap>
>;
export type PropertyViewFnTypeForComp<ChildrenCompMap> = (
  children: ChildrenCompMap,
  dispatch: (action: CompAction) => void
) => ReactNode;

export function parseChildrenFromValueAndChildrenMap<
  ChildrenCompMap extends Record<string, Comp<unknown>>
>(
  params: CompParams<ToDataType<ChildrenCompMap>>,
  childrenMap: ToConstructor<ChildrenCompMap>
): ChildrenCompMap {
  const dispatch = params.dispatch ?? ((_action: CompAction) => {});
  const value = params.value;
  const genFn = (
    VariantComp: new (params: CompParams) => Comp<unknown>,
    childName: string
  ): Comp<unknown> => {
    let newParams: CompParams = {
      dispatch: wrapDispatch(dispatch, childName),
    };
    if ((value as JSONObject)?.hasOwnProperty(childName)) {
      newParams.value = (value as JSONObject)?.[childName];
    }
    return new VariantComp(newParams);
  };
  return _.mapValues(childrenMap, genFn) as ChildrenCompMap;
}

/**
 * Building comp this way can use typescript's type inference capabilities.
 * Using ChildrenCompMap as a generic is to retain the information of each class, such as not wanting StringControl to degenerate into Comp<string>
 */
export class MultiCompBuilder<ViewReturn, ChildrenCompMap extends Record<string, Comp<unknown>>> {
  private childrenMap: ToConstructor<ChildrenCompMap>;
  private viewFn: ViewFnTypeForComp<ViewReturn, ChildrenCompMap>;
  private propertyViewFn?: PropertyViewFnTypeForComp<ChildrenCompMap>;

  /**
   * If viewFn is not placed in the constructor, the type of ViewReturn cannot be inferred
   */
  constructor(
    childrenMap: ToConstructor<ChildrenCompMap>,
    viewFn: ViewFnTypeForComp<ViewReturn, ChildrenCompMap>
  ) {
    this.childrenMap = childrenMap;
    this.viewFn = viewFn;
  }

  setPropertyViewFn(propertyViewFn: PropertyViewFnTypeForComp<ChildrenCompMap>) {
    this.propertyViewFn = propertyViewFn;
    return this;
  }

  build() {
    const builder = this;

    class MultiTempComp extends MultiBaseComp<
      ChildrenCompMap,
      ToDataType<ChildrenCompMap>,
      ToNodeType<ChildrenCompMap>
    > {
      override parseChildrenFromValue(
        params: CompParams<ToDataType<ChildrenCompMap>>
      ): ChildrenCompMap {
        return parseChildrenFromValueAndChildrenMap(params, builder.childrenMap);
      }

      protected override ignoreChildDefaultValue() {
        return true;
      }

      override getView(): ViewReturn {
        return builder.viewFn(
          childrenToProps(this.children) as ToViewReturn<ChildrenCompMap>,
          this.dispatch
        );
      }

      override getPropertyView(): ReactNode {
        return <PropertyView comp={this} propertyViewFn={builder.propertyViewFn} />;
      }
    }

    return MultiTempComp;
  }
}

/**
 * Guaranteed to be in a react component, so that react hooks can be used internally
 */
export function PropertyView(props: { comp: any; propertyViewFn: any }) {
  const comp = props.comp;
  if (!props.propertyViewFn) {
    return null;
  }
  return props.propertyViewFn(comp.children, comp.dispatch);
}

export function childrenToProps<ChildrenCompMap extends Record<string, Comp<unknown>>>(
  children: ChildrenCompMap
) {
  return _.mapValues(children, (comp) => comp.getView());
}

export function simpleMultiComp<ChildrenCompMap extends Record<string, Comp<unknown>>>(
  childrenMap: ToConstructor<ChildrenCompMap>
) {
  return new MultiCompBuilder(childrenMap, () => null as ReactNode)
    .setPropertyViewFn(() => <></>)
    .build();
}
