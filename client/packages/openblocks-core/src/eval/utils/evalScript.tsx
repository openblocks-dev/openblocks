import { EvalMethods } from "../types/evalTypes";
import log from "loglevel";

// global variables black list, forbidden to use in for jsQuery/jsAction
const functionBlacklist = new Set<PropertyKey>([
  "top",
  "parent",
  "document",
  "location",
  "chrome",
  "fetch",
  "XMLHttpRequest",
  "importScripts",
  "Navigator",
  "MutationObserver",
]);

const expressionBlacklist = new Set<PropertyKey>([
  ...Array.from(functionBlacklist.values()),
  "setTimeout",
  "setInterval",
  "setImmediate",
]);

const globalVarNames = new Set<PropertyKey>(["window", "globalThis", "self", "global"]);

export function createBlackHole(): any {
  return new Proxy(
    function () {
      return createBlackHole();
    },
    {
      get(t, p, r) {
        if (p === "toString") {
          return function () {
            return "";
          };
        }
        if (p === Symbol.toPrimitive) {
          return function () {
            return "";
          };
        }
        log.log(`[Sandbox] access ${String(p)} on black hole, return mock object`);
        return createBlackHole();
      },
    }
  );
}

function createMockWindow(
  base?: object,
  blacklist: Set<PropertyKey> = expressionBlacklist,
  onSet?: (name: string) => void,
  disableLimit?: boolean
) {
  const win: any = new Proxy(Object.assign({}, base), {
    has() {
      return true;
    },
    set(target, p, newValue) {
      if (typeof p === "string") {
        onSet?.(p);
      }
      return Reflect.set(target, p, newValue);
    },
    get(target, p) {
      if (p in target) {
        return Reflect.get(target, p);
      }
      if (globalVarNames.has(p)) {
        return win;
      }
      if (typeof p === "string" && blacklist?.has(p) && !disableLimit) {
        log.log(`[Sandbox] access ${String(p)} on mock window, return mock object`);
        return createBlackHole();
      }
      return getPropertyFromNativeWindow(p);
    },
  });
  return win;
}

let mockWindow: any;
let currentDisableLimit: boolean = false;

export function clearMockWindow() {
  mockWindow = createMockWindow();
}

export type SandboxScope = "function" | "expression";

export interface SandBoxOption {
  /**
   * disable all limit, like running in host
   */
  disableLimit?: boolean;

  /**
   * the scope this sandbox works in, which will use different blacklist
   */
  scope?: SandboxScope;

  /**
   * handler when set global variables to sandbox, only be called when scope is function
   */
  onSetGlobalVars?: (name: string) => void;
}

function isDomElement(obj: any): boolean {
  return obj instanceof Element || obj instanceof HTMLCollection;
}

function getPropertyFromNativeWindow(prop: PropertyKey) {
  const ret = Reflect.get(window, prop);
  if (typeof ret === "function" && !ret.prototype) {
    return ret.bind(window);
  }
  // get DOM element by id, serializing may cause error
  if (isDomElement(ret)) {
    return undefined;
  }
  return ret;
}

function proxySandbox(context: any, methods?: EvalMethods, options?: SandBoxOption) {
  const { disableLimit = false, scope = "expression", onSetGlobalVars } = options || {};

  const isProtectedVar = (key: PropertyKey) => {
    return key in context || key in (methods || {}) || globalVarNames.has(key);
  };

  const cache = {};
  const blacklist = scope === "function" ? functionBlacklist : expressionBlacklist;

  if (scope === "function" || !mockWindow || disableLimit !== currentDisableLimit) {
    mockWindow = createMockWindow(mockWindow, blacklist, onSetGlobalVars, disableLimit);
  }
  currentDisableLimit = disableLimit;

  return new Proxy(mockWindow, {
    has(target, p) {
      // proxy all variables
      return true;
    },
    get(target, p, receiver) {
      if (p === Symbol.unscopables) {
        return undefined;
      }

      if (p === "toJSON") {
        return target;
      }

      if (globalVarNames.has(p)) {
        return target;
      }

      if (p in context) {
        if (p in cache) {
          return Reflect.get(cache, p);
        }
        let value = Reflect.get(context, p, receiver);
        if (typeof value === "object" && value !== null) {
          if (methods && p in methods) {
            value = Object.assign({}, value, Reflect.get(methods, p));
          }
          Object.freeze(value);
          Object.values(value).forEach(Object.freeze);
        }
        Reflect.set(cache, p, value);
        return value;
      }

      if (disableLimit) {
        return getPropertyFromNativeWindow(p);
      }

      return Reflect.get(target, p, receiver);
    },

    set(target, p, value, receiver) {
      if (isProtectedVar(p)) {
        throw new Error(p.toString() + " can't be modified");
      }
      return Reflect.set(target, p, value, receiver);
    },

    defineProperty(target, p, attributes) {
      if (isProtectedVar(p)) {
        throw new Error("can't define property:" + p.toString());
      }
      return Reflect.defineProperty(target, p, attributes);
    },

    deleteProperty(target, p) {
      if (isProtectedVar(p)) {
        throw new Error("can't delete property:" + p.toString());
      }
      return Reflect.deleteProperty(target, p);
    },

    setPrototypeOf(target, v) {
      throw new Error("can't invoke setPrototypeOf");
    },
  });
}

export function evalScript(script: string, context: any, methods?: EvalMethods) {
  return evalFunc(`return (${script}\n);`, context, methods);
}

export function evalFunc(
  functionBody: string,
  context: any,
  methods?: EvalMethods,
  options?: SandBoxOption,
  isAsync?: boolean
) {
  const code = `with(this){
    return (${isAsync ? "async " : ""}function() {
      'use strict';
      ${functionBody};
    }).call(this);
  }`;

  // eslint-disable-next-line no-new-func
  const vm = new Function(code);
  const sandbox = proxySandbox(context, methods, options);
  const result = vm.call(sandbox);
  return result;
}
