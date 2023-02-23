import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { BoolControl } from "comps/controls/boolControl";
import {
  NumberControl,
  NumberOrJSONObjectArrayControl,
  StringControl,
} from "comps/controls/codeControl";
import { styleControl } from "comps/controls/styleControl";
import { ListViewStyle } from "comps/controls/styleControlConstants";
import { withDefault } from "comps/generators";
import { withIsLoadingMethod } from "comps/generators/withIsLoading";
import { CHILD_KEY, withMultiContextWithDefault } from "comps/generators/withMultiContext";
import { reduceInContext } from "comps/utils/reduceContext";
import { CompAction } from "openblocks-core";
import { JSONObject } from "util/jsonTypes";
import { SimpleContainerComp } from "../containerBase/simpleContainerComp";

export const EMPTY_OBJECT = {};
export type ListCompType = "listView" | "grid";

const ContextContainerTmpComp = withMultiContextWithDefault(SimpleContainerComp, {});

export class ContextContainerComp extends ContextContainerTmpComp {
  override reduce(action: CompAction): this {
    let comp = super.reduce(action);
    if (action.path[1] === "0") {
      const mirrorAction = {
        ...action,
        path: [CHILD_KEY, ...action.path.slice(2)],
      };
      comp = reduceInContext({ disableUpdateState: true }, () => comp.reduce(mirrorAction));
    }
    return comp;
  }
}

export const childrenMap = {
  noOfRows: withIsLoadingMethod(NumberOrJSONObjectArrayControl), // FIXME: migrate "noOfRows" to "data"
  noOfColumns: withDefault(NumberControl, 1),
  itemIndexName: withDefault(StringControl, "i"),
  itemDataName: withDefault(StringControl, "currentItem"),
  dynamicHeight: AutoHeightControl,
  heightUnitOfRow: withDefault(NumberControl, 1),
  container: ContextContainerComp,
  autoHeight: AutoHeightControl,
  showBorder: BoolControl,
  style: styleControl(ListViewStyle),
};

export function getData(data: number | Array<JSONObject>): {
  data: Array<JSONObject>;
  itemCount: number;
} {
  if (typeof data === "number") return { data: [], itemCount: data };
  return { data, itemCount: data.length };
}

export function getCurrentItemParams(data: Array<JSONObject>, idx?: number) {
  return data[idx ?? 0] ?? EMPTY_OBJECT;
}

export function genKey(i: number) {
  return String(i);
}
