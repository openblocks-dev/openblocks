import { CompConstructor, CompParams, DispatchType } from "openblocks-core";

/**
 * Hijack the dispatch method.
 * @param dispatchHook old dispatch
 * @return class with new dispatch
 */
export function withDispatchHook<T extends CompConstructor>(
  VariantComp: T,
  dispatchHook: (dispatch?: DispatchType) => DispatchType
): T {
  // @ts-ignore
  class TEMP_CLASS extends VariantComp {
    constructor(params: CompParams) {
      const newParams = { ...params, dispatch: dispatchHook(params.dispatch) };
      super(newParams);
    }
    override changeDispatch(dispatch: DispatchType): this {
      return super.changeDispatch(dispatchHook(dispatch));
    }
  }
  return TEMP_CLASS;
}
