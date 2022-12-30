import { Node } from "../node";

export function addDepend(
  target: Map<Node<unknown>, Set<string>>,
  node: Node<unknown> | undefined,
  paths: string[] | Set<string>
) {
  if (!node) {
    return;
  }
  let value = target.get(node);
  if (value === undefined) {
    value = new Set();
    target.set(node, value);
  }
  paths.forEach((p) => value?.add(p));
}

export function addDepends(
  target: Map<Node<unknown>, Set<string>>,
  source?: Map<Node<unknown>, Set<string>>
) {
  source?.forEach((paths, node) => addDepend(target, node, paths));
  return target;
}
