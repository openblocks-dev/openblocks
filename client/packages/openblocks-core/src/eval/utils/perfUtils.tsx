import _ from "lodash";

const SWITCH_PERF_ON = false;

interface RecursivePerfUtilParams {
  name: string;
}

interface PerfInfo {
  obj: any;
  childrenPerfInfo: PerfInfo[];
  costMs: number;
  depth: number;
  info?: string;
}

class RecursivePerfUtil {
  root = Symbol("root");
  name: string;

  record: PerfInfo;
  stack: number[] = [];

  constructor(params: RecursivePerfUtilParams) {
    this.name = params.name;
    this.record = this.initRecord();
  }

  private initRecord = () => {
    return { obj: this.root, childrenPerfInfo: [], costMs: 0, depth: 0 };
  };

  private getRecordByStack = (stack?: number[]) => {
    let curRecord = this.record;
    (stack ?? this.stack).forEach((idx) => {
      curRecord = curRecord.childrenPerfInfo[idx];
    });
    return curRecord;
  };

  perf<T>(obj: any, info: string, fn: () => T): T {
    if (!SWITCH_PERF_ON) {
      return fn();
    }
    const curRecord = this.getRecordByStack();
    const childrenSize = _.size(curRecord.childrenPerfInfo);
    curRecord.childrenPerfInfo.push({
      obj,
      childrenPerfInfo: [],
      costMs: 0,
      depth: curRecord.depth + 1,
      info,
    });
    this.stack.push(childrenSize);
    const startMs = performance.now();

    const result = fn();

    const costMs = performance.now() - startMs;
    this.stack.pop();
    curRecord.childrenPerfInfo[childrenSize].costMs = costMs;
    curRecord.costMs += costMs;

    return result;
  }

  clear = () => {
    this.record = this.initRecord();
  };

  print = (...stack: number[]) => {
    const record = this.getRecordByStack(stack);
    console.info(
      `PerfInfo. stack: ${stack}, [info] ${record.info}, obj: `,
      record.obj,
      `, costMs: ${record.costMs}, depth: ${record.depth}, size: ${_.size(record.childrenPerfInfo)}`
    );
    record.childrenPerfInfo.forEach((subRecord, idx) => {
      console.info(
        `  [${idx}]${subRecord.info}. obj: `,
        subRecord.obj,
        " costMs: ",
        subRecord.costMs
      );
    });
  };
}

export const evalPerfUtil = new RecursivePerfUtil({ name: "evaluate" });

// @ts-ignore
globalThis.evalPerfUtil = evalPerfUtil;
