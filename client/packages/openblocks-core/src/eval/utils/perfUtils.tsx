import _ from "lodash";

const SWITCH_PERF_ON = false;
const COST_MS_PRINT_THR = 0;

interface PerfInfo {
  obj: any;
  name: string;
  childrenPerfInfo: PerfInfo[];
  costMs: number;
  depth: number;
  info: Record<string, any>;
}

type Log = (key: string, log: any) => void;

class RecursivePerfUtil {
  root = Symbol("root");

  record: PerfInfo;
  stack: number[] = [];

  constructor() {
    this.record = this.initRecord();
  }

  private initRecord = () => {
    return { obj: this.root, name: "@root", childrenPerfInfo: [], costMs: 0, depth: 0, info: {} };
  };

  private getRecordByStack = (stack?: number[]) => {
    let curRecord = this.record;
    (stack ?? this.stack).forEach((idx) => {
      curRecord = curRecord.childrenPerfInfo[idx];
    });
    return curRecord;
  };

  log(info: Record<string, any>, key: string, log: any) {
    info[key] = log;
  }

  perf<T>(obj: any, name: string, fn: (log: Log) => T): T {
    if (!SWITCH_PERF_ON) {
      return fn(_.noop);
    }
    const curRecord = this.getRecordByStack();
    const childrenSize = _.size(curRecord.childrenPerfInfo);
    const nextPerfInfo = {
      obj,
      name,
      childrenPerfInfo: [],
      costMs: 0,
      depth: curRecord.depth + 1,
      info: {},
    };
    curRecord.childrenPerfInfo.push(nextPerfInfo);
    this.stack.push(childrenSize);
    const startMs = performance.now();

    const wrapLog: Log = (key, log) => this.log(nextPerfInfo.info, key, log);
    const result = fn(wrapLog);

    const costMs = performance.now() - startMs;
    this.stack.pop();
    curRecord.childrenPerfInfo[childrenSize].costMs = costMs;
    curRecord.costMs += costMs;

    return result;
  }

  clear = () => {
    this.record = this.initRecord();
  };

  print = (stack: number[], cost_ms_print_thr: number = COST_MS_PRINT_THR) => {
    const record = this.getRecordByStack(stack);
    console.info(
      `~~ PerfInfo. costMs: ${record.costMs.toFixed(3)}, stack: ${stack}, [name]${
        record.name
      }, [info]`,
      record.info,
      `, obj: `,
      record.obj,
      `, depth: ${record.depth}, size: ${_.size(record.childrenPerfInfo)}`
    );
    record.childrenPerfInfo.forEach((subRecord, idx) => {
      if (subRecord.costMs >= cost_ms_print_thr) {
        console.info(
          `  costMs: ${subRecord.costMs.toFixed(3)} [${idx}]${subRecord.name} [info]`,
          subRecord.info,
          `. obj: `,
          subRecord.obj,
          ``
        );
      }
    });
  };
}

export const evalPerfUtil = new RecursivePerfUtil();

// @ts-ignore
globalThis.evalPerfUtil = evalPerfUtil;
