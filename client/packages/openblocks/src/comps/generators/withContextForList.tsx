import _ from "lodash";
import { lastValueIfEqual } from "util/objectUtils";
import {
  Comp,
  CompAction,
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
import { withContextV2 } from "./withContextV2";

/**
 * provide a more robust withContext for list-like comps such as table and list
 * - each item can hold a seperate context instead of sharing a single context
 * - cache each context for seperating-use and re-use
 *
 * return a new CompConstructor named WithContextForListComp which stores the original comp in the "__comp__" child and stores the item contexts in the "__map__" child
 * use getView() to get the real item view by passing key and contextParams (if re-eval need)
 *
 */
export function withContextForList<
  ParamNames extends readonly string[],
  T extends MultiCompConstructor
>(VariantComp: T, paramNames: ParamNames) {
  type ContextDataType = Record<ParamNames[number], unknown>;

  const ContextCompCtor = withContextV2(VariantComp, paramNames);
  type ContextComp = ConstructorToComp<typeof ContextCompCtor>;
  const CHILD_KEY = "__comp__";

  const MapConstructor = map(ContextCompCtor);
  const childrenMap = {
    [CHILD_KEY]: ContextCompCtor,
    __map__: MapConstructor,
  };
  type ChildrenType = RecordConstructorToComp<typeof childrenMap>;
  type ViewReturn = (key: string, input?: ContextDataType) => ConstructorToView<T>;

  type CompNodeValue = NodeToValue<ConstructorToNodeType<typeof ContextCompCtor>>;
  type NodeValue = {
    [CHILD_KEY]: CompNodeValue;
    __map__: Record<string, CompNodeValue>;
  };

  class WithContextForListComp
    extends MultiBaseComp<ChildrenType, JSONValue, Node<NodeValue>>
    implements Comp<ViewReturn>
  {
    override parseChildrenFromValue(params: CompParams): ChildrenType {
      const dispatch = params.dispatch ?? _.noop;
      const newParams = { ...params, dispatch: wrapDispatch(dispatch, CHILD_KEY) };

      const comp: ContextComp = new ContextCompCtor(newParams) as unknown as ContextComp;
      const mapComp = new MapConstructor({ dispatch: wrapDispatch(dispatch, "__map__") });
      return { [CHILD_KEY]: comp, __map__: mapComp };
    }

    override toJsonValue(): JSONValue {
      return this.children[CHILD_KEY].toJsonValue();
    }

    override getView(): ViewReturn {
      return (key: string, input?: ContextDataType) => {
        const comp = this.getComp(key, input);
        return comp.getView();
      };
    }

    override getPropertyView(): ReactNode {
      return this.children[CHILD_KEY].getPropertyView();
    }

    override node() {
      return lastValueIfEqual(
        this,
        "node",
        [this.nodeWithoutCache(), this.children.__map__, this.children[CHILD_KEY]] as const,
        (a, b) => a[1] === b[1] && a[2] === b[2]
      )[0];
    }

    propertyView(key: string): ReactNode {
      const contextData = (this.children.__map__.children[key] as any)?.getContextData();
      if (contextData) {
        this.children[CHILD_KEY] = this.children[CHILD_KEY].reduce(
          ContextCompCtor.changeContextDataAction(contextData)
        );
      }
      return this.children[CHILD_KEY].getPropertyView();
    }

    override reduce(action: CompAction): this {
      let newComp = super.reduce(action);

      if (isChildAction(action) && action.path[0] === CHILD_KEY) {
        const newMap = _.mapValues(this.children.__map__.children, (comp) => {
          return comp.reduce(ContextCompCtor.setCompAction(newComp.children.__comp__));
        });
        newComp = newComp.setChild(
          "__map__",
          this.children.__map__.reduce(MapConstructor.batchSetCompAction(newMap))
        );
      }

      // log.debug("withContextX reduce. action: ", action, " this: ", this, " result: ", newComp);
      return newComp;
    }

    getOriginalComp() {
      return this.children[CHILD_KEY];
    }

    private getComp(key: string, input?: ContextDataType) {
      let map = this.children.__map__;
      let comp =
        map.children[key] ??
        this.children[CHILD_KEY].changeDispatch(wrapDispatch(map.dispatch, key));
      if (input) {
        comp = comp.reduce(ContextCompCtor.changeContextDataAction(input));
      }
      if (map.children[key] !== comp) {
        this.children.__map__ = map.setChild(key, comp);
      }
      return comp;
    }
  }

  return WithContextForListComp;
}
