import { EvalMethods } from "../types/evalTypes";
import log from "loglevel";

// global variables black list, forbidden to use
const blacklist = new Set<PropertyKey>([
  "top",
  "parent",
  "document",
  "location",
  "chrome",
  "setTimeout",
  "fetch",
  "setInterval",
  "clearInterval",
  "setImmediate",
  "XMLHttpRequest",
  "importScripts",
  "Navigator",
  "MutationObserver",
]);

const proxyTargetIdentity = Symbol("proxy_target_identity");

const globalVarNames = new Set<PropertyKey>(["window", "globalThis", "self", "global"]);

/**
 * return an immutable object.
 * @remarks
 * without Object.freeze() since it never throws a exception.
 *
 * FIXME: eliminate Proxy
 */
function immutable(value: any, methods?: Record<string, Function>): any {
  // the type of null is also object
  if (typeof value !== "object" || value === null) {
    return value;
  }
  if (value instanceof Date || value instanceof RegExp) {
    return value;
  }
  return new Proxy(value, {
    get(target, p, receiver) {
      if (p in target) {
        return Object.freeze(Reflect.get(target, p, receiver));
      }
      // here is a skill: get Proxy's original target with Symbol
      if (p === proxyTargetIdentity) {
        return target;
      }
      if (p === "toJSON") {
        return undefined;
      }
      if (typeof p === "string") {
        if (methods && p in methods) {
          return methods[p];
        }
        if (!Array.isArray(target)) {
          throw new ReferenceError(p + " not exist");
        }
      }
    },
    set(target, p, value) {
      if (typeof p === "string") {
        throw new Error(p + " can't be modified");
      }
      return false;
    },
    defineProperty(target, p, attributes) {
      if (typeof p === "string") {
        throw new Error("can't define property:" + p);
      }
      return false;
    },
    deleteProperty(target, p) {
      if (typeof p === "string") {
        throw new Error("can't delete property:" + p);
      }
      return false;
    },
    setPrototypeOf(target, v) {
      throw new Error("can't invoke setPrototypeOf");
    },
  });
}

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

function createMockWindow() {
  const win: any = new Proxy(
    {},
    {
      has() {
        return true;
      },
      set(target, p, newValue) {
        return Reflect.set(target, p, newValue);
      },
      get(target, p) {
        if (p in target) {
          return Reflect.get(target, p);
        }
        if (globalVarNames.has(p)) {
          return win;
        }
        if (typeof p === "string" && blacklist.has(p)) {
          log.log(`[Sandbox] access ${String(p)} on mock window, return mock object`);
          return createBlackHole();
        }
        const ret = Reflect.get(window, p);
        if (typeof ret === "function" && !ret.prototype) {
          return ret.bind(window);
        }
        // get DOM element by id, serializing may cause error
        if (isDomElement(ret)) {
          return undefined;
        }
        return ret;
      },
    }
  );
  return win;
}

let mockWindow: any = createMockWindow();

export function clearMockWindow() {
  mockWindow = createMockWindow();
}

interface SandBoxOption {
  /**
   * disable all limit, like running in host
   */
  disableLimit?: boolean;
}

function isDomElement(obj: any): boolean {
  return obj instanceof Element || obj instanceof HTMLCollection;
}

function proxySandbox(context: any, methods?: EvalMethods, options?: SandBoxOption) {
  const { disableLimit = false } = options || {};
  const isProtectedVar = (key: PropertyKey) => {
    return key in context || key in (methods || {}) || globalVarNames.has(key);
  };
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
        return disableLimit ? window : target;
      }

      if (p in context) {
        return immutable(
          Reflect.get(context, p, receiver),
          methods ? Reflect.get(methods, p) : undefined
        );
      }

      if (disableLimit) {
        return Reflect.get(window, p);
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
  options?: SandBoxOption
) {
  const code = `with(this){
    return (function() {
      'use strict';
      ${functionBody};
    }).call(this);
  }`;

  // eslint-disable-next-line no-new-func
  const vm = new Function(code);
  const sandbox = proxySandbox(context, methods, options);
  const result = vm.call(sandbox);

  // if the result is proxy, should return the original object, to avoid error
  if (result !== sandbox && typeof result === "object" && result !== null) {
    const target = result[proxyTargetIdentity];
    if (target !== undefined) {
      return target;
    }
  }
  return result;
}
