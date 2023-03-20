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
  wrapDispatch,
} from "openblocks-core";
import { ReactNode } from "react";
import { JSONValue } from "util/jsonTypes";
import { map } from "./map";
import { withParamsWithDefault } from "./withParams";

/**
 * provide a map-like withParams for table comp and list comp
 */
export function withParamsForMap<T extends MultiCompConstructor>(
  VariantCompCtor: T,
  paramNames: string[]
) {
  const paramValues = _.mapValues(
    _.keyBy(paramNames, (x) => x),
    () => ""
  );
  return withParamsForMapWithDefault(VariantCompCtor, paramValues);
}

export function withParamsForMapWithDefault<T extends MultiCompConstructor>(
  VariantCompCtor: T,
  defaultParamValues: Record<string, unknown>
) {
  const WithParamsCompCtor = withParamsWithDefault(VariantCompCtor, defaultParamValues);
  type ParamComp = ConstructorToComp<typeof WithParamsCompCtor>;
  const CHILD_KEY = "__comp__";

  const MapCtor = map(WithParamsCompCtor, false);
  const childrenMap = {
    [CHILD_KEY]: WithParamsCompCtor,
    __map__: MapCtor,
  };
  type ChildrenType = RecordConstructorToComp<typeof childrenMap>;
  type ViewReturn = ConstructorToView<typeof MapCtor>;

  type CompNodeValue = NodeToValue<ConstructorToNodeType<typeof WithParamsCompCtor>>;
  type NodeValue = {
    [CHILD_KEY]: CompNodeValue;
    __map__: Record<string, CompNodeValue>;
  };

  class WithParamsForMapComp
    extends MultiBaseComp<ChildrenType, JSONValue, Node<NodeValue>>
    implements Comp<ViewReturn>
  {
    override parseChildrenFromValue(params: CompParams): ChildrenType {
      const dispatch = params.dispatch ?? _.noop;
      const newParams = { ...params, dispatch: wrapDispatch(dispatch, CHILD_KEY) };

      const comp: ParamComp = new WithParamsCompCtor(newParams) as unknown as ParamComp;
      const mapComp = new MapCtor({ dispatch: wrapDispatch(dispatch, "__map__") });
      return { [CHILD_KEY]: comp, __map__: mapComp };
    }

    override toJsonValue(): JSONValue {
      return this.children[CHILD_KEY].toJsonValue();
    }

    override getView(): ViewReturn {
      return this.children.__map__.getView();
    }

    batchSet(paramValuesMap: Record<string, Record<string, unknown>>) {
      const mapComp = _.mapValues(paramValuesMap, (values, key) => {
        const comp = this.getOriginalComp().setParams(values);
        return comp;
      });
      const mapChild = this.children.__map__.reduce(MapCtor.batchSetCompAction(mapComp));
      return this.setChild("__map__", mapChild);
    }

    clear() {
      const mapChild = this.children.__map__.reduce(MapCtor.clearAction());
      return this.setChild("__map__", mapChild);
    }

    override getPropertyView(): ReactNode {
      return this.children[CHILD_KEY].getPropertyView();
    }

    propertyView(key: string): ReactNode {
      let comp = this.children[CHILD_KEY];
      const params = this.getView()[key]?.getParams();
      if (params) {
        comp = comp.setParams(params);
      }
      return comp.getPropertyView();
    }

    override reduce(action: CompAction): this {
      let newComp = super.reduce(action);
      newComp.getOriginalComp().node(); // for cache

      if (
        isChildAction(action) &&
        action.path[0] === CHILD_KEY &&
        action.type !== CompActionTypes.UPDATE_NODES_V2
      ) {
        const newMap = _.mapValues(this.getView(), (comp) => {
          return comp.reduce(WithParamsCompCtor.setCompAction(newComp.getOriginalComp().getComp()));
        });
        newComp = newComp.setChild(
          "__map__",
          this.children.__map__.reduce(MapCtor.batchSetCompAction(newMap))
        );
      }

      /*
      _.forEach(newComp.getView(), (comp, key) => {
        if (comp.getComp().node() !== newComp.getOriginalComp().getComp().node()) {
          console.info("node diff. key:", key, " action: ", action, " subComp: ", comp, " coreComp: ", newComp.getOriginalComp().getComp());
        }
      })
      */

      return newComp;
    }

    getOriginalComp() {
      return this.children[CHILD_KEY];
    }
  }

  return WithParamsForMapComp;
}
