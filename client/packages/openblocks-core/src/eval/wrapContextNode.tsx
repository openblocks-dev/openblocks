import { memoized } from "util/memoize";
import { EvalMethods } from "./types/evalTypes";
import { Node, AbstractNode, ValueFn } from "./node";
import { fromValue, fromValueWithCache, SimpleNode } from "./simpleNode";

export class WrapContextNode<T> extends AbstractNode<ValueFn<T>> {
  readonly type = "wrapContext";
  readonly paramNames: string[];
  constructor(readonly child: Node<T>, paramName: string) {
    super();
    this.paramNames = paramName.split(",");
  }
  override wrapContext(paramName: string): AbstractNode<ValueFn<ValueFn<T>>> {
    return new WrapContextNode(this, paramName);
  }
  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>): Map<Node<unknown>, string[]> {
    return this.child.filterNodes(exposingNodes);
  }
  override justEval(
    exposingNodes: Record<string, Node<unknown>>,
    methods?: EvalMethods
  ): ValueFn<T> {
    const paramNodes: Record<string, SimpleNode<unknown>> = {};
    return (...paramValues: any[]) => {
      this.paramNames.forEach((paramName, i) => {
        // node remains unchanged if value doesn't change, to keep the cache valid
        const paramNode = paramNodes[paramName];
        const value = paramValues[i];
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
