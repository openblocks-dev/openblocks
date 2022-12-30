import _ from "lodash";
import { EvalMethods } from "./types/evalTypes";
import { evalPerfUtil } from "./utils/perfUtils";
import { WrapNode } from "./wrapNode";

export type NodeToValue<NodeT> = NodeT extends Node<infer ValueType> ? ValueType : never;
export type ValueFn<ValueType> = (params: Record<string, unknown>) => ValueType;
export type NodeToNodeFn<NodeT> = Node<ValueFn<NodeToValue<NodeT>>>;
export type FetchInfo = {
  /**
   * whether any of dependencies' node has executing query
   */
  isFetching: boolean;

  /**
   * whether all dependencies' query have be executed once
   */
  ready: boolean;
};

/**
 * keyof without optional key
 */
type NonOptionalKeys<T> = {
  [k in keyof T]-?: undefined extends T[k] ? never : k;
}[keyof T];

/**
 * T extends {[key: string]: Node<any> | undefined}
 */
export type RecordOptionalNodeToValue<T> = {
  [K in NonOptionalKeys<T>]: NodeToValue<T[K]>;
};

/**
 * the base structure for evaluate
 */
export interface Node<T> {
  readonly type: string;
  /**
   * generate a new node, the result is a function with "params"
   */
  wrapContext(): Node<ValueFn<T>>;
  /**
   * calculate evaluate result
   * @param exposingNodes other dependent Nodes
   */
  evaluate(exposingNodes?: Record<string, Node<unknown>>, methods?: EvalMethods): T;
  /**
   * whether the current or its dependencies have cyclic dependencies
   * this function only can be used after evaluate() has been called
   */
  hasCycle(): boolean;
  /**
   * only available after evaluate
   */
  dependNames(): string[];
  dependValues(): Record<string, unknown>;

  /**
   * filter the real dependencies in the exposingNodes, for boosting the evaluation
   * @warn
   * the results include direct dependencies and dependencies of dependencies.
   * since input node's dependencies don't belong to module in the module feature, the node name may duplicate.
   *
   * FIXME: this should be a protected function.
   */
  filterNodes(exposingNodes: Record<string, Node<unknown>>): Map<Node<unknown>, string[]>;
  fetchInfo(exposingNodes: Record<string, Node<unknown>>): FetchInfo;
}

export abstract class AbstractNode<T> implements Node<T> {
  readonly type: string = "abstract";
  evalCache: EvalCache<T> = {};

  constructor() {}
  abstract wrapContext(): AbstractNode<ValueFn<T>>;

  evaluate(exposingNodes?: Record<string, Node<unknown>>, methods?: EvalMethods): T {
    return evalPerfUtil.perf(this, "eval", () => {
      exposingNodes = exposingNodes ?? {};
      const dependingNodeMap: Map<Node<unknown>, string[]> = this.filterNodes(exposingNodes);
      // use cache when equals to the last dependingNodeMap
      if (dependingNodeMapEquals(this.evalCache.dependingNodeMap, dependingNodeMap)) {
        return this.evalCache.value as T;
      }
      // initialize cyclic field
      this.evalCache.cyclic = false;
      const result = this.justEval(exposingNodes, methods);

      // write cache
      this.evalCache.dependingNodeMap = dependingNodeMap;
      this.evalCache.value = result;
      if (!this.evalCache.cyclic) {
        // check children cyclic
        this.evalCache.cyclic = this.getChildren().some((node) => node.hasCycle());
      }
      return result;
    });
  }

  hasCycle(): boolean {
    return this.evalCache.cyclic ?? false;
  }

  abstract getChildren(): Node<unknown>[];

  dependNames(): string[] {
    return Object.keys(this.dependValues());
  }
  abstract dependValues(): Record<string, unknown>;

  isHitEvalCache(exposingNodes?: Record<string, Node<unknown>>): boolean {
    exposingNodes = exposingNodes ?? {};
    const dependingNodeMap: Map<Node<unknown>, string[]> = this.filterNodes(exposingNodes);
    return dependingNodeMapEquals(this.evalCache.dependingNodeMap, dependingNodeMap);
  }

  abstract filterNodes(exposingNodes: Record<string, Node<unknown>>): Map<Node<unknown>, string[]>;

  /**
   * evaluate without cache
   */
  abstract justEval(exposingNodes: Record<string, Node<unknown>>, methods?: EvalMethods): T;

  abstract fetchInfo(exposingNodes: Record<string, Node<unknown>>): FetchInfo;
}

interface EvalCache<T> {
  dependingNodeMap?: Map<Node<unknown>, string[]>;
  value?: T;

  inEval?: boolean;
  cyclic?: boolean;
  inIsFetching?: boolean;
  inFilterNodes?: boolean;
}

/**
 * transform WrapNode in dependingNodeMap to actual node.
 * since WrapNode is dynamically constructed in eval process, its reference always changes.
 */
function unWrapDependingNodeMap(depMap: Map<Node<unknown>, string[]>) {
  const nextMap = new Map();
  depMap.forEach((p, n) => {
    if (n.type === "wrap") {
      nextMap.set((n as InstanceType<typeof WrapNode>).delegate, p);
    } else {
      nextMap.set(n, p);
    }
  });
  return nextMap;
}

/**
 * check whether 2 dependingNodeMaps are equal
 * - Node use "===" to check
 * - string[] use deep compare to check
 *
 * @param dependingNodeMap1 first dependingNodeMap
 * @param dependingNodeMap2 second dependingNodeMap
 * @returns whether equals
 */
export function dependingNodeMapEquals(
  dependingNodeMap1: Map<Node<unknown>, string[]> | undefined,
  dependingNodeMap2: Map<Node<unknown>, string[]>
): boolean {
  if (!dependingNodeMap1 || dependingNodeMap1.size !== dependingNodeMap2.size) {
    return false;
  }
  const map1 = unWrapDependingNodeMap(dependingNodeMap1);
  const map2 = unWrapDependingNodeMap(dependingNodeMap2);

  let result = true;
  map2.forEach((path1, node) => {
    const path0 = map1.get(node);
    if (!_.isEqual(path0, path1)) {
      result = false;
    }
  });
  return result;
}
