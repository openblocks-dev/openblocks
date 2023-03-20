/**
 * The context mechanism is also required in the reduce method, but react cannot be used, so implement a simple version.
 * One scenario is that the query needs to know the applicationId of the current module.
 *
 * Context will break the simple nature of pure functions and complicate things, try to avoid using.
 */

type ReduceContext = {
  readOnly: boolean;
  applicationId: string;
  moduleDSL: Record<string, any>;
  parentApplicationPath: string[];
  /**
   * Whether in withContext.
   * currently eventSelectorControl depends on it.
   * list currently is using withContext.
   *
   * FIXME: After stabilization, let the table also use this method
   */
  inEventContext: boolean;
  withParamsContext: { params: Record<string, unknown> };
  disableUpdateState: boolean;
};
export type PartialReduceContext = Partial<ReduceContext>;
export type WithParamsContext = ReduceContext["withParamsContext"];

let context: ReduceContext = {
  readOnly: false,
  applicationId: "",
  moduleDSL: {},
  parentApplicationPath: [],
  inEventContext: false,
  withParamsContext: { params: {} },
  disableUpdateState: false,
};

export function getApplicationIdInReducer() {
  return context.applicationId;
}

export function getReduceContext(): ReduceContext {
  return context;
}

/**
 * Add context to reducer function
 * @param params parameters to be passed in
 * @param reduceFn reducer function, the execution of this function will get the above parameters
 */
export function reduceInContext<T>(params: PartialReduceContext, reduceFn: () => T): T {
  const oldContext = context;
  context = {
    ...context,
    ...params,
  };
  const result = reduceFn();
  context = oldContext;
  return result;
}
