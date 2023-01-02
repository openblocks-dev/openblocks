import _ from "lodash";
import { Node } from "../node";
import { addDepends, addDepend } from "./dependMap";
import { nodeIsRecord } from "./nodeUtils";
import { getDynamicStringSegments, isDynamicSegment } from "./segmentUtils";

export function filterDepends(
  unevaledValue: string,
  exposingNodes: Record<string, Node<unknown>>,
  maxDepth?: number
) {
  const ret = new Map<Node<unknown>, Set<string>>();
  for (const segment of getDynamicStringSegments(unevaledValue)) {
    if (isDynamicSegment(segment)) {
      addDepends(ret, parseDepends(segment.slice(2, -2), exposingNodes, maxDepth));
    }
  }
  return ret;
}

export function hasCycle(segment: string, exposingNodes: Record<string, Node<unknown>>): boolean {
  if (!isDynamicSegment(segment)) {
    return false;
  }
  let ret = false;
  parseDepends(segment.slice(2, -2), exposingNodes).forEach((paths, node) => {
    ret = ret || node.hasCycle();
  });
  return ret;
}

export function changeDependName(
  unevaledValue: string,
  oldName: string,
  name: string,
  isFunction?: boolean
) {
  if (!unevaledValue || !oldName || !name) {
    return unevaledValue;
  }
  if (isFunction) {
    return rename(unevaledValue, oldName, name);
  }
  return getDynamicStringSegments(unevaledValue)
    .map((segment) => {
      if (!isDynamicSegment(segment)) {
        return segment;
      }
      return rename(segment, oldName, name);
    })
    .join("");
}

function rename(segment: string, oldName: string, name: string) {
  const accessors = [".", "["];
  const regStrList = ["[a-zA-Z_$][a-zA-Z_$0-9.[\\]]*", "\\[[a-zA-Z_][a-zA-Z_0-9.]*"];

  let ret = segment;
  for (const regStr of regStrList) {
    const reg = new RegExp(regStr, "g");
    ret = ret.replace(reg, (s) => {
      if (s === oldName) {
        return name;
      }
      let origin = oldName;
      let target = name;
      let matched = false;

      if (s.startsWith(`[${origin}`)) {
        origin = `[${origin}`;
        target = `[${name}`;
        matched = true;
      }

      for (const accessor of accessors) {
        if (s.startsWith(origin + accessor)) {
          matched = true;
          target = target + accessor + s.substring(origin.length + accessor.length);
          break;
        }
      }

      if (matched) {
        return target;
      }

      return s;
    });
  }

  return ret;
}

function getIdentifiers(jsSnippet: string): string[] {
  const ret: string[] = [];
  const commonReg = /[a-zA-Z_$][a-zA-Z_$0-9.[\]]*/g;
  const commonIds = jsSnippet.match(commonReg);
  if (commonIds) {
    ret.push(...commonIds);
  }

  const indexIds: string[] = [];
  (jsSnippet.match(/\[[a-zA-Z_][a-zA-Z_0-9\[\].]*\]/g) || []).forEach((i) => {
    indexIds.push(...getIdentifiers(i.slice(1, -1)));
  });
  ret.push(...indexIds);

  if (ret.length === 0) {
    return [jsSnippet];
  }
  return ret;
}

function parseDepends(
  jsSnippet: string,
  exposingNodes: Record<string, Node<unknown>>,
  maxDepth?: number
) {
  const depends = new Map<Node<unknown>, Set<string>>();
  const identifiers = getIdentifiers(jsSnippet);
  identifiers.forEach((identifier) => {
    const subpaths = _.toPath(identifier);
    const depend = getDependNode(maxDepth ? subpaths.slice(0, maxDepth) : subpaths, exposingNodes);
    if (depend) {
      addDepend(depends, depend[0], [depend[1]]);
    }
  });
  return depends;
}

function getDependNode(
  subPaths: string[],
  exposingNodes: Record<string, Node<unknown>>
): [Node<unknown>, string] | undefined {
  if (subPaths.length <= 0) {
    return undefined;
  }
  let nodes = exposingNodes;
  let node = undefined;
  const path = [];
  for (const subPath of subPaths) {
    const subNode = nodes[subPath];
    if (!nodes.hasOwnProperty(subPath) || !subNode) {
      break;
    }
    node = subNode;
    path.push(subPath);
    if (!nodeIsRecord(node)) {
      break;
    }
    nodes = node.children;
  }
  return node ? [node, path.join(".")] : undefined;
}
