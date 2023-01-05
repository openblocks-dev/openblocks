import { CALM_DOWN_TIMEOUT } from "constants/perf";
import log from "loglevel";

class StopWatch {
  startTime: number;
  key: string;

  constructor(key: string) {
    this.key = key;
    this.startTime = performance.now();
  }

  end() {
    addPerfMetric(this.key, performance.now() - this.startTime);
  }
}

class Counter {
  count: number = 0;
  total: number = 0;

  toString() {
    return `count ${this.count}, avg ${this.total / this.count}`;
  }
}

let records: Record<string, Counter> = {};

function clearAndOutput() {
  Object.keys(records).forEach((key) => {
    log.log(`key: ${key}, detail: ${records[key]}`);
  });
  records = {};
}

let inited = false;

function init() {
  if (!inited) {
    setInterval(clearAndOutput, 2000);
  }
  inited = true;
}

function addPerfMetric(key: string, costMs: number): void {
  init();
  if (!records[key]) {
    records[key] = new Counter();
  }
  records[key].count += 1;
  records[key].total += costMs;
}

/**
 * Usage:
 * const stopWatch = startStopWatch("test-demo");
 * stopWatch.end();
 */
export function startStopWatch(key: string) {
  return new StopWatch(key);
}

/**
 * use as a function's annotation, print performance statistics every two seconds
 */
export function perfMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const stopWatch = startStopWatch(propertyKey);
    const result = originalMethod.apply(this, args);
    stopWatch.end();
    return result;
  };
}

const SHOW_COST_INFO = false;

export function statPerf<T>(logstr: string, fn: () => T): T {
  if (!SHOW_COST_INFO) {
    return fn();
  }
  const stopWatch = startStopWatch(logstr);
  const result = fn();
  stopWatch.end();
  return result;
}

/**
 * print the running time of the input function
 * turn on the above switch when using
 */
export function showCost<T>(logstr: string, fn: () => T): T {
  if (!SHOW_COST_INFO) {
    return fn();
  }
  const startTime = performance.now();
  const result = fn();
  console.info(`${logstr} cost: ${performance.now() - startTime}`);
  return result;
}

export function cost(fn: (...args: any[]) => any): number {
  const start = performance.now();
  fn();
  return performance.now() - start;
}

export const MarkStart = "start";
export const MarkAppEditorFirstRender = "app-editor-first-render";
export const MarkAppEditorMounted = "app-editor-mounted";
export const MarkAppDSLLoaded = "app-dsl-loaded";
export const MarkAppInitialized = "app-initialized";
export const MarkAppCalmDown = "app-calm-down";

export const MeasureCalmDown = "app-calm-down-from-dsl-loaded";

export function perfMark(name: string) {
  if (performance.mark === undefined) {
    return;
  }
  return performance.mark(name);
}

export function perfMeasure(name: string, startMark: string, endMark: string, detail?: any) {
  if (
    performance.measure === undefined ||
    performance.getEntriesByName === undefined ||
    performance.getEntriesByName(startMark, "mark").length === 0 ||
    performance.getEntriesByName(endMark, "mark").length === 0
  ) {
    return;
  }
  return performance.measure(name, {
    start: startMark,
    end: endMark,
    detail,
  });
}

export function perfClear() {
  performance?.clearMarks();
  performance?.clearMeasures();
}

const markOffset: { [key: string]: number } = {
  [MarkAppCalmDown]: -CALM_DOWN_TIMEOUT,
};

const measureDurationOffset: { [key: string]: number } = {
  [MeasureCalmDown]: -CALM_DOWN_TIMEOUT,
};

interface PrintPerfParams {
  measure?: boolean;
  mark?: boolean;
  format?: "table" | "json" | "prettyJSON";
}

function printPerf(params?: PrintPerfParams) {
  const { measure = true, mark = true, format = "json" } = params || {};
  const data = [];
  if (mark) {
    const entries = performance.getEntriesByType("mark");
    for (const { name, startTime } of entries) {
      const offset = markOffset[name] || 0;
      data.push({
        type: "mark",
        name,
        startTime: startTime + offset,
      });
    }
  }

  if (measure) {
    const entries = performance.getEntriesByType("measure") as PerformanceMeasure[];
    for (const { name, duration, detail } of entries) {
      const offset = measureDurationOffset[name] || 0;
      data.push({
        type: "measure",
        name,
        duration: duration + offset,
        detail: format === "table" ? JSON.stringify(detail) : detail,
      });
    }
  }

  if (format === "table") {
    return log.info(data);
  }
  const out = format === "prettyJSON" ? JSON.stringify(data, null, 4) : JSON.stringify(data);
  log.log(out);
}

window.printPerf = printPerf;
