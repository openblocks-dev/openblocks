import { memoized } from "util/memoize";
import { AbstractNode, Node, ValueFn } from "./node";
import { EvalMethods } from "./types/evalTypes";
import { WrapContextNode } from "./wrapContextNode";

/**
 * build a new node by setting new dependent nodes in child node
 */
export class WrapContextNodeV2<T> extends AbstractNode<T> {
  readonly type = "wrapContextV2";
  constructor(readonly child: Node<T>, readonly paramNodes: Record<string, Node<unknown>>) {
    super();
  }
  override wrapContext(): AbstractNode<ValueFn<T>> {
    return new WrapContextNode(this);
  }
  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>): Map<Node<unknown>, string[]> {
    return this.child.filterNodes(exposingNodes);
  }
  override justEval(exposingNodes: Record<string, Node<unknown>>, methods?: EvalMethods): T {
    return this.child.evaluate(this.wrap(exposingNodes), methods);
  }
  override getChildren(): Node<unknown>[] {
    return [this.child];
  }
  override dependValues(): Record<string, unknown> {
    return this.child.dependValues();
  }
  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    return this.child.fetchInfo(this.wrap(exposingNodes));
  }
  @memoized()
  private wrap(exposingNodes: Record<string, Node<unknown>>) {
    return { ...exposingNodes, ...this.paramNodes };
  }
}
