import _ from "lodash";
import log from "loglevel";
import { CACHE_PREFIX } from "./cacheUtils";

/**
 * return cached value if the result equals the last result.
 * This is to keep the reference not changed with the equal result.
 *
 * @param target the cache will be stored in the target
 * @param key the cache will be stored with the key
 * @param result this result
 * @param isEqual self-defined isEqual function
 * @returns result or the equal cached value
 */
export function lastValueIfEqual<T>(
  target: Record<string, any>,
  key: string,
  result: T,
  isEqual: (a: T, b: T) => boolean
): T {
  const cacheKey = "__lvif__" + key;
  if (target[cacheKey] && isEqual(target[cacheKey], result)) {
    return target[cacheKey];
  }
  target[cacheKey] = result;
  return result;
}

/**
 * return an executor to debounce or throttle
 * 1. the counter will be stored in the target
 * 2. the change of mode or delay will cause the debounce and throttle re-count
 *
 * @param target the object to store the cache
 * @param key the key of the cache
 * @param mode debounce or throttle
 * @param delay waiting time
 */
export function limitExecutor(
  target: any,
  key: string,
  mode: "debounce" | "throttle",
  delay?: number
) {
  return lastValueIfEqual(
    target,
    key,
    {
      delay: delay,
      mode: mode,
      func:
        mode === "throttle"
          ? _.throttle((x) => x(), delay, { trailing: false })
          : _.debounce((x) => x(), delay),
    },
    (a, b) => {
      return a.delay === b.delay && a.mode === b.mode;
    }
  ).func;
}

/**
 * compare keys and values
 */
export function shallowEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
  if (obj1 === obj2) {
    return true;
  }
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && obj1[key] === obj2[key])
  );
}

export function containAllFields(obj: Record<string, any>, fields?: Record<string, any>): boolean {
  if (fields === undefined) {
    return true;
  }
  const notEqualIndex = Object.keys(fields).findIndex((key) => {
    return obj[key] !== fields[key];
  });
  return notEqualIndex === -1;
}

/**
 * check equal with in depth
 * @param o1 Object1
 * @param o2 Object2
 * @param depth the with-in depth, the same as o1 === o2 when depth === 1, then same as _.isEqual(o1, o2) when depth === Infinity
 * @returns o1 equals o2 or not with in depth
 */
export function depthEqual(o1: any, o2: any, depth: number = Infinity): boolean {
  if (depth === 0) {
    return false;
  }
  if (o1 === o2) {
    return true;
  }
  if (!_.isObjectLike(o1) || !_.isObjectLike(o2)) {
    return false;
  }
  const size1 = _.size(o1),
    size2 = _.size(o2);
  if (size1 !== size2) {
    return false;
  }
  return _.every(o1, (v1, key) => depthEqual(v1, o2[key], depth - 1));
}

/**
 * return a new object based on obj added with fields.
 *
 * @remarks
 * The implementation directly copy the original object without calling the constructor.
 * If the original object has some function with `bind`, there will be a bug.
 *
 * Typescript now only supports public fields from the second parameter
 * https://stackoverflow.com/questions/57066049/list-private-property-names-of-the-class
 */
export function setFields<T>(obj: T, fields: Partial<T>) {
  return setFieldsNoTypeCheck(obj, fields);
}

/**
 * type unsafe, users should keep safe by self.
 * pros: this function can support private fields.
 */
export function setFieldsNoTypeCheck<T>(
  obj: T,
  fields: Record<string, any>,
  params?: { keepCacheKeys?: string[] }
) {
  const res = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
  Object.keys(res).forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      const propertyKey = key.slice(CACHE_PREFIX.length);
      if (!params?.keepCacheKeys || !params?.keepCacheKeys.includes(propertyKey)) {
        delete res[key];
      }
    }
  });
  return Object.assign(res, fields) as T;
}

const TYPES: Record<string, string> = {
  Number: "number",
  Boolean: "boolean",
  String: "string",
  Object: "object",
};

/**
 * get type of object
 */
export function toType(obj: unknown): string {
  let type: string = ({} as any).toString.call(obj).match(/\s([a-zA-Z]+)/)[1];
  if (TYPES.hasOwnProperty(type)) {
    type = TYPES[type];
  }
  return type;
}

export function safeJSONStringify(obj: any): string {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    log.error(e);
    return "";
  }
}

const find = (item: any, key: string): any => {
  if (item.key === key) {
    return item;
  }
  let v;
  if (item.children.length) {
    for (const child of item.children) {
      v = find(child, key);
      if (v) {
        return v;
      }
    }
  }
  return null;
};

export function getTreeNodeByKey(tree: any, key: string): any {
  let v;
  for (const node of tree) {
    v = find(node, key);
    if (v) {
      return v;
    }
  }
  return null;
}

const findParent = (item: any, key: string, result: string[]): boolean => {
  if (item.key === key) {
    return true;
  }
  let v;
  if (item.children.length) {
    for (const child of item.children) {
      v = findParent(child, key, result);
      if (v) {
        result.push(item.key);
        return true;
      }
    }
  }
  return false;
};

export function getParentNodeKeysByKey(tree: any, key: string): string[] {
  let v;
  const result: string[] = [];
  for (const node of tree) {
    v = findParent(node, key, result);
    if (v) {
      return result;
    }
  }
  return result;
}

export const getObjectId = (function () {
  let objectCurrentId = 0;
  const objectMap = new WeakMap();
  return (obj: object | undefined) => {
    if (_.isNil(obj)) return 0;
    if (objectMap.has(obj)) {
      return objectMap.get(obj);
    }
    const id = ++objectCurrentId;
    objectMap.set(obj, id);
    return id;
  };
})();
