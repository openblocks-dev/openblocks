import { reduceInContext } from "comps/utils/reduceContext";
import _ from "lodash";
import {
  CompAction,
  CompActionTypes,
  customAction,
  isMyCustomAction,
  MultiCompConstructor,
} from "openblocks-core";
import { ReactNode } from "react";
import { depthEqual, setFieldsNoTypeCheck } from "util/objectUtils";
import { COMP_KEY, MAP_KEY, withMultiContext } from "./withMultiContext";

/**
 * Provide an upgraded withContext tool to generate multiple interactive comps or views.
 * Lazily store interactive comps only when there are actions dispatched on that comp.
 */
export function withSelectedMultiContext<TCtor extends MultiCompConstructor>(
  VariantCompCtor: TCtor
) {
  const WithMultiContextComp = withMultiContext(VariantCompCtor);

  class WithSelectedMultiContextComp extends WithMultiContextComp {
    private readonly selection: string = "0";

    override getPropertyView(): ReactNode {
      return this.getSelectedComp().getPropertyView();
    }

    override reduce(action: CompAction): this {
      let comp = this;
      const thisCompMap = this.getMap();
      if (isMyCustomAction<SetSelectionAction>(action, "setSelection")) {
        const { selection, params } = action.value;
        const selectedComp = this.getSelectedComp();
        if (
          selection === this.selection &&
          (_.isNil(params) || depthEqual(params, selectedComp.getParams(), 3))
        ) {
          return this;
        }
        if (!_.isNil(params)) {
          comp = comp.reduce(WithMultiContextComp.setCacheParamsAction({ [selection]: params }));
        }
        comp = setFieldsNoTypeCheck(comp, { selection });
        if (comp.cacheParamsMap.hasOwnProperty(selection)) {
          // sync params of selection and original comp
          comp = comp.setChild(
            COMP_KEY,
            comp.getOriginalComp().setParams(comp.cacheParamsMap[selection])
          );
        }
      } else {
        comp = super.reduce(action);
      }

      if (this.selection && this.selection === comp.selection) {
        const selection = this.selection;
        const newCompMap = comp.getMap();
        if (
          action.type !== CompActionTypes.UPDATE_NODES_V2 &&
          action.path[1] === selection &&
          thisCompMap[selection] !== newCompMap[selection]
        ) {
          // broadcast
          _.forEach(newCompMap, (subComp, key) => {
            if (key !== selection) {
              const newAction = {
                ...action,
                path: [MAP_KEY, key, ...action.path.slice(2)],
              };
              comp = reduceInContext({ disableUpdateState: true }, () => comp.reduce(newAction));
            }
          });
          // try set the original comp as 0-th comp
          const selectedComp = this.getSelectedComp();
          const tryOriginalComp = reduceInContext({ disableUpdateState: true }, () =>
            selectedComp.reduce({ ...action, path: action.path.slice(2) })
          );
          if (tryOriginalComp !== selectedComp) {
            comp = comp.setChild(
              COMP_KEY,
              tryOriginalComp.changeDispatch(comp.getOriginalComp().dispatch)
            );
          }
        }
      }
      // console.info("withMultiContext reduce. action: ", action, "\nthis:", this, "\ncomp:", comp);
      return comp;
    }

    getSelection() {
      return this.selection;
    }

    getSelectedComp() {
      return this.getComp(this.selection) ?? this.getOriginalComp();
    }

    static setSelectionAction(selection: string, params?: Record<string, unknown>) {
      return customAction<SetSelectionAction>({
        type: "setSelection",
        selection,
        params,
      });
    }
  }

  return WithSelectedMultiContextComp;

  type SetSelectionAction = {
    type: "setSelection";
    selection: string;
    params?: Record<string, unknown>;
  };
}
