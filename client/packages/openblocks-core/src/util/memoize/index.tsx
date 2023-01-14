function getCache(obj: any, fnName: string) {
  return obj?.__cache?.[fnName];
}

function createCache(obj: any, fnName: string, args: any[]) {
  if (!obj.__cache) {
    obj.__cache = {};
  }
  if (!obj.__cache[fnName]) {
    obj.__cache[fnName] = {
      id: Symbol("id"),
      args: args,
      isInProgress: true,
      time: Date.now(),
    };
  }
  return getCache(obj, fnName);
}

function populate(fn: (...args: any[]) => any, args: any[] = [], thisObj: any, fnName: string) {
  const cache = createCache(thisObj, fnName, args);

  const value = fn.apply(thisObj, args);
  cache.isInProgress = false;
  cache.args = args;
  cache.time = Date.now();
  cache.value = value;
}

function read(thisObj: any, fnName: string) {
  const cache = getCache(thisObj, fnName);
  return cache && cache.value;
}

function isValid(
  args: any[] = [],
  thisObj: any,
  fnName: string,
  equals?: Array<(i1: any, i2: any) => boolean>
) {
  const cache = getCache(thisObj, fnName);
  if (!cache || !cache.args) return false;
  if (args.length === 0 && cache.args.length === 0) return true;
  return cache.args.reduce(
    (result: any, arg: any, index: number) =>
      result && (equals?.[index] ? equals[index](arg, args[index]) : arg === args[index]),
    true
  );
}

function isInProgress(thisObj: any, fnName: string) {
  const cache = getCache(thisObj, fnName);
  return cache && cache.isInProgress;
}

function cache(
  fn: (...args: any[]) => any,
  args: any[] = [],
  thisObj: any,
  fnName: string,
  equals?: Array<(i1: any, i2: any) => boolean>
) {
  if (!isValid(args, thisObj, fnName, equals) && !isInProgress(thisObj, fnName)) {
    populate(fn, args, thisObj, fnName);
  }
  return read(thisObj, fnName);
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
