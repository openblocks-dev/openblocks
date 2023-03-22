import {
  Comp,
  ConstructorToComp,
  mergeExtra,
  MultiCompConstructor,
  RecordNodeToValue,
} from "openblocks-core";
import { ExposingInfo, MethodInfo } from "comps/utils/exposingTypes";
import { fromRecord, fromValue, Node, withFunction } from "openblocks-core";
import { lastValueIfEqual, shallowEqual } from "util/objectUtils";
import { ExecuteAction, MethodConfig } from "comps/controls/actionSelector/executeCompTypes";
import { ReactNode } from "react";
import { isExposingMethodComp } from "comps/generators/withMethodExposing";
import { CompAction, customAction, isMyCustomAction, ExtraNodeType } from "openblocks-core";
import { getPromiseAfterDispatch } from "util/promiseUtils";
import { trans } from "i18n";
import log from "loglevel";

type CompCtor = MultiCompConstructor;
type Children<TCtor extends CompCtor> = ConstructorToComp<TCtor>["children"];
export type ChildrenToComp<Children> = {
  children: Children;
};
export type ChildrenKeys<T extends Children<CompCtor>> = Extract<keyof T, string>;

const __EXPOSING_FIELD_NAME = "__EXPOSING_FIELD_NAME";

function getFunction(comp: Comp, methodName: string) {
  // return a promise
  return (...params: any[]) =>
    getPromiseAfterDispatch(
      comp.dispatch,
      customAction<ExecuteAction>(
        {
          type: "execute",
          methodName: methodName,
          params: params,
        },
        false
      ),
      {
        notHandledError: trans("globalErrorMessage.notHandledError", { method: methodName }),
      }
    );
}

export interface IExposingComp {
  extraNode(): ExtraNodeType | undefined;
  exposingNode(): Node<any>;
  exposingInfo(): ExposingInfo;
  exposingMethods(): Record<string, MethodInfo>;
  exposingValues: Record<string, any>;
}

/**
 * Add the ability to expose data for multi Comp.
 * Add exposingNode when going up node, and put it in a local variable when going down.
 */
export function withExposingRaw<TCtor extends CompCtor, NodeType extends Node<any>>(
  VariantComp: TCtor,
  propertyDescOrGetter:
    | Record<string, ReactNode>
    | ((target: ConstructorToComp<TCtor>) => Record<string, ReactNode>),
  exposingFn: (target: ConstructorToComp<TCtor>) => NodeType
) {
  // @ts-ignore
  class ExposingComp extends VariantComp {
    readonly exposingValues: Record<string, any> = {};

    private exposingPropertyDesc() {
      if (typeof propertyDescOrGetter === "function") {
        return propertyDescOrGetter(this as ConstructorToComp<TCtor>);
      }
      return propertyDescOrGetter;
    }

    override reduce(action: CompAction): this {
      // execute comp method
      if (isMyCustomAction<ExecuteAction>(action, "execute")) {
        let success = false;
        if (isExposingMethodComp(this)) {
          success = this.executeMethod(action);
        }
        // otherwise the method exposed by children
        if (!success) {
          Object.values(this.children).forEach((i) => {
            const child = i as Comp;
            if (isExposingMethodComp(child)) {
              child.executeMethod(action);
            }
          });
        }
        return this;
      }
      return super.reduce(action);
    }

    exposingInfo(): ExposingInfo {
      return {
        property: this.exposingNode(),
        propertyValue: this.exposingValues,
        propertyDesc: this.exposingPropertyDesc(),
        methods: this.exposingMethods(),
      };
    }

    exposingMethods() {
      const methods: Array<MethodConfig[]> = [];
      if (isExposingMethodComp(this)) {
        methods.push(this.getMethodConfig());
      }
      Object.keys(this.children).forEach((name) => {
        const child = this.children[name];
        if (isExposingMethodComp(child)) {
          methods.push(child.getMethodConfig());
        }
      });

      const ret: Record<string, MethodInfo> = {};
      methods
        .flatMap((t) => t)
        .forEach((method) => {
          ret[method.name] = {
            params: method.params,
            description: method.description || "",
            func: getFunction(this, method.name),
          };
        });
      return ret;
    }

    exposingNode() {
      return exposingFn(this as ConstructorToComp<TCtor>);
    }

    override extraNode() {
      return mergeExtra(super.extraNode(), {
        node: {
          [__EXPOSING_FIELD_NAME]: this.exposingNode(),
        },
        updateNodeFields: (value: any) => {
          return {
            exposingValues: value[__EXPOSING_FIELD_NAME],
          };
        },
      });
    }
  }

  return ExposingComp as unknown as TCtor extends new (...args: infer A) => infer R
    ? new (...args: A) => R & IExposingComp
    : TCtor;
}

type NodeRecord = Record<string, Node<any>>;

/**
 * the content in the cache
 */
interface CacheContent {
  isEquals: (other: this) => boolean;
  toNode: () => Node<any>;
}

class SimpleCacheContent implements CacheContent {
  private node: Node<any>;
  constructor(node: Node<any>) {
    this.node = node;
  }
  isEquals(other: this) {
    return this.node === other.node;
  }
  toNode() {
    return this.node;
  }
}

export interface ExposingConfig<Comp> {
  name: string;
  desc: ReactNode;
  depsFn: (comp: Comp) => CacheContent;
}

/**
 * By default, components with hidden and disabled properties will expose these two properties
 */
export function withExposingConfigs<TCtor extends CompCtor>(
  VariantComp: TCtor,
  configs: ExposingConfig<ConstructorToComp<TCtor>>[]
) {
  const propertyDesc = configs.reduce<Record<string, ReactNode>>((acc, cur) => {
    acc[cur.name] = cur.desc;
    return acc;
  }, {});

  return withExposingRaw(VariantComp, propertyDesc, (target) => {
    const res: NodeRecord = {};

    configs.forEach((config) => {
      const cacheContent = config.depsFn(target);
      res[config.name] = lastValueIfEqual(
        target,
        "withExposing_" + config.name,
        cacheContent,
        (a, b) => {
          return a.isEquals(b);
        }
      ).toNode();
    });
    return lastValueIfEqual(target, "withExposingMain", [res, fromRecord(res)], (a, b) => {
      return shallowEqual(a[0], b[0]);
    })[1] as Node<any>;
  });
}

export class NameConfig<ChildrenType extends Record<string, Comp<unknown>>>
  implements ExposingConfig<ChildrenToComp<ChildrenType>>
{
  name: ChildrenKeys<ChildrenType>;
  desc: ReactNode;

  constructor(name: ChildrenKeys<ChildrenType>, desc?: ReactNode) {
    this.name = name;
    this.desc = desc ?? "";
  }

  depsFn(comp: ChildrenToComp<ChildrenType>): CacheContent {
    const childComp = comp.children[this.name] as any as HasExposingNode;
    try {
      // FIXME: remove this type cast later
      return new SimpleCacheContent(childComp.exposingNode()) as unknown as CacheContent;
    } catch (e) {
      log.error("Comp: ", childComp);
      throw e;
    }
  }
}

export const NameConfigHidden = new NameConfig("hidden", trans("export.hiddenDesc"));
export const NameConfigDisabled = new NameConfig("disabled", trans("export.disabledDesc"));
export const NameConfigPlaceHolder = new NameConfig("placeholder", trans("export.placeholderDesc"));
export const NameConfigRequired = new NameConfig("required", trans("export.requiredDesc"));

export const CommonNameConfig = [NameConfigHidden, NameConfigDisabled];

/**
 * nodeRecord is the dependency, is the cache, node is the exposing value
 * If the dependent nodeRecord changes, return the latest node
 */
class NodeRecordCacheContent implements CacheContent {
  nodeRecord: NodeRecord;
  node: Node<any>;

  constructor(nodeRecord: NodeRecord, node: Node<any>) {
    this.nodeRecord = nodeRecord;
    this.node = node;
  }

  isEquals(other: this) {
    return shallowEqual(this.nodeRecord, other.nodeRecord);
  }

  toNode() {
    return this.node;
  }
}

/**
 * @deprecated
 * refer to depsConfig
 */
export class DepsConfig<ChildrenType extends Record<string, Comp<unknown>>, T extends NodeRecord>
  implements ExposingConfig<ChildrenToComp<ChildrenType>>
{
  name: string;
  desc: ReactNode;
  depNodesFn: (children: ChildrenType) => T;
  func: (input: Record<keyof T, any>) => any;

  /**
   * a complex configuration of exposed data, simple can use NameConfig
   * @param name exposing name
   * @param depNodesFn Return the dependent node, note that a cached version is need (currently the node function has a cache).
   * @param func Calculate the new value by the dependent node
   * @param desc descriptive documentation
   */
  constructor(
    name: string,
    depNodesFn: (children: ChildrenType) => T,
    func: (input: RecordNodeToValue<T>) => any,
    desc?: ReactNode
  ) {
    this.name = name;
    this.desc = desc ?? "";
    this.depNodesFn = depNodesFn;
    this.func = func;
  }

  depsFn(comp: ChildrenToComp<ChildrenType>): CacheContent {
    const recordNode = this.depNodesFn(comp.children);
    // FIXME: remove this type cast later
    return new NodeRecordCacheContent(
      recordNode,
      withFunction(fromRecord(recordNode), this.func)
    ) as unknown as CacheContent;
  }
}

export class CompDepsConfig<Comp extends ConstructorToComp<CompCtor>, T extends NodeRecord>
  implements ExposingConfig<Comp>
{
  name: string;
  desc: ReactNode;
  depNodesFn: (comp: Comp) => T;
  func: (input: Record<keyof T, any>) => any;

  /**
   * a complex configuration of exposed data, simple can use NameConfig
   * @param name exposing name
   * @param depNodesFn Return the dependent node, note that a cached version is need (currently the node function has a cache).
   * @param func Calculate the new value by the dependent node
   * @param desc descriptive documentation
   */
  constructor(
    name: string,
    depNodesFn: (comp: Comp) => T,
    func: (input: RecordNodeToValue<T>) => any,
    desc?: ReactNode
  ) {
    this.name = name;
    this.desc = desc ?? "";
    this.depNodesFn = depNodesFn;
    this.func = func;
  }

  depsFn(comp: Comp): CacheContent {
    const recordNode = this.depNodesFn(comp);
    // FIXME: remove this type cast later
    return new NodeRecordCacheContent(
      recordNode,
      withFunction(fromRecord(recordNode), this.func)
    ) as unknown as CacheContent;
  }
}

/**
 * all keys with value matching ValueType
 */
type KeysWithValueType<T, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? Key : never;
}[Extract<keyof T, string>];

interface HasExposingNode<T = any> {
  exposingNode: () => Node<T>;
}

export type CompToExposingValue<T> = T extends HasExposingNode<infer X> ? X : never;

type GetExposingType<T extends Record<string, any>> = {
  [key in keyof T]: CompToExposingValue<T[key]>;
};

export type ChildrenTypeToDepsKeys<T extends Record<string, Comp<unknown>>> = ReadonlyArray<
  KeysWithValueType<T, HasExposingNode>
>;

/**
 * This method is recommended for type safety
 */
export function depsConfig<
  ChildrenType extends Record<string, Comp<unknown>>,
  DepsKeys extends ChildrenTypeToDepsKeys<ChildrenType>
>(props: {
  name: string;
  desc: ReactNode;
  depKeys: DepsKeys;
  func: (input: GetExposingType<Pick<ChildrenType, DepsKeys[number]>>) => any;
}): ExposingConfig<ChildrenToComp<ChildrenType>> {
  return {
    name: props.name,
    desc: props.desc,
    depsFn: (comp: ChildrenToComp<ChildrenType>) => {
      const recordNode: NodeRecord = {};
      props.depKeys.forEach((key) => {
        recordNode[key] = (comp.children[key] as any as HasExposingNode).exposingNode();
      });
      return new NodeRecordCacheContent(
        recordNode,
        withFunction(fromRecord(recordNode) as any, props.func)
      ) as unknown as CacheContent;
    },
  };
}

export function withSimpleExposing<TCtor extends CompCtor>(
  VariantComp: TCtor,
  valueFn: (comp: ConstructorToComp<TCtor>) => any
) {
  return withExposingRaw(VariantComp, {}, (comp) => {
    const node = fromValue(valueFn(comp));
    return lastValueIfEqual(comp, "withExposingSimple", node, (a, b) => {
      return a.value === b.value;
    });
  });
}
