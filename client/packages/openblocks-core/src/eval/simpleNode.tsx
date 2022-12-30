import LRU from "lru-cache";
import { memoized } from "util/memoize";
import { AbstractNode, Node } from "./node";
import { evalPerfUtil } from "./utils/perfUtils";

/**
 * directly provide data
 */
export class SimpleNode<T> extends AbstractNode<T> {
  readonly type = "simple";
  constructor(readonly value: T) {
    super();
  }
  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    return evalPerfUtil.perf(this, "filterNodes", () => {
      return new Map<Node<unknown>, Set<string>>();
    });
  }
  override justEval(exposingNodes: Record<string, Node<unknown>>): T {
    return this.value;
  }
  override getChildren(): Node<unknown>[] {
    return [];
  }
  override dependValues(): Record<string, unknown> {
    return {};
  }
  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    return {
      isFetching: false,
      ready: true,
    };
  }
}

/**
 * provide simple value, don't need to eval
 */
export function fromValue<T>(value: T) {
  return new SimpleNode(value);
}

const lru = new LRU<unknown, SimpleNode<unknown>>({ max: 16384 });
export function fromValueWithCache<T>(value: T): SimpleNode<T> {
  let res = lru.get(value);
  if (res === undefined) {
    res = fromValue(value);
    lru.set(value, res);
  }
  return res as SimpleNode<T>;
}
