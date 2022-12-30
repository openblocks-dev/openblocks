import { updateNodesV2Action } from "openblocks-core";
import { Node } from "openblocks-core";
import { EvalMethods } from "openblocks-core";
import _ from "lodash";
import { Comp } from "openblocks-core";
import { exposingInfoToNodes, exposingMethods } from "./exposingTypes";
import { ReactNode, ReactElement } from "react";
export * from "./nameGenerator";

/**
 * Similar to evalAndReduce, but exposingNodes are taken from comp
 */
export function evalAndReduceWithExposing<T extends Comp>(comp: T): T {
  // FIXME: remove type cast
  if ((comp as any).nameAndExposingInfo) {
    const info = (comp as any).nameAndExposingInfo();
    comp = evalAndReduce(comp, exposingInfoToNodes(info), exposingMethods(info));
  } else {
    comp = evalAndReduce(comp);
  }
  return comp;
}

export function evalAndReduce<T extends Comp>(
  comp: T,
  exposingNodes?: Record<string, Node<unknown>>,
  methods?: EvalMethods
): T {
  // log.log("evalAndReduce. exposingNodes: ", exposingNodes);
  const node = comp.node();
  if (node === undefined) {
    return comp;
  }
  const value = node.evaluate(exposingNodes, methods);
  // log.log("comp: ", comp, "\nnode: ", node, "\nvalue: ", value);
  return comp.reduce(updateNodesV2Action(value));
}

/**
 * Generates a new type, containing all properties in A and B with the same name and type
 */
export type Common<A, B> = Pick<
  A,
  {
    [K in keyof A & keyof B]: A[K] extends B[K] ? (B[K] extends A[K] ? K : never) : never;
  }[keyof A & keyof B]
>;

/**
 * Generate a new type according to the interface, which can be type inheritance and JSONObject
 */
export type ToType<T> = {
  [K in keyof T]: T[K];
};

/**
 * An array element is to be moved from the fromIndex position to the toIndex position.
 * Returns the new position of the element originally at the currentIndex position after the move
 */
const arrayMoveIndex = (fromIndex: number, toIndex: number, currentIndex: number): number => {
  if (fromIndex === currentIndex) {
    return toIndex;
  }
  if (currentIndex < fromIndex && currentIndex < toIndex) {
    return currentIndex;
  }
  if (currentIndex > fromIndex && currentIndex > toIndex) {
    return currentIndex;
  }
  if (fromIndex < toIndex) {
    return currentIndex - 1;
  }
  return currentIndex + 1;
};

/**
 * Move the element at the `start` position in the data array to `end`
 */
export function arrayMove<T>(data: Array<T>, start: number, end: number) {
  const result = Array(data.length);
  _.range(data.length).forEach((x) => {
    result[arrayMoveIndex(start, end, x)] = data[x];
  });
  return result;
}

export const hasIcon = (icon: ReactNode) => (icon as ReactElement).props.value;
