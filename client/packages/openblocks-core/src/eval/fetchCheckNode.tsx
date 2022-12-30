import { memoized } from "util/memoize";
import { FunctionNode } from "./functionNode";
import { AbstractNode, FetchInfo, Node, ValueFn } from "./node";

/**
 * evaluate to get FetchInfo or fetching status
 */
export class FetchCheckNode extends AbstractNode<FetchInfo> {
  readonly type = "fetchCheck";
  constructor(readonly child: Node<unknown>) {
    super();
  }
  override wrapContext(): AbstractNode<ValueFn<FetchInfo>> {
    const wrapChild = this.child.wrapContext();
    return new FunctionNode(new FetchCheckNode(wrapChild), (fi) => () => fi);
  }
  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>): Map<Node<unknown>, string[]> {
    return this.child.filterNodes(exposingNodes);
  }
  override justEval(exposingNodes: Record<string, Node<unknown>>) {
    return this.fetchInfo(exposingNodes);
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

export function isFetching(node: Node<unknown>): Node<FetchInfo> {
  return new FetchCheckNode(node);
}
