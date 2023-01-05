import { memoized } from "util/memoize";
import { EvalMethods } from "./types/evalTypes";
import { Node, AbstractNode } from "./node";
import { fromValueWithCache } from "./simpleNode";

export type WrapContextFn<T> = (params?: Record<string, unknown>) => T;

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
    return (params?: Record<string, unknown>) => {
      let nodes: Record<string, Node<unknown>>;
      if (params) {
        nodes = { ...exposingNodes };
        Object.entries(params).forEach(([key, value]) => {
          nodes[key] = fromValueWithCache(value);
        });
      } else {
        nodes = exposingNodes;
      }
      return this.child.evaluate(nodes, methods);
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
