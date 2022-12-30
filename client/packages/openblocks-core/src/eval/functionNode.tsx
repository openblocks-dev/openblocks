import { memoized } from "../util/memoize";
import { AbstractNode, Node, ValueFn } from "./node";
import { EvalMethods } from "./types/evalTypes";
import { evalPerfUtil } from "./utils/perfUtils";

/**
 * return a new node, evaluating to a function result with the input node value as the function's input
 */
export class FunctionNode<T, OutputType> extends AbstractNode<OutputType> {
  readonly type = "function";
  constructor(readonly child: Node<T>, readonly func: (params: T) => OutputType) {
    super();
  }
  override wrapContext(): AbstractNode<ValueFn<OutputType>> {
    return new FunctionNode(
      this.child.wrapContext(),
      (childFn) => (params: Record<string, unknown>) => this.func(childFn(params))
    );
  }
  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>): Map<Node<unknown>, string[]> {
    return evalPerfUtil.perf(this, "filterNodes", () => {
      return this.child.filterNodes(exposingNodes);
    });
  }
  override justEval(
    exposingNodes: Record<string, Node<unknown>>,
    methods?: EvalMethods
  ): OutputType {
    return this.func(this.child.evaluate(exposingNodes, methods));
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

export function withFunction<T, OutputType>(child: Node<T>, func: (params: T) => OutputType) {
  return new FunctionNode(child, func);
}
