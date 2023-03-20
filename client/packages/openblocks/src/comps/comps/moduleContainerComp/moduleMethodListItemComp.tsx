import { ActionSelectorControl } from "comps/controls/actionSelector/actionSelectorControl";
import CompNameControl from "comps/controls/compNameControl";
import { MultiCompBuilder } from "comps/generators";
import { withParams } from "comps/generators/withParams";
import { CompAction, customAction, isCustomAction } from "openblocks-core";
import { getPromiseAfterDispatch } from "util/promiseUtils";
import ModuleMethodParamListComp from "./moduleMethodParamListComp";

export const WithParamsActionControl = withParams(ActionSelectorControl, []);

const childrenMap = {
  name: CompNameControl,
  action: WithParamsActionControl,
  params: ModuleMethodParamListComp,
};

const ModuleMethodListItemBase = new MultiCompBuilder(childrenMap, (props) => props).build();

const ExecuteMethodActionType = "execute_module_method";

interface ExecuteMethodAction {
  type: typeof ExecuteMethodActionType;
}

export class ModuleMethodListItemComp extends ModuleMethodListItemBase {
  async execute(params: any[]) {
    const paramsMap: Record<string, any> = {};
    this.children.params.getView().forEach((param, idx) => {
      const defaultValue = param.children.defaultValue.getView();
      const paramName = param.children.name.getView();
      paramsMap[paramName] = params[idx] ?? defaultValue;
    });

    await getPromiseAfterDispatch(
      this.children.action.dispatch,
      WithParamsActionControl.setPartialParamDataAction(paramsMap),
      { autoHandleAfterReduce: true }
    );
    return getPromiseAfterDispatch(
      this.dispatch,
      customAction<ExecuteMethodAction>({ type: "execute_module_method" }, false),
      { autoHandleAfterReduce: true }
    );
  }

  realExecute() {
    const actionHandler = this.children.action.getView();
    if (!actionHandler) {
      return;
    }
    return actionHandler();
  }

  reduce(action: CompAction<any>): this {
    if (isCustomAction<ExecuteMethodAction>(action, ExecuteMethodActionType)) {
      this.realExecute();
      return this;
    }
    return super.reduce(action);
  }
}
