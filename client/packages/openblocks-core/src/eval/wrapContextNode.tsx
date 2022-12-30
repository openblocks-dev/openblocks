import { memoized } from "util/memoize";
import { EvalMethods } from "./types/evalTypes";
import { Node, AbstractNode } from "./node";
import { fromValueWithCache, SimpleNode } from "./simpleNode";

export type WrapContextFn<T> = (params: Record<string, unknown>) => T;

class WrapContextNode<T> extends AbstractNode<WrapContextFn<T>> {
  readonly type = "wrapContext";
  constructor(readonly child: Node<T>) {
    super();
  }
  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    return this.child.filterNodes(exposingNodes);
  }
  override justEval(
    exposingNodes: Record<string, Node<unknown>>,
    methods?: EvalMethods
  ): WrapContextFn<T> {
    const paramNodes: Record<string, SimpleNode<unknown>> = {};
    return (params: Record<string, unknown>) => {
      Object.entries(params).forEach(([paramName, value]) => {
        // node remains unchanged if value doesn't change, to keep the cache valid
        const paramNode = paramNodes[paramName];
        if (!paramNode || value !== paramNode.value) {
          paramNodes[paramName] = fromValueWithCache(value); // requires cache
        }
      });
      return this.child.evaluate({ ...exposingNodes, ...paramNodes }, methods);
    };
  }
  override getChildren(): Node<unknown>[] {
    return [this.child];
  }
  override dependValues(): Record<string, unknown> {
    return this.child.dependValues();
  }
  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    return this.child.fetchInfo(exposingNodes);
  }
}

export function wrapContext<T>(node: Node<T>): Node<WrapContextFn<T>> {
  return new WrapContextNode(node);
}
