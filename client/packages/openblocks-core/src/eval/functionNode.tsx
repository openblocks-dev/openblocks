import { memoized } from "../util/memoize";
import { AbstractNode, FetchInfoOptions, Node } from "./node";
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

  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
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

  @memoized()
  override fetchInfo(exposingNodes: Record<string, Node<unknown>>, options?: FetchInfoOptions) {
    return this.child.fetchInfo(exposingNodes, options);
  }
}

export function withFunction<T, OutputType>(child: Node<T>, func: (params: T) => OutputType) {
  return new FunctionNode(child, func);
}
