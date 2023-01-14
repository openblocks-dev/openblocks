import log from "loglevel";
import _ from "lodash";

const window = { _ } as any;

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

const globalVarNames = new Set<PropertyKey>(["window", "globalThis", "self"]);

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
  return new Proxy(
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
        if (typeof p === "string" && blacklist.has(p)) {
          log.log(`[Sandbox] access ${String(p)} on mock window, return mock object`);
          return createBlackHole();
        }
        const ret = Reflect.get(window, p);
        if (typeof ret === "function" && !ret.prototype) {
          return ret.bind(window);
        }
        // get DOM element by id, serializing may cause error
        //if (isDomElement(ret)) {
        //  return undefined;
        //}
        return ret;
      },
    }
  );
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

function proxySandbox(context: any, options?: SandBoxOption) {
  const { disableLimit = false } = options || {};
  const isProtectedVar = (key: PropertyKey) => {
    return key in context || globalVarNames.has(key);
  };
  const cache = {};
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
        if (p in cache) {
          return Reflect.get(cache, p);
        }
        let value = Reflect.get(context, p, receiver);
        if (typeof value === "object" && value !== null) {
          Object.freeze(value);
          Object.values(value).forEach(Object.freeze);
        }
        Reflect.set(cache, p, value);
        return value;
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

export function getErrorMessage(err: unknown) {
  const errorMesasge =
    err instanceof Error
      ? err.name + ": " + err.message
      : typeof err === "string"
      ? err
      : "UnknownError: unknown exception during eval";
  return errorMesasge;
}

export async function evalFunc(functionBody: string, context: any, options?: SandBoxOption) {
  const code = `with(this){
    return (async function() {
      'use strict';
      ${functionBody};
    }).call(this);
  }`;

  // eslint-disable-next-line no-new-func
  const vm = new Function(code);
  const sandbox = proxySandbox(context, options);
  const result = await vm.call(sandbox);
  return result;
}
