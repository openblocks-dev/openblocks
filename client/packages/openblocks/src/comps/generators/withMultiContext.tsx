import _ from "lodash";
import {
  Comp,
  CompAction,
  CompParams,
  ConstructorToComp,
  ConstructorToNodeType,
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
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { map } from "./map";
import { paramsEqual, withParamsWithDefault } from "./withParams";

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
  const MapCtor = map(WithParamCompCtor, false);
  const childrenMap = {
    [COMP_KEY]: WithParamCompCtor,
    /** only used when some keys have different status from the common comp */
    [MAP_KEY]: MapCtor,
  };
  type ChildrenType = RecordConstructorToComp<typeof childrenMap>;
  type ViewReturn = (params: ParamValues, key: string) => ConstructorToComp<TCtor>;

  type CompNodeValue = NodeToValue<ConstructorToNodeType<typeof WithParamCompCtor>>;
  type NodeValue = {
    [COMP_KEY]: CompNodeValue;
    [MAP_KEY]: Record<string, CompNodeValue>;
  };

  class CacheParamsMap {
    private readonly cacheParamsMap: Record<string, ParamValues> = {};
    // private readonly changedKeys = new Set<string>();

    set(key: string, params: ParamValues) {
      if (!paramsEqual(this.cacheParamsMap[key], params)) {
        // console.info("withMultiContext CacheParamsMap set. key: ", key, "params: ", params);
        // this.changedKeys.add(key);
        this.cacheParamsMap[key] = params;
      }
    }

    get(key: string): ParamValues | undefined {
      return this.cacheParamsMap[key];
    }

    getMap() {
      return this.cacheParamsMap;
    }

    // popToDeleteKeys() {
    //   const keys = [...this.changedKeys];
    //   this.changedKeys.clear();
    //   return keys;
    // }
  }

  class WithMultiContextComp
    extends MultiBaseComp<ChildrenType, JSONValue, Node<NodeValue>>
    implements Comp<ViewReturn>
  {
    protected readonly cacheParamsMap = new CacheParamsMap(); // WARNING: this is designed to be not pure functional

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
        this.cacheParamsMap.set(key, params);
        return this.getComp(key)!.getComp();
      };
    }

    /** interactive comps may be cached */
    getCachedComp(key: string) {
      const params = this.cacheParamsMap.get(key);
      if (_.isNil(params)) return undefined;
      const mapComps = this.getMap();
      if (mapComps.hasOwnProperty(key) && paramsEqual(params, mapComps[key].getParams())) {
        return mapComps[key];
      }
      return undefined;
    }

    protected getComp(key: string): WithParamComp | undefined {
      let comp = this.getCachedComp(key);
      const params = this.cacheParamsMap.get(key);
      if (_.isNil(comp) && !_.isNil(params)) {
        const mapComps = this.getMap();
        if (mapComps.hasOwnProperty(key) && !paramsEqual(params, mapComps[key].getParams())) {
          // refresh the item, since params changed
          this.dispatch(deferAction(wrapChildAction(MAP_KEY, MapCtor.batchDeleteAction([key]))));
        }
        comp = this.getOriginalComp()
          .setParams(params)
          .changeDispatch(wrapDispatch(wrapDispatch(this.dispatch, MAP_KEY), key));
      }
      return comp;
    }

    override getPropertyView(): ReactNode {
      return this.getOriginalComp().getPropertyView();
    }

    override reduce(action: CompAction): this {
      let comp = this; //.tryDeleteKeys(Array.from(this.cacheParamsMap.popToDeleteKeys()));

      const thisCompMap = comp.getMap();
      if (isMyCustomAction<ClearAction>(action, "clear")) {
        comp = comp.setChild(MAP_KEY, comp.children[MAP_KEY].reduce(MapCtor.clearAction()));
        comp = setFieldsNoTypeCheck(comp, { cacheParamsMap: new CacheParamsMap() });
      } else if (isMyCustomAction<SetCacheParamsAction>(action, "setCacheParams")) {
        const { paramsMap } = action.value;
        const cacheParamsMap = _.cloneDeep(comp.cacheParamsMap);
        _.forEach(paramsMap, (params, key) => cacheParamsMap.set(key, params));

        if (!paramsEqual(cacheParamsMap.getMap(), comp.cacheParamsMap.getMap())) {
          comp = setFieldsNoTypeCheck(comp, { cacheParamsMap });
          comp = comp.tryDeleteKeys(Object.keys(paramsMap));
        }
        // comp = comp.tryDeleteKeys(comp.cacheParamsMap.popToDeleteKeys());
      } else if (
        isChildAction(action) &&
        action.path[0] === MAP_KEY &&
        !_.isNil(action.path[1]) &&
        !thisCompMap.hasOwnProperty(action.path[1])
      ) {
        /**
         * a virtual path is activated, should generate a new comp in __map__
         * a mapped path with a non-existed key can also be regarded as virtual path
         */
        const [key, childAction] = unwrapChildAction(unwrapChildAction(action)[1]);
        const params = comp.cacheParamsMap.get(key);
        if (params) {
          const childComp = comp
            .getOriginalComp()
            .setParams(params)
            .changeDispatch(wrapDispatch(wrapDispatch(comp.dispatch, MAP_KEY), key));
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

    tryDeleteKeys(keys: Array<string>): this {
      const mapComps = this.getMap();
      const toDeleteKeys = keys.filter(
        (key) =>
          mapComps.hasOwnProperty(key) &&
          !paramsEqual(mapComps[key].getParams(), this.cacheParamsMap.get(key))
      );
      let comp = this;
      if (!_.isEmpty(toDeleteKeys)) {
        comp = super.reduce(WithMultiContextComp.batchDeleteAction(toDeleteKeys));
      }
      return comp;
    }

    getCachedParams(key: string): ParamValues | undefined {
      return this.cacheParamsMap.get(key);
    }

    getOriginalComp() {
      return this.children[COMP_KEY];
    }

    getMap() {
      return this.children[MAP_KEY].getView();
    }

    static clearAction() {
      return customAction<ClearAction>(
        {
          type: "clear",
        },
        false
      );
    }

    static batchDeleteAction(keys: Array<string>) {
      return wrapChildAction(MAP_KEY, MapCtor.batchDeleteAction(keys));
    }

    static forEachAction(action: CompAction) {
      return wrapChildAction(MAP_KEY, MapCtor.forEachAction(action));
    }

    static setCacheParamsAction(paramsMap: Record<string, Record<string, unknown>>) {
      return customAction<SetCacheParamsAction>(
        {
          type: "setCacheParams",
          paramsMap,
        },
        false
      );
    }
  }

  return WithMultiContextComp;

  type ClearAction = {
    type: "clear";
  };

  type SetCacheParamsAction = {
    type: "setCacheParams";
    paramsMap: Record<string, Record<string, unknown>>;
  };
}
