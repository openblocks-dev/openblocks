import _ from "lodash";
import { memoized } from "../util/memoize";
import { FunctionNode } from "./functionNode";
import { AbstractNode, Node, NodeToValue, ValueFn } from "./node";
import { EvalMethods } from "./types/evalTypes";
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
  override wrapContext(): AbstractNode<ValueFn<RecordNodeToValue<T>>> {
    const childrenFnRecord = new RecordNode(
      _.mapValues(
        this.children,
        (v, k) => v.wrapContext() as AbstractNode<ValueFn<NodeToValue<typeof v>>>
      )
    );
    return new FunctionNode(childrenFnRecord, (childrenFn) => (params: Record<string, unknown>) => {
      return _.mapValues(childrenFn, (fn) => fn(params));
    }) as AbstractNode<ValueFn<RecordNodeToValue<T>>>;
  }
  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>): Map<Node<unknown>, string[]> {
    return evalPerfUtil.perf(this, `filterNodes`, () => {
      const result = new Map<Node<unknown>, string[]>();
      Object.values(this.children).forEach((node) => {
        const filteredNodes = node.filterNodes(exposingNodes);
        if (filteredNodes) {
          filteredNodes.forEach((value, key) => {
            result.set(key, value);
          });
        }
      });
      return result;
    });
  }
  override justEval(
    exposingNodes: Record<string, Node<unknown>>,
    methods?: EvalMethods
  ): RecordNodeToValue<T> {
    return _.mapValues(this.children, (v) =>
      v.evaluate(exposingNodes, methods)
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
  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    let isFetching = false;
    let ready = true;
    Object.entries(this.children).forEach(([name, child]) => {
      const fi = child.fetchInfo(exposingNodes);
      isFetching = fi.isFetching || isFetching;
      ready = fi.ready && ready;
    });
    return { isFetching, ready };
  }
}

export function fromRecord<T extends Record<string, Node<unknown>>>(record: T) {
  return new RecordNode(record);
}
