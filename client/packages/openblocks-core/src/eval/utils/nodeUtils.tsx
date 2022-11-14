import { CodeNode } from "../codeNode";
import { Node } from "../node";
import { fromRecord, RecordNode } from "../recordNode";

export function dependsErrorMessage(node: CodeNode) {
  return `DependencyError: "${node.unevaledValue}" caused a cyclic dependency.`;
}

export function getErrorMessage(err: unknown) {
  const errorMesasge =
    err instanceof Error
      ? err.name + ": " + err.message
      : "UnknownError: unknown exception during eval";
  return errorMesasge;
}

export function mergeNodesWithSameName(
  nodePathMap: Map<Node<unknown>, string[]>
): Record<string, Node<unknown>> {
  const nameDepMap: Record<string, Node<unknown>> = {};
  nodePathMap.forEach((path: string[], node: Node<unknown>) => {
    const dep = genDepends(path, node);
    const name = path[0];
    const newDep = mergeNode(nameDepMap[name], dep);
    nameDepMap[name] = newDep;
  });

  return nameDepMap;
}

function genDepends(path: string[], node: Node<unknown>): Node<unknown> {
  if (path.length <= 0) {
    throw new Error("path length should not be 0");
  }
  if (path.length === 1) {
    return node;
  }
  return genDepends(path.slice(0, -1), fromRecord({ [path[path.length - 1]]: node }));
}

// node2 mostly has one path
export function mergeNode(node1: Node<unknown> | undefined, node2: Node<unknown>): Node<unknown> {
  if (!node1 || node1 === node2) {
    return node2;
  }
  if (!nodeIsRecord(node1) || !nodeIsRecord(node2)) {
    throw new Error("unevaledNode should be type of RecordNode");
  }

  const record1 = node1.children;
  const record2 = node2.children;

  const record = { ...record1 };
  Object.keys(record2).forEach((name) => {
    const subNode1 = record1[name];
    const subNode2 = record2[name];
    let subNode: Node<unknown> = subNode1 ? mergeNode(subNode1, subNode2) : subNode2;
    record[name] = subNode;
  });
  return fromRecord(record);
}

export function nodeIsRecord(
  node: Node<unknown>
): node is RecordNode<Record<string, Node<unknown>>> {
  return node.type === "record";
}
