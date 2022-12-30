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
export function withParamsForMap<
  T extends MultiCompConstructor,
  ParamNames extends readonly string[]
>(VariantCompCtor: T, paramNames: ParamNames) {
  type ParamValues = Record<ParamNames[number], unknown>;
  const paramValues = _.mapValues(
    _.keyBy(paramNames, (x) => x),
    () => ""
  ) as ParamValues;
  return withParamsForMapWithDefault(VariantCompCtor, paramValues);
}

export function withParamsForMapWithDefault<
  T extends MultiCompConstructor,
  ParamValues extends Record<string, unknown>
>(VariantCompCtor: T, defaultParamValues: ParamValues) {
  const WithParamsCompCtor = withParamsWithDefault(VariantCompCtor, defaultParamValues);
  type ParamComp = ConstructorToComp<typeof WithParamsCompCtor>;
  const CHILD_KEY = "__comp__";

  const MapCtor = map(WithParamsCompCtor);
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

    batchSet(paramValuesMap: Record<string, ParamValues>) {
      const mapComp = _.mapValues(paramValuesMap, (values) =>
        this.children[CHILD_KEY].reduce(WithParamsCompCtor.changeParamDataAction(values))
      );
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
      const params = (this.children.__map__.children[key] as any)?.getParams();
      if (params) {
        comp = (comp as any).setParams(params);
      }
      return comp.getPropertyView();
    }

    override reduce(action: CompAction): this {
      let newComp = super.reduce(action);

      if (
        isChildAction(action) &&
        action.path[0] === CHILD_KEY &&
        action.type !== CompActionTypes.UPDATE_NODES_V2
      ) {
        const newMap = _.mapValues(this.children.__map__.children, (comp) => {
          return comp.reduce(WithParamsCompCtor.setCompAction(newComp.children.__comp__.getComp()));
        });
        newComp = newComp.setChild(
          "__map__",
          this.children.__map__.reduce(MapCtor.batchSetCompAction(newMap))
        );
      }

      return newComp;
    }

    getOriginalComp() {
      return this.children[CHILD_KEY];
    }
  }

  return WithParamsForMapComp;
}
