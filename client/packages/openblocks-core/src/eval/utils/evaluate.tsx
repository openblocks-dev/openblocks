import _ from "lodash";
import { Node } from "../node";
import { fromRecord, RecordNode } from "../recordNode";
import { mergeNodesWithSameName, nodeIsRecord } from "./nodeUtils";
import { getDynamicStringSegments, isDynamicSegment } from "./segmentUtils";

export function listDepends(
  unevaledValue: string,
  exposingNodes: Record<string, Node<unknown>>
): RecordNode<Record<string, Node<unknown>>> {
  const nodePathMap = filterDepends(unevaledValue, exposingNodes);
  const nameDependMap = mergeNodesWithSameName(nodePathMap);
  return fromRecord(nameDependMap);
}

export function filterDepends(
  unevaledValue: string,
  exposingNodes: Record<string, Node<unknown>>
): Map<Node<unknown>, string[]> {
  const segments: Array<string> = getDynamicStringSegments(unevaledValue.trim());
  const nodePathMap: Map<Node<unknown>, string[]> = new Map();
  segments
    .filter((segment) => isDynamicSegment(segment))
    .map((segment) => segment.slice(2, -2))
    .forEach((jsSnippet) => {
      parseDepends(jsSnippet, exposingNodes).forEach((path: string[], node: Node<unknown>) => {
        nodePathMap.set(node, path);
      });
    });
  // log.log("unevaledValue: ", unevaledValue, "\nfilteredDepends:", nodePathMap);
  return nodePathMap;
}

export function hasCycle(segment: string, exposingNodes: Record<string, Node<unknown>>): boolean {
  if (!isDynamicSegment(segment)) {
    return false;
  }
  let ret = false;
  parseDepends(segment.slice(2, -2), exposingNodes).forEach((_, node) => {
    if (node.hasCycle()) {
      ret = true;
    }
  });
  return ret;
}

export function filterTopDepends(
  unevaledValue: string,
  exposingNodes: Record<string, Node<unknown>>
): Map<Node<unknown>, string> {
  const segments: Array<string> = getDynamicStringSegments(unevaledValue.trim());
  const nodePathMap: Map<Node<unknown>, string> = new Map();
  segments
    .filter((segment) => isDynamicSegment(segment))
    .map((segment) => segment.slice(2, -2))
    .forEach((jsSnippet) => {
      parseTopDepends(jsSnippet, exposingNodes).forEach((path: string, node: Node<unknown>) => {
        nodePathMap.set(node, path);
      });
    });
  // log.log("unevaledValue: ", unevaledValue, "\nfilteredDepends:", nodePathMap);
  return nodePathMap;
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
  const regStrList = ["[a-zA-Z_$][a-zA-Z_$0-9.[\\]]*", "(?<=\\[)[a-zA-Z_][a-zA-Z_0-9.]*"];

  let ret = segment;
  for (const regStr of regStrList) {
    const reg = new RegExp(regStr, "g");
    ret = ret.replace(reg, (s) => {
      if (s === oldName) {
        return name;
      }
      for (const accessor of accessors) {
        if (s.startsWith(oldName + accessor)) {
          return name + accessor + s.substring(oldName.length + accessor.length);
        }
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
  exposingNodes: Record<string, Node<unknown>>
): Map<Node<unknown>, string[]> {
  const depends: Map<Node<unknown>, string[]> = new Map();
  const identifiers = getIdentifiers(jsSnippet);
  identifiers.forEach((identifier) => {
    const subpaths = _.toPath(identifier);
    const dependAndPath = getDependNode(subpaths, exposingNodes);
    if (dependAndPath) {
      const [depend, path] = dependAndPath;
      depends.set(depend, path);
    }
  });
  return depends;
}

function parseTopDepends(
  jsSnippet: string,
  exposingNodes: Record<string, Node<unknown>>
): Map<Node<unknown>, string> {
  const depends: Map<Node<unknown>, string> = new Map();
  const identifiers = getIdentifiers(jsSnippet);
  identifiers.forEach((identifier) => {
    const subpaths = _.toPath(identifier).slice(0, 1);
    const dependAndPath = getDependNode(subpaths, exposingNodes);
    if (dependAndPath) {
      const [depend, path] = dependAndPath;
      depends.set(depend, path[0]);
    }
  });
  return depends;
}

function getDependNode(
  subpaths: string[],
  exposingNodes: Record<string, Node<unknown>>
): [Node<unknown>, string[]] | undefined {
  if (subpaths.length <= 0 || !exposingNodes.hasOwnProperty(subpaths[0])) {
    return undefined;
  }
  const path: Array<string> = [];
  let record: Node<unknown> = fromRecord(exposingNodes);
  subpaths.forEach((subpath) => {
    if (!nodeIsRecord(record) || !record.children.hasOwnProperty(subpath)) {
      return;
    }
    path.push(subpath);
    record = record.children[subpath];
  });
  return [record, path];
}
