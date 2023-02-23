import { withParamsForMapWithDefault } from "comps/generators";
import { CHILD_KEY } from "comps/generators/withMultiContext";
import { reduceInContext } from "comps/utils/reduceContext";
import _ from "lodash";
import { CompAction, CompActionTypes, customAction, isMyCustomAction } from "openblocks-core";
import { JSONObject } from "util/jsonTypes";
import { SimpleContainerComp } from "../containerBase/simpleContainerComp";
import { getCurrentItemParams } from "./listViewUtils";

type Context = {
  itemIndexName: string;
  itemDataName: string;
  itemCount: number;
  data: Array<JSONObject>;
};

type ResetContextAction = {
  type: "resetContext";
  context: Context;
};

const ContextContainerTmpComp = withParamsForMapWithDefault(SimpleContainerComp, {});

export class ContextContainerComp extends ContextContainerTmpComp {
  override reduce(action: CompAction): this {
    let comp = this;
    if (isMyCustomAction<ResetContextAction>(action, "resetContext")) {
      const { itemIndexName, itemDataName, itemCount, data } = action.value.context;
      const paramsValueMap = _(_.range(0, itemCount))
        .toPairs()
        .fromPairs()
        .mapValues((idx) => ({
          [itemIndexName]: idx,
          [itemDataName]: getCurrentItemParams(data, idx),
        }))
        .value();
      comp = this.clear().batchSet(paramsValueMap);
    } else {
      comp = super.reduce(action);
    }
    const thisCompMap = this.getView();
    const newCompMap = comp.getView();
    const size = _.size(newCompMap);
    if (
      action.type !== CompActionTypes.UPDATE_NODES_V2 &&
      action.path[1] === "0" &&
      thisCompMap[0] !== newCompMap[0]
    ) {
      // broadcast
      _.range(1, size).forEach((idx) => {
        const newAction = {
          ...action,
          path: [action.path[0], String(idx), ...action.path.slice(2)],
        };
        comp = reduceInContext({ disableUpdateState: true }, () => comp.reduce(newAction));
      });
      // try set the original comp as 0-th comp
      const tryOriginalComp = reduceInContext({ disableUpdateState: true }, () =>
        thisCompMap[0].reduce({ ...action, path: action.path.slice(2) })
      );
      if (tryOriginalComp !== thisCompMap[0]) {
        comp = comp.setChild(
          CHILD_KEY,
          tryOriginalComp.changeDispatch(comp.getOriginalComp().dispatch)
        );
      }
    }
    return comp;
  }

  static resetContextAction(context: Context) {
    return customAction({
      type: "resetContext",
      context,
    });
  }
}
