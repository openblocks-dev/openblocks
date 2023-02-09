import { sameTypeMap, valueComp } from "comps/generators";
import { MultiCompBuilder } from "comps/generators/multi";
import { GridItemComp } from "../gridItemComp";
import { IContainer, isContainer } from "./iContainer";
import { CompTree, getCompTree } from "./utils";
import { FlowLayout } from "layout/utils";
import _ from "lodash";
import log from "loglevel";

const children = {
  layout: valueComp<FlowLayout>([]),
  items: sameTypeMap(GridItemComp),
};

const SimpleFlowContainerTmpComp = new MultiCompBuilder(children, (props, dispatch) => {
  return {
    ...props,
    dispatch: dispatch,
  };
}).build();

export class SimpleFlowContainerComp extends SimpleFlowContainerTmpComp implements IContainer {
  private IsSimpleFlowContainer = true;

  getLayoutMap() {
    const layouts = this.children.layout.getView();
    return _.keyBy(layouts, "i");
  }

  getCompTree(): CompTree {
    const compMap = this.children.items.children;
    const layout = this.children.layout.getView();
    return {
      ...getCompTree(compMap),
      itemOrder: layout.map((l) => l.i),
    };
  }

  findContainer(key: string): IContainer | undefined {
    const compMap = this.children.items.children;
    if (compMap.hasOwnProperty(key)) {
      return this;
    }
    for (const childComp of Object.values(compMap)) {
      if (isContainer(childComp.children.comp)) {
        const childResult = childComp.children.comp?.findContainer?.(key);
        if (childResult) {
          return childResult;
        }
      }
    }
    return undefined;
  }

  realSimpleContainer(key?: string) {
    const compMap = this.children.items.children;
    if (_.isNil(key) || compMap.hasOwnProperty(key)) {
      return this;
    }
    return undefined;
  }

  getPasteValue() {
    log.warn("paste method not implemented.");
    return {};
  }
}
