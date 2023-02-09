import _ from "lodash";
import {
  Comp,
  CompAction,
  CompActionTypes,
  CompParams,
  ConstructorToComp,
  ConstructorToNodeType,
  ConstructorToView,
  isChildAction,
  MultiBaseComp,
  MultiCompConstructor,
  Node,
  NodeToValue,
  RecordConstructorToComp,
  unwrapChildAction,
  wrapDispatch,
} from "openblocks-core";
import { ReactNode } from "react";
import { JSONValue } from "util/jsonTypes";
import { shallowEqual } from "util/objectUtils";
import { map } from "./map";
import { withParamsWithDefault } from "./withParams";

export const VIRTUAL_NAME = "__virtual__";
export const CHILD_KEY = "__comp__";
export const MAP_KEY = "__map__";

/**
 * Provide an upgraded withContext tool to generate multiple interactive comps or views.
 * Lazily store interactive comps only when there are actions dispatched on that comp.
 */
export function withMultiContext<
  TCtor extends MultiCompConstructor,
  ParamNames extends readonly string[]
>(VariantCompCtor: TCtor, paramNames: ParamNames) {
  type ParamValues = Record<ParamNames[number], unknown>;
  const paramValues = _.mapValues(
    _.keyBy(paramNames, (x) => x),
    () => ""
  ) as ParamValues;
  return withMultiContextWithDefault(VariantCompCtor, paramValues);
}

export function withMultiContextWithDefault<
  TCtor extends MultiCompConstructor,
  ParamValues extends Record<string, unknown>
>(VariantCompCtor: TCtor, paramValues: ParamValues) {
  const WithParamCompCtor = withParamsWithDefault(VariantCompCtor, paramValues);
  type WithParamComp = ConstructorToComp<typeof WithParamCompCtor>;
  const MapCtor = map(WithParamCompCtor);
  const childrenMap = {
    [CHILD_KEY]: WithParamCompCtor,
    /** only used when some keys have different status from the common comp */
    [MAP_KEY]: MapCtor,
  };
  type ChildrenType = RecordConstructorToComp<typeof childrenMap>;
  type ViewReturn = (params: ParamValues, key?: string) => ConstructorToView<TCtor>;

  type CompNodeValue = NodeToValue<ConstructorToNodeType<typeof WithParamCompCtor>>;
  type NodeValue = {
    [CHILD_KEY]: CompNodeValue;
    [MAP_KEY]: Record<string, CompNodeValue>;
  };

  class WithMultiContextComp
    extends MultiBaseComp<ChildrenType, JSONValue, Node<NodeValue>>
    implements Comp<ViewReturn>
  {
    private readonly cacheParamsMap: Record<string, ParamValues> = {};

    override parseChildrenFromValue(params: CompParams): ChildrenType {
      const dispatch = params.dispatch ?? _.noop;
      const newParams = { ...params, dispatch: wrapDispatch(dispatch, CHILD_KEY) };

      const comp: WithParamComp = new WithParamCompCtor(newParams) as unknown as WithParamComp;
      const mapComp = new MapCtor({ dispatch: wrapDispatch(dispatch, MAP_KEY) });
      return { [CHILD_KEY]: comp, [MAP_KEY]: mapComp };
    }

    override toJsonValue(): JSONValue {
      return this.children[CHILD_KEY].toJsonValue();
    }

    /** return a function to generate view by params */
    override getView(): ViewReturn {
      // don't provide _key_ parameter if no storage no interaction needed
      return (params: ParamValues, key?: string) => {
        if (_.isNil(key)) return this.getOriginalComp().setParams(params).getView();
        this.cacheParamsMap[key] = params;
        const cachedComp = this.getCachedComp(key);
        // FIXME: delete the item in the map if cachedComp don't match
        if (cachedComp) {
          return cachedComp.getView();
        }
        return this.getOriginalComp()
          .setParams(params)
          .changeDispatch(wrapDispatch(wrapDispatch(this.dispatch, VIRTUAL_NAME), key))
          .getView();
      };
    }

    /** interactive comps may be cached */
    getCachedComp(key?: string) {
      if (_.isNil(key)) return undefined;
      const params = this.cacheParamsMap[key];
      const mapComps = this.children[MAP_KEY].getView();
      if (mapComps.hasOwnProperty(key) && shallowEqual(params, mapComps[key].getParams()))
        return mapComps[key];
      return undefined;
    }

    override getPropertyView(): ReactNode {
      return this.getOriginalComp().getPropertyView();
    }

    propertyView(key: string): ReactNode {
      const params = this.cacheParamsMap[key];
      if (_.isNil(params)) return this.getOriginalComp().getPropertyView();
      return this.getOriginalComp().setParams(params).getPropertyView();
    }

    override reduce(action: CompAction): this {
      // a virtual path is activated, should generate a new comp in __map__
      if (isChildAction(action) && action.path[0] === VIRTUAL_NAME) {
        const [key, childAction] = unwrapChildAction(unwrapChildAction(action)[1]);
        const params = this.cacheParamsMap[key];
        if (params) {
          const childComp = this.getOriginalComp().setParams(params).reduce(childAction);
          if (childComp) {
            const comps = { [key]: childComp };
            const newComp = this.setChild(
              MAP_KEY,
              this.children[MAP_KEY].reduce(MapCtor.batchSetCompAction(comps))
            );
            return newComp;
          }
        }
        return this;
      }
      let newComp = super.reduce(action);
      newComp.getOriginalComp().node(); // for cache

      if (
        isChildAction(action) &&
        action.path[0] === CHILD_KEY &&
        action.type !== CompActionTypes.UPDATE_NODES_V2
      ) {
        // when the original comp changes, all comps in __map__ should be cleared.
        newComp = newComp.setChild(MAP_KEY, this.children[MAP_KEY].reduce(MapCtor.clearAction()));
      }

      return newComp;
    }

    getOriginalComp() {
      return this.children[CHILD_KEY];
    }
  }

  return WithMultiContextComp;
}
