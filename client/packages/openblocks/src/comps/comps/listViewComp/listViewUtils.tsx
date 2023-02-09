import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { BoolControl } from "comps/controls/boolControl";
import { NumberControl, NumberOrJSONObjectArrayControl } from "comps/controls/codeControl";
import { styleControl } from "comps/controls/styleControl";
import { ListViewStyle } from "comps/controls/styleControlConstants";
import { withDefault } from "comps/generators";
import { withIsLoadingMethod } from "comps/generators/withIsLoading";
import { withMultiContextWithDefault } from "comps/generators/withMultiContext";
import { JSONObject } from "util/jsonTypes";
import { SimpleContainerComp } from "../containerBase/simpleContainerComp";

export const ContextContainerComp = withMultiContextWithDefault(SimpleContainerComp, {
  i: 0,
  currentItem: {} as JSONObject,
});

export const childrenMap = {
  noOfRows: withIsLoadingMethod(NumberOrJSONObjectArrayControl), // FIXME: migrate "noOfRows" to "data"
  dynamicHeight: AutoHeightControl,
  heightUnitOfRow: withDefault(NumberControl, 1),
  container: ContextContainerComp,
  autoHeight: AutoHeightControl,
  showBorder: BoolControl,
  style: styleControl(ListViewStyle),
};

export function getData(data: number | Array<JSONObject>): {
  data: Array<JSONObject>;
  noOfRows: number;
} {
  if (typeof data === "number") return { data: [], noOfRows: data };
  return { data, noOfRows: data.length };
}

export function getCurrentItemParams(data: Array<JSONObject>) {
  return data[0] ?? {};
}
