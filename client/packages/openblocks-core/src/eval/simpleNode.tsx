import LRU from "lru-cache";
import { memoized } from "util/memoize";
import { AbstractNode, Node } from "./node";

/**
 * directly provide data
 */
export class SimpleNode<T> extends AbstractNode<T> {
  readonly type = "simple";
  constructor(readonly value: T) {
    super();
  }
  override wrapContext(paramName: string): SimpleNode<() => T> {
    return new SimpleNode(() => this.value);
  }
  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>): Map<Node<unknown>, string[]> {
    return new Map<Node<unknown>, string[]>();
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
