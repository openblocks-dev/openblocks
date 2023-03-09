type Cache = {
  id: Symbol;
  args: any[];
  time: number;
  result?: { value: any };
};

function isEqualArgs(
  args: any[],
  cacheArgs?: any[],
  equals?: Array<(i1: any, i2: any) => boolean>
) {
  if (!cacheArgs) {
    return false;
  }
  if (args.length === 0 && cacheArgs.length === 0) {
    return true;
  }
  return (
    args.length === cacheArgs.length &&
    cacheArgs.every(
      (arg: any, index: number) => equals?.[index]?.(arg, args[index]) ?? arg === args[index]
    )
  );
}

function getCacheResult(
  thisObj: any,
  fnName: string,
  args: any[],
  equals?: Array<(i1: any, i2: any) => boolean>
) {
  const cache: Cache | undefined = thisObj?.__cache?.[fnName];
  if (cache && isEqualArgs(args, cache.args, equals)) {
    return cache.result;
  }
}

function cache(
  fn: (...args: any[]) => any,
  args: any[],
  thisObj: any,
  fnName: string,
  equals?: Array<(i1: any, i2: any) => boolean>
) {
  const result = getCacheResult(thisObj, fnName, args, equals);
  if (result) {
    return result.value;
  }
  const cache: Cache = {
    id: Symbol("id"),
    args: args,
    time: Date.now(),
  };
  if (!thisObj.__cache) {
    thisObj.__cache = {};
  }
  thisObj.__cache[fnName] = cache;
  const value = fn.apply(thisObj, args);
  cache.result = { value };
  return value;
}

export function memoized(equals?: Array<(i1: any, i2: any) => boolean>) {
  return function (target: any, fnName: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return cache(fn, args, this, fnName, equals);
    };
    return descriptor;
  };
}
