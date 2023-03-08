import _ from "lodash";
import {
  Comp,
  CompAction,
  CompParams,
  ConstructorToComp,
  ConstructorToNodeType,
  ConstructorToView,
  customAction,
  deferAction,
  isChildAction,
  isMyCustomAction,
  MultiBaseComp,
  MultiCompConstructor,
  Node,
  NodeToValue,
  RecordConstructorToComp,
  unwrapChildAction,
  wrapChildAction,
  wrapDispatch,
} from "openblocks-core";
import { ReactNode } from "react";
import { JSONValue } from "util/jsonTypes";
import { setFieldsNoTypeCheck, shallowEqual } from "util/objectUtils";
import { map } from "./map";
import { withParamsWithDefault } from "./withParams";

export const VIRTUAL_NAME = "__virtual__";
export const COMP_KEY = "__comp__";
export const MAP_KEY = "__map__";

type ParamValues = Record<string, unknown>;

/**
 * Provide an upgraded withContext tool to generate multiple interactive comps or views.
 * Lazily store interactive comps only when there are actions dispatched on that comp.
 */
export function withMultiContext<TCtor extends MultiCompConstructor>(VariantCompCtor: TCtor) {
  const WithParamCompCtor = withParamsWithDefault(VariantCompCtor, {});
  type WithParamComp = ConstructorToComp<typeof WithParamCompCtor>;
  const MapCtor = map(WithParamCompCtor);
  const childrenMap = {
    [COMP_KEY]: WithParamCompCtor,
    /** only used when some keys have different status from the common comp */
    [MAP_KEY]: MapCtor,
  };
  type ChildrenType = RecordConstructorToComp<typeof childrenMap>;
  type ViewReturn = (params: ParamValues, key: string) => ConstructorToView<TCtor>;

  type CompNodeValue = NodeToValue<ConstructorToNodeType<typeof WithParamCompCtor>>;
  type NodeValue = {
    [COMP_KEY]: CompNodeValue;
    [MAP_KEY]: Record<string, CompNodeValue>;
  };

  class WithMultiContextComp
    extends MultiBaseComp<ChildrenType, JSONValue, Node<NodeValue>>
    implements Comp<ViewReturn>
  {
    private readonly cacheParamsMap: Record<string, ParamValues> = {};

    override parseChildrenFromValue(params: CompParams): ChildrenType {
      const dispatch = params.dispatch ?? _.noop;
      const newParams = { ...params, dispatch: wrapDispatch(dispatch, COMP_KEY) };

      const comp: WithParamComp = new WithParamCompCtor(newParams) as unknown as WithParamComp;
      const mapComp = new MapCtor({ dispatch: wrapDispatch(dispatch, MAP_KEY) });
      return { [COMP_KEY]: comp, [MAP_KEY]: mapComp };
    }

    override toJsonValue(): JSONValue {
      return this.children[COMP_KEY].toJsonValue();
    }

    /** return a function to generate view by params */
    override getView(): ViewReturn {
      // don't provide _key_ parameter if no storage no interaction needed
      return (params: ParamValues, key: string) => {
        this.cacheParamsMap[key] = params;
        return this.getComp(key)?.getView();
      };
    }

    /** interactive comps may be cached */
    getCachedComp(key: string) {
      const params = this.cacheParamsMap[key];
      if (_.isNil(params)) return undefined;
      const mapComps = this.getMap();
      if (mapComps.hasOwnProperty(key) && shallowEqual(params, mapComps[key].getParams())) {
        return mapComps[key];
      }
      return undefined;
    }

    protected getComp(key: string): WithParamComp | undefined {
      let comp = this.getCachedComp(key);
      const params = this.cacheParamsMap[key];
      if (_.isNil(comp) && !_.isNil(params)) {
        const mapComps = this.getMap();
        if (mapComps.hasOwnProperty(key) && !shallowEqual(params, mapComps[key].getParams())) {
          setTimeout(() =>
            // refresh the item, since params changed
            this.children[MAP_KEY].dispatch(deferAction(MapCtor.batchDeleteAction([key])))
          );
        }
        comp = this.getOriginalComp()
          .setParams(params)
          .changeDispatch(wrapDispatch(wrapDispatch(this.dispatch, VIRTUAL_NAME), key));
      }
      return comp;
    }

    override getPropertyView(): ReactNode {
      return this.getOriginalComp().getPropertyView();
    }

    override reduce(action: CompAction): this {
      let comp = this;
      const thisCompMap = this.getMap();
      if (isMyCustomAction<ClearAction>(action, "clear")) {
        comp = comp.setChild(MAP_KEY, comp.children[MAP_KEY].reduce(MapCtor.clearAction()));
        comp = setFieldsNoTypeCheck(comp, { cacheParamsMap: {} });
        return comp;
      }

      if (
        isChildAction(action) &&
        (action.path[0] === VIRTUAL_NAME ||
          (action.path[0] === MAP_KEY &&
            !_.isNil(action.path[1]) &&
            !thisCompMap.hasOwnProperty(action.path[1])))
      ) {
        /**
         * a virtual path is activated, should generate a new comp in __map__
         * a mapped path with a non-existed key can also be regarded as virtual path
         */
        const [key, childAction] = unwrapChildAction(unwrapChildAction(action)[1]);
        const params = comp.cacheParamsMap[key];
        if (params) {
          const childComp = comp
            .getOriginalComp()
            .setParams(params)
            .changeDispatch(wrapDispatch(wrapDispatch(this.dispatch, MAP_KEY), key));
          const newChildComp = childComp.reduce(childAction);
          if (childComp !== newChildComp) {
            const comps = { [key]: newChildComp };
            comp = comp.setChild(
              MAP_KEY,
              comp.children[MAP_KEY].reduce(MapCtor.batchSetCompAction(comps))
            );
          }
        }
      } else {
        comp = super.reduce(action);
      }
      comp.getOriginalComp().node(); // for cache

      // console.info("withMultiContext reduce. action: ", action, "\nthis:", this, "\ncomp:", comp);
      return comp;
    }

    getOriginalComp() {
      return this.children[COMP_KEY];
    }

    getMap() {
      return this.children[MAP_KEY].getView();
    }

    static clearAction() {
      return customAction<ClearAction>({
        type: "clear",
      });
    }

    static filterAction(keys: Array<string>) {
      return wrapChildAction(MAP_KEY, MapCtor.filterAction(keys));
    }
  }

  return WithMultiContextComp;

  type ClearAction = {
    type: "clear";
  };
}
