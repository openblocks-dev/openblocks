import { CompInfo } from "comps/editorState";
import { getDynamicStringSegments } from "openblocks-core";
import _ from "lodash";
import { CompletionContext } from "./codeMirror";

export function checkCursorInBinding(context: CompletionContext, isFunction?: boolean): boolean {
  if (isFunction) {
    return true;
  }
  const { state, pos } = context;
  const doc = state.sliceDoc(0, pos);
  const segments = getDynamicStringSegments(doc);
  let cumCharCount = 0;
  for (const segment of segments) {
    const start = cumCharCount;
    const dynamicStart = segment.indexOf("{{");
    const dynamicDoesStart = dynamicStart > -1;
    const dynamicStartIdx = dynamicStart + start + 2;

    const dynamicEnd = segment.indexOf("}}");
    const dynamicDoesEnd = dynamicEnd > -1;
    const dynamicEndIdx = dynamicEnd + start;

    if (dynamicDoesStart && dynamicStartIdx <= pos && (!dynamicDoesEnd || pos <= dynamicEndIdx)) {
      return true;
    }

    cumCharCount += segment.length;
  }
  return false;
}

export function transformCompInfoIntoRecord(compInfo: Array<CompInfo>): Record<string, unknown> {
  return _.fromPairs(compInfo.map((info) => [info.name, info.data]));
}
