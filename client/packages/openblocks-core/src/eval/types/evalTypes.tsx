export type EvalMethods = Record<string, Record<string, Function>>;

export type CodeType = undefined | "JSON" | "Function" | "PureJSON";

export type CodeFunction = (args?: Record<string, unknown>, runInHost?: boolean) => any;
