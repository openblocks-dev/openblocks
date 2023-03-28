import { memoized } from "util/memoize";
import { EvalMethods } from "./types/evalTypes";
import { AbstractNode, Node } from "./node";

// encapsulate module node, use specified exposing nodes and input nodes
export class WrapNode<T> extends AbstractNode<T> {
  readonly type = "wrap";

  constructor(
    readonly delegate: Node<T>,
    readonly moduleExposingNodes: Record<string, Node<unknown>>,
    readonly moduleExposingMethods?: EvalMethods,
    readonly inputNodes?: Record<string, Node<unknown> | string>
  ) {
    super();
  }

  private wrap(exposingNodes: Record<string, Node<unknown>>, exposingMethods: EvalMethods) {
    if (!this.inputNodes) {
      return this.moduleExposingNodes;
    }

    const inputNodeEntries = Object.entries(this.inputNodes);
    if (inputNodeEntries.length === 0) {
      return this.moduleExposingNodes;
    }
    const inputNodes: Record<string, Node<unknown>> = {};
    inputNodeEntries.forEach(([name, node]) => {
      let targetNode: Node<unknown> = typeof node === "string" ? exposingNodes[node] : node;
      if (!targetNode) {
        return;
      }
      inputNodes[name] = new WrapNode(targetNode, exposingNodes, exposingMethods);
    });
    return {
      ...this.moduleExposingNodes,
      ...inputNodes,
    };
  }

  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    return this.delegate.filterNodes(this.wrap(exposingNodes, {}));
  }

  override justEval(exposingNodes: Record<string, Node<unknown>>, methods: EvalMethods): T {
    return this.delegate.evaluate(this.wrap(exposingNodes, methods), this.moduleExposingMethods);
  }

  @memoized()
  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    return this.delegate.fetchInfo(this.wrap(exposingNodes, {}));
  }

  override getChildren(): Node<unknown>[] {
    return [this.delegate];
  }

  override dependValues(): Record<string, unknown> {
    return {};
  }
}
