import _ from "lodash";
import { memoized } from "util/memoize";
import { FunctionNode, withFunction } from "./functionNode";
import { AbstractNode, FetchInfo, FetchInfoOptions, Node } from "./node";
import { fromRecord } from "./recordNode";
import { CodeType, EvalMethods } from "./types/evalTypes";
import { ValueAndMsg, ValueExtra } from "./types/valueAndMsg";
import { addDepend, addDepends } from "./utils/dependMap";
import { filterDepends, hasCycle } from "./utils/evaluate";
import { dependsErrorMessage, mergeNodesWithSameName, nodeIsRecord } from "./utils/nodeUtils";
import { string2Fn } from "./utils/string2Fn";

export interface CodeNodeOptions {
  codeType?: CodeType;

  // whether to support comp methods?
  evalWithMethods?: boolean;
}

const IS_FETCHING_FIELD = "isFetching";
const LATEST_END_TIME_FIELD = "latestEndTime";
const TRIGGER_TYPE_FIELD = "triggerType";

/**
 * user input node
 *
 * @remarks
 * CodeNode should resolve the cyclic dependency problem
 * we may assume cyclic dependency only imported by CodeNode
 *
 * FIXME(libin): distinguish Json CodeNode，since wrapContext may cause problems.
 */
export class CodeNode extends AbstractNode<ValueAndMsg<unknown>> {
  readonly type = "input";

  private readonly codeType?: CodeType;
  private readonly evalWithMethods: boolean;
  private directDepends = new Map<Node<unknown>, Set<string>>();

  constructor(readonly unevaledValue: string, readonly options?: CodeNodeOptions) {
    super();
    this.codeType = options?.codeType;
    this.evalWithMethods = options?.evalWithMethods ?? true;
  }

  // FIXME: optimize later
  private convertedValue(): string {
    if (this.codeType === "Function") {
      return `{{function(){${this.unevaledValue}}}}`;
    }
    return this.unevaledValue;
  }

  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    if (!!this.evalCache.inFilterNodes) {
      return new Map<Node<unknown>, Set<string>>();
    }
    this.evalCache.inFilterNodes = true;
    try {
      const filteredDepends = this.filterDirectDepends(exposingNodes);
      // log.log("unevaledValue: ", this.unevaledValue, "\nfilteredDepends:", filteredDepends);

      const result = addDepends(new Map(), filteredDepends);
      filteredDepends.forEach((paths, node) => {
        addDepends(result, node.filterNodes(exposingNodes));
      });

      // Add isFetching & latestEndTime node for FetchCheck
      const topDepends = filterDepends(this.convertedValue(), exposingNodes, 1);
      topDepends.forEach((paths, depend) => {
        if (nodeIsRecord(depend)) {
          for (const field of [IS_FETCHING_FIELD, LATEST_END_TIME_FIELD]) {
            const node = depend.children[field];
            if (node) {
              addDepend(
                result,
                node,
                Array.from(paths).map((p) => p + "." + field)
              );
            }
          }
        }
      });
      return result;
    } finally {
      this.evalCache.inFilterNodes = false;
    }
  }

  // only includes direct depends, exlucdes depends of dependencies
  @memoized()
  private filterDirectDepends(exposingNodes: Record<string, Node<unknown>>) {
    return filterDepends(this.convertedValue(), exposingNodes);
  }

  override justEval(
    exposingNodes: Record<string, Node<unknown>>,
    methods?: EvalMethods
  ): ValueAndMsg<unknown> {
    // log.log("justEval: ", this, "\nexposingNodes: ", exposingNodes);
    if (!!this.evalCache.inEval) {
      // found cyclic eval
      this.evalCache.cyclic = true;
      return new ValueAndMsg<unknown>("");
    }
    this.evalCache.inEval = true;
    try {
      const dependingNodeMap = this.filterDirectDepends(exposingNodes);
      this.directDepends = dependingNodeMap;
      const dependingNodes = mergeNodesWithSameName(dependingNodeMap);
      const fn = string2Fn(this.unevaledValue, this.codeType, this.evalWithMethods ? methods : {});
      const evalNode = withFunction(fromRecord(dependingNodes), fn);
      let valueAndMsg = evalNode.evaluate(exposingNodes);
      // log.log("unevaledValue: ", this.unevaledValue, "\ndependingNodes: ", dependingNodes, "\nvalueAndMsg: ", valueAndMsg);
      if (this.evalCache.cyclic) {
        valueAndMsg = new ValueAndMsg<unknown>(
          valueAndMsg.value,
          (valueAndMsg.msg ? valueAndMsg.msg + "\n" : "") + dependsErrorMessage(this),
          fixCyclic(valueAndMsg.extra, exposingNodes)
        );
      }
      return valueAndMsg;
    } finally {
      this.evalCache.inEval = false;
    }
  }

  override getChildren(): Node<unknown>[] {
    if (this.directDepends) {
      return Array.from(this.directDepends.keys());
    }
    return [];
  }

  override dependValues(): Record<string, unknown> {
    let ret: Record<string, unknown> = {};
    this.directDepends.forEach((paths, node) => {
      if (node instanceof AbstractNode) {
        paths.forEach((path) => {
          ret[path] = node.evalCache.value;
        });
      }
    });
    return ret;
  }

  @memoized()
  override fetchInfo(
    exposingNodes: Record<string, Node<unknown>>,
    options?: FetchInfoOptions
  ): FetchInfo {
    if (!!this.evalCache.inIsFetching) {
      return {
        isFetching: false,
        ready: true,
      };
    }
    this.evalCache.inIsFetching = true;
    try {
      const topDepends = filterDepends(this.convertedValue(), exposingNodes, 1);

      let isFetching = false;
      let ready = true;

      topDepends.forEach((paths, depend) => {
        const value = depend.evaluate(exposingNodes) as any;
        if (
          options?.ignoreManualDepReadyStatus &&
          _.has(value, TRIGGER_TYPE_FIELD) &&
          value.triggerType === "manual"
        ) {
          return;
        }

        if (_.has(value, IS_FETCHING_FIELD)) {
          isFetching = isFetching || value.isFetching === true;
        }
        if (_.has(value, LATEST_END_TIME_FIELD)) {
          ready = ready && value.latestEndTime > 0;
        }
      });

      const dependingNodeMap = this.filterNodes(exposingNodes);
      dependingNodeMap.forEach((paths, depend) => {
        const fi = depend.fetchInfo(exposingNodes, options);
        isFetching = isFetching || fi.isFetching;
        ready = ready && fi.ready;
      });

      return {
        isFetching,
        ready: ready,
      };
    } finally {
      this.evalCache.inIsFetching = false;
    }
  }
}

/**
 * generate node for unevaledValue
 */
export function fromUnevaledValue(unevaledValue: string) {
  return new FunctionNode(new CodeNode(unevaledValue), (valueAndMsg) => valueAndMsg.value);
}

function fixCyclic(
  extra: ValueExtra | undefined,
  exposingNodes: Record<string, Node<unknown>>
): ValueExtra | undefined {
  extra?.segments?.forEach((segment) => {
    if (segment.success) {
      segment.success = !hasCycle(segment.value, exposingNodes);
    }
  });
  return extra;
}
