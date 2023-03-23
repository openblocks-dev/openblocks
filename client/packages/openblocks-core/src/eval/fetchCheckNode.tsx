import { memoized } from "util/memoize";
import { AbstractNode, FetchInfo, FetchInfoOptions, Node } from "./node";

/**
 * evaluate to get FetchInfo or fetching status
 */
export class FetchCheckNode extends AbstractNode<FetchInfo> {
  readonly type = "fetchCheck";

  constructor(readonly child: Node<unknown>, readonly options?: FetchInfoOptions) {
    super();
  }

  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
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

  @memoized()
  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    return this.child.fetchInfo(exposingNodes, this.options);
  }
}

export function isFetching(node: Node<unknown>): Node<FetchInfo> {
  return new FetchCheckNode(node);
}
