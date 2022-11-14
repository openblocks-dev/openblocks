import { CompAction } from "openblocks-core";
import { DispatchType } from "openblocks-core";

export interface PromiseActionOptions {
  // auto handle after reduce if not handled
  autoHandleAfterReduce?: boolean;
  notHandledError?: string;
}

export interface PromiseParams extends PromiseActionOptions {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  setHandled: () => void;
  reduceWrapper: (reduceFn: () => void) => void;
}

const PROMISE_PARAMS_KEY = "__promise__params__";

export function getPromiseParams(action: CompAction): PromiseParams | undefined {
  return (action as any)[PROMISE_PARAMS_KEY];
}

function addPromiseParams(action: CompAction, promiseParams: PromiseParams) {
  const ret: any = Object.assign({}, action);
  ret[PROMISE_PARAMS_KEY] = promiseParams;
  return ret as CompAction;
}

function dispatchWithPromiseParams(
  dispatch: DispatchType,
  action: CompAction,
  resolve: (value?: unknown) => void,
  reject: (reason?: any) => void,
  options?: PromiseActionOptions
) {
  const { notHandledError, autoHandleAfterReduce } = options || {};
  let handled = false;
  dispatch(
    addPromiseParams(action, {
      resolve,
      reject,
      notHandledError,
      autoHandleAfterReduce,
      setHandled: () => {
        handled = true;
      },
      // pass the callback function by params, since dispatch is not executed immediately.
      reduceWrapper: (reduceFn: () => void) => {
        try {
          reduceFn();
          if (!handled) {
            if (autoHandleAfterReduce) {
              resolve();
              handled = true;
            } else {
              reject(notHandledError ?? "not handled");
            }
          }
        } catch (err) {
          reject(err);
        }
      },
    })
  );
}

// package the promise processing into reduce
export function wrapWithPromiseHandling(reduceFn: (action: CompAction) => void) {
  return (action: CompAction) => {
    const promiseParams = getPromiseParams(action);
    if (promiseParams) {
      promiseParams.reduceWrapper(() => reduceFn(action));
    } else {
      reduceFn(action);
    }
  };
}

export function getPromiseAfterDispatch(
  dispatch: DispatchType,
  action: CompAction,
  options?: PromiseActionOptions
) {
  return new Promise((resolve, reject) =>
    dispatchWithPromiseParams(dispatch, action, resolve, reject, options)
  );
}

export function getPromiseAfterExecuteDispatch(
  executor: (f: () => void) => void,
  dispatch: DispatchType,
  action: CompAction,
  options?: PromiseActionOptions
) {
  return new Promise((resolve, reject) =>
    executor(() => dispatchWithPromiseParams(dispatch, action, resolve, reject, options))
  );
}

// pass promiseParams when one action triggers another action
export function handlePromiseAndDispatch(
  action: CompAction,
  dispatch: DispatchType,
  newAction: CompAction
) {
  const promiseParams = getPromiseParams(action);
  if (promiseParams) {
    dispatchWithPromiseParams(dispatch, newAction, promiseParams.resolve, promiseParams.reject, {
      notHandledError: promiseParams.notHandledError,
      autoHandleAfterReduce: promiseParams.autoHandleAfterReduce,
    });
    promiseParams.setHandled();
  } else {
    dispatch(newAction);
  }
}

// resolve promise after action get the result
export function handlePromiseAfterResult(action: CompAction, result: any | Promise<any>) {
  const promiseParams = getPromiseParams(action);
  if (promiseParams) {
    Promise.resolve(result).then(promiseParams.resolve, promiseParams.reject);
    promiseParams.setHandled();
  }
}
