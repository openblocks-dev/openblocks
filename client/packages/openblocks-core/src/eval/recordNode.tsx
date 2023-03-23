import _ from "lodash";
import { memoized } from "../util/memoize";
import { AbstractNode, FetchInfoOptions, Node, NodeToValue } from "./node";
import { EvalMethods } from "./types/evalTypes";
import { addDepends } from "./utils/dependMap";
import { evalPerfUtil } from "./utils/perfUtils";

export type RecordNodeToValue<T> = { [K in keyof T]: NodeToValue<T[K]> };

/**
 * the evaluated value is the record constructed by the children nodes
 */
export class RecordNode<T extends Record<string, Node<unknown>>> extends AbstractNode<
  RecordNodeToValue<T>
> {
  readonly type = "record";

  constructor(readonly children: T) {
    super();
  }

  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    return evalPerfUtil.perf(this, `filterNodes`, () => {
      const result = new Map<Node<unknown>, Set<string>>();
      Object.values(this.children).forEach((node) => {
        addDepends(result, node.filterNodes(exposingNodes));
      });
      return result;
    });
  }

  override justEval(
    exposingNodes: Record<string, Node<unknown>>,
    methods?: EvalMethods
  ): RecordNodeToValue<T> {
    return _.mapValues(this.children, (v, key) =>
      evalPerfUtil.perf(this, `eval-${key}`, () => v.evaluate(exposingNodes, methods))
    ) as RecordNodeToValue<T>;
  }

  override getChildren(): Node<unknown>[] {
    return Object.values(this.children);
  }

  override dependValues(): Record<string, unknown> {
    const nodes = Object.values(this.children);
    if (nodes.length === 1) {
      return nodes[0].dependValues();
    }
    let ret: Record<string, unknown> = {};
    nodes.forEach((node) => {
      Object.entries(node.dependValues()).forEach(([key, value]) => {
        ret[key] = value;
      });
    });
    return ret;
  }

  @memoized()
  override fetchInfo(exposingNodes: Record<string, Node<unknown>>, options?: FetchInfoOptions) {
    let isFetching = false;
    let ready = true;
    Object.entries(this.children).forEach(([name, child]) => {
      const fi = child.fetchInfo(exposingNodes, options);
      isFetching = fi.isFetching || isFetching;
      ready = fi.ready && ready;
    });
    return { isFetching, ready };
  }
}

export function fromRecord<T extends Record<string, Node<unknown>>>(record: T) {
  return new RecordNode(record);
}
