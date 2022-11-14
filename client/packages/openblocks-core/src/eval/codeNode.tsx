import _ from "lodash";
import { memoized } from "util/memoize";
import { CodeType, EvalMethods } from "./types/evalTypes";
import { FunctionNode, withFunction } from "./functionNode";
import { AbstractNode, FetchInfo, Node, ValueFn } from "./node";
import { fromRecord } from "./recordNode";
import { filterDepends, filterTopDepends, hasCycle } from "./utils/evaluate";
import { dependsErrorMessage, mergeNodesWithSameName } from "./utils/nodeUtils";
import { string2Fn } from "./utils/string2Fn";
import { ValueAndMsg, ValueExtra } from "./types/valueAndMsg";

export interface CodeNodeOptions {
  codeType?: CodeType;

  // whether to support comp methods?
  evalWithMethods?: boolean;
  // multi-level nested parameters. when setting, value may be multi-level nested parameters: paramValues => ... => ValueAndMsg<unknown>
  paramNamesList?: string[][];
}

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
  private directDepends: Map<Node<unknown>, string[]> = new Map();

  constructor(readonly unevaledValue: string, readonly options?: CodeNodeOptions) {
    super();
    this.codeType = options?.codeType;
    this.evalWithMethods = options?.evalWithMethods ?? true;
  }

  override wrapContext(paramName: string): AbstractNode<ValueFn<ValueAndMsg<unknown>>> {
    const fnNode = new CodeNode(this.unevaledValue, {
      ...this.options,
      paramNamesList: [...(this.options?.paramNamesList ?? []), paramName.split(",")],
    }) as AbstractNode<ValueAndMsg<ValueFn<ValueAndMsg<unknown>>>>;
    // safe wrapper
    return new FunctionNode(fnNode, (result) => result.value);
  }

  // FIXME: optimize later
  private convertedValue(): string {
    if (this.codeType === "Function") {
      return `{{function(){${this.unevaledValue}}}}`;
    }
    return this.unevaledValue;
  }

  @memoized()
  override filterNodes(exposingNodes: Record<string, Node<unknown>>): Map<Node<unknown>, string[]> {
    if (!!this.evalCache.inFilterNodes) {
      return new Map();
    }
    this.evalCache.inFilterNodes = true;
    try {
      const filteredDepends = this.filterDirectDepends(exposingNodes);
      // log.log("unevaledValue: ", this.unevaledValue, "\nfilteredDepends:", filteredDepends);
      const result = new Map<Node<unknown>, string[]>(filteredDepends);
      filteredDepends.forEach((__, node) => {
        const filteredNodes = node.filterNodes(exposingNodes);
        if (filteredNodes) {
          filteredNodes.forEach((value, key) => {
            result.set(key, value);
          });
        }
      });
      return result;
    } finally {
      this.evalCache.inFilterNodes = false;
    }
  }

  // only includes direct depends, exlucdes depends of dependencies
  @memoized()
  filterDirectDepends(exposingNodes: Record<string, Node<unknown>>): Map<Node<unknown>, string[]> {
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
      const fn = string2Fn(
        this.unevaledValue,
        this.codeType,
        this.evalWithMethods ? methods : {},
        this.options?.paramNamesList
      );
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
    this.directDepends.forEach((path, node) => {
      if (node instanceof AbstractNode) {
        ret[path.join(".")] = node.evalCache.value;
      }
    });
    return ret;
  }

  override fetchInfo(exposingNodes: Record<string, Node<unknown>>): FetchInfo {
    if (!!this.evalCache.inIsFetching) {
      return {
        isFetching: false,
        ready: true,
      };
    }
    this.evalCache.inIsFetching = true;
    try {
      const topDepends: Map<Node<unknown>, string> = filterTopDepends(
        this.convertedValue(),
        exposingNodes
      );

      let isFetching = false;
      let ready = true;

      topDepends.forEach((_v, depend) => {
        const value = depend.evaluate(exposingNodes) as any;
        if (_.has(value, "isFetching")) {
          isFetching = isFetching || value.isFetching === true;
        }
        if (_.has(value, "latestEndTime")) {
          ready = ready && value.latestEndTime > 0;
        }
      });

      const dependingNodeMap = this.filterNodes(exposingNodes);
      dependingNodeMap.forEach((_v, depend) => {
        const fi = depend.fetchInfo(exposingNodes);
        isFetching = isFetching || fi.isFetching;
        ready = ready && fi.ready;
      });

      return {
        isFetching,
        ready,
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
