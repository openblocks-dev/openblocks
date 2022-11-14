import { routeByNameAction, executeQueryAction } from "openblocks-core";
import { CompAction, CompActionTypes, RouteByNameAction } from "openblocks-core";
import { CompParams } from "openblocks-core";
import { codeControl } from "comps/controls/codeControl";
import QuerySelectControl from "comps/controls/querySelectControl";
import { MultiCompBuilder, parseChildrenFromValueAndChildrenMap } from "comps/generators/multi";
import { Node } from "openblocks-core";
import { Fragment, ReactNode } from "react";
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { inputControls, InputTypeEnum } from "../moduleContainerComp/ioComp/inputListItemComp";

interface InputItem {
  name: string;
  type: InputTypeEnum;
  description: string;
}

const ModuleEventsCompBase = new MultiCompBuilder({}, (props) => props).build();

export default class ModuleEventsComp extends ModuleEventsCompBase {
  params: any = {};
  inputs: InputItem[] = [];

  constructor(params: CompParams<any>) {
    super(params);
    this.params = params;
  }

  getView() {
    return this.children;
  }

  getPropertyView(): ReactNode {
    if (this.inputs.length === 0) {
      return null;
    }
    return this.inputs.map(({ name, description }) => {
      const child = this.children[name];
      if (!child) {
        return null;
      }
      return (
        <Fragment key={name}>
          {(child as any).propertyView({ label: name, tooltip: description, layout: "vertical" })}
        </Fragment>
      );
    });
  }

  setInputs(inputs: InputItem[]) {
    const childrenMap: any = {};
    inputs.forEach(({ name, type }) => {
      if (inputControls[type]) {
        childrenMap[name] = inputControls[type];
      }
    });
    const children = parseChildrenFromValueAndChildrenMap(this.params, childrenMap);
    return setFieldsNoTypeCheck(this, {
      children,
      inputs,
    });
  }

  getInputNodes() {
    const ret: Record<string, Node<unknown> | string> = {};
    this.inputs.forEach(({ name, type }) => {
      const child = this.children[name as InputTypeEnum];
      if (!child) {
        return;
      }
      if (type === InputTypeEnum.Query) {
        const queryName = (child as QuerySelectControl).children.value.getView();
        if (!queryName) {
          return;
        }
        ret[name] = queryName;
        return;
      }
      if ((child as InstanceType<ReturnType<typeof codeControl>>).unevaledValue) {
        const node = child.node();
        if (node) {
          ret[name] = node;
        }
      }
    });
    return ret;
  }

  getInputQueryExecAction(action: CompAction): RouteByNameAction | null {
    if (
      action.type !== CompActionTypes.ROUTE_BY_NAME ||
      action.action.type !== CompActionTypes.EXECUTE_QUERY
    ) {
      return null;
    }

    // check if is query
    const moduleInputQueryName = action.name;
    const isQueryExecAction = this.inputs.some(({ name, type }) => {
      return moduleInputQueryName === name && type === InputTypeEnum.Query;
    });
    if (!isQueryExecAction) {
      return null;
    }

    // find real query name
    const hostQueryInput = Object.entries(this.children as any).find(([name]) => {
      return name === moduleInputQueryName;
    })?.[1] as QuerySelectControl;
    if (!hostQueryInput) {
      return null;
    }
    return routeByNameAction(hostQueryInput.getView().value, executeQueryAction(action.action));
  }
}
