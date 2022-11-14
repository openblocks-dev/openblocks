import log from "loglevel";

export const CACHE_PREFIX = "__cache__";
/**
 * a decorator for caching function's result ignoring params.
 *
 * @remarks
 * caches are stored in `__cache__xxx` fields.
 * `ObjectUtils.setFields` will not save this cache.
 *
 */
export function memo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cachePropertyKey = CACHE_PREFIX + propertyKey;
  descriptor.value = function (...args: any[]) {
    const thisObj = this as any;
    if (!thisObj[cachePropertyKey]) {
      // put the result into array, for representing `undefined`
      thisObj[cachePropertyKey] = [originalMethod.apply(this, args)];
    }
    return thisObj[cachePropertyKey][0];
  };
}

/**
 * add for debug
 */
export const profilerCallback = (
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  if (actualDuration > 20) {
    log.warn(id, phase, actualDuration, baseDuration, startTime, commitTime);
  }
};
