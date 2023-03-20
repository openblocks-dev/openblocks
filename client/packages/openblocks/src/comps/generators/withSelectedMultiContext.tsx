import _ from "lodash";
import {
  CompAction,
  customAction,
  isMyCustomAction,
  MultiCompConstructor,
  wrapChildAction,
  wrapDispatch,
} from "openblocks-core";
import { ReactNode } from "react";
import { lastValueIfEqual, setFieldsNoTypeCheck } from "util/objectUtils";
import { COMP_KEY, MAP_KEY, withMultiContext } from "./withMultiContext";
import { paramsEqual } from "./withParams";

const SELECTED_KEY = "SELECTED";

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

    protected override getComp(key: string) {
      let comp = super.getComp(key);
      if (!_.isNil(comp) && key === this.selection) {
        const dispatch = lastValueIfEqual(
          this,
          "selectedDispatch",
          [
            wrapDispatch(wrapDispatch(this.dispatch, MAP_KEY), SELECTED_KEY),
            this.dispatch,
          ] as const,
          (a, b) => a[1] === b[1]
        )[0];
        if (dispatch !== comp.dispatch) {
          comp = comp.changeDispatch(dispatch);
        }
      }
      return comp;
    }

    override getPropertyView(): ReactNode {
      return this.getSelectedComp().getPropertyView();
    }

    override reduce(action: CompAction): this {
      // console.info("enter withSelectedMultiContext reduce. action: ", action, "\nthis: ", this);
      let comp = this;
      if (isMyCustomAction<SetSelectionAction>(action, "setSelection")) {
        const { selection, params } = action.value;
        const selectedComp = this.getSelectedComp();
        // set selection
        if (selection !== this.selection) {
          comp = setFieldsNoTypeCheck(comp, { selection });
        }
        if (!_.isNil(params) && !paramsEqual(params, selectedComp.getParams())) {
          comp = comp.reduce(WithMultiContextComp.setCacheParamsAction({ [selection]: params }));
        }
        if (!_.isNil(comp.cacheParamsMap.get(selection))) {
          // sync params of selection and original comp
          comp = comp.setChild(
            COMP_KEY,
            comp.getOriginalComp().setParams(comp.cacheParamsMap.get(selection)!)
          );
        }
      } else if (!action.editDSL || action.path[0] !== MAP_KEY || _.isNil(action.path[1])) {
        if (action.path[0] === MAP_KEY && action.path[1] === SELECTED_KEY) {
          action.path[1] = this.selection;
        }
        comp = super.reduce(action);
      } else if (action.editDSL && action.path[1] === SELECTED_KEY) {
        // broadcast
        const newAction = {
          ...action,
          path: action.path.slice(2),
        };
        comp = comp.reduce(WithMultiContextComp.forEachAction(newAction));
        comp = comp.reduce(wrapChildAction(COMP_KEY, newAction));
      }

      // console.info("exit withSelectedMultiContext reduce. action: ", action, "\nthis:", this, "\ncomp:", comp);
      return comp;
    }

    getSelection() {
      return this.selection;
    }

    getSelectedComp() {
      return this.getComp(this.selection) ?? this.getOriginalComp();
    }

    static setSelectionAction(selection: string, params?: Record<string, unknown>) {
      return customAction<SetSelectionAction>(
        {
          type: "setSelection",
          selection,
          params,
        },
        false
      );
    }
  }

  return WithSelectedMultiContextComp;

  type SetSelectionAction = {
    type: "setSelection";
    selection: string;
    params?: Record<string, unknown>;
  };
}
