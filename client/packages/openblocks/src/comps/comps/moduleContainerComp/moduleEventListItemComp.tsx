import { StringControl } from "comps/controls/codeControl";
import CompNameControl from "comps/controls/compNameControl";
import { MultiCompBuilder } from "comps/generators";
import { withExposingRaw } from "comps/generators/withExposing";
import { ModuleLayoutCompName } from "constants/compConstants";
import {
  fromRecord,
  fromValue,
  FunctionNode,
  Node,
  routeByNameAction,
  triggerModuleEventAction,
} from "openblocks-core";
import { lastValueIfEqual } from "util/objectUtils";

const childrenMap = {
  name: CompNameControl,
  description: StringControl,
};

const ModuleEventListItemCompBase = new MultiCompBuilder(childrenMap, (props) => props).build();

export const ModuleEventListItemComp = withExposingRaw(ModuleEventListItemCompBase, {}, (comp) => {
  const name = comp.children.name.getView();
  const node = fromRecord({
    trigger: new FunctionNode(fromValue(name), (n) => {
      return () => {
        comp.dispatch(routeByNameAction(ModuleLayoutCompName, triggerModuleEventAction(n)));
      };
    }),
  });
  return lastValueIfEqual<[string, Node<unknown>]>(
    comp,
    "module_event_trigger",
    [name, node],
    (a, b) => a[0] === b[0]
  )[1];
});
