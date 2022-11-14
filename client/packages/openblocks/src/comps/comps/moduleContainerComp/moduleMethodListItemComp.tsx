import { ActionSelectorControl } from "comps/controls/actionSelector/actionSelectorControl";
import CompNameControl from "comps/controls/compNameControl";
import { MultiCompBuilder } from "comps/generators";

const childrenMap = {
  name: CompNameControl,
  action: ActionSelectorControl,
};

const ModuleMethodListItemBase = new MultiCompBuilder(childrenMap, (props) => props).build();

export class ModuleMethodListItemComp extends ModuleMethodListItemBase {
  async execute() {
    const actionHandler = this.children.action.getView();
    if (!actionHandler) {
      return;
    }
    return actionHandler();
  }
}
