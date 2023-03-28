import { JSONValue } from "util/jsonTypes";
import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { BoolControl } from "comps/controls/boolControl";
import { styleControl } from "comps/controls/styleControl";
import { ContainerStyle } from "comps/controls/styleControlConstants";
import { MultiCompBuilder, sameTypeMap, withDefault } from "comps/generators";
import { migrateOldData } from "comps/generators/simpleGenerators";
import { NameGenerator } from "comps/utils";
import { fromRecord, Node } from "openblocks-core";
import { nodeIsRecord } from "openblocks-core";
import _ from "lodash";
import { ReactNode } from "react";
import { lastValueIfEqual } from "util/objectUtils";
import {
  CompTree,
  fixOldStyleData,
  IContainer,
  mergeCompTrees,
  traverseCompTree,
} from "../containerBase";
import { SimpleContainerComp } from "../containerBase/simpleContainerComp";
import { ContainerBodyChildComp } from "./containerBodyChildComp";
import { trans } from "i18n";
import { ControlNode } from "openblocks-design";

const childrenMap = {
  header: SimpleContainerComp,
  // Support future tab or step container expansion
  body: withDefault(sameTypeMap(ContainerBodyChildComp), {
    0: { view: { layout: {}, items: {} } },
  }),
  footer: SimpleContainerComp,

  showHeader: BoolControl.DEFAULT_TRUE,
  showBody: BoolControl.DEFAULT_TRUE,
  showFooter: BoolControl,
  autoHeight: AutoHeightControl,

  style: styleControl(ContainerStyle),
};

// Compatible with old style data 2022-8-15
const TriContainerBaseComp = migrateOldData(
  new MultiCompBuilder(childrenMap, (props, dispatch) => {
    return { ...props, dispatch };
  }).build(),
  fixOldStyleData
);

export class TriContainerComp extends TriContainerBaseComp implements IContainer {
  private allContainers() {
    return [
      this.children.header,
      ...Object.values(this.children.body.getView()).map((c) => c.children.view),
      this.children.footer,
    ];
  }
  realSimpleContainer(key?: string): SimpleContainerComp | undefined {
    // FIXME: When the tab or step container supports header, footer, modify it to the current tab
    if (_.isNil(key)) return this.children.body.getView()["0"].children.view;
    return this.allContainers().find((container) => container.realSimpleContainer(key));
  }
  getCompTree(): CompTree {
    return mergeCompTrees(this.allContainers().map((c) => c.getCompTree()));
  }
  findContainer(key: string): IContainer | undefined {
    for (const container of this.allContainers()) {
      const foundContainer = container.findContainer(key);
      if (foundContainer) {
        return foundContainer === container ? this : foundContainer;
      }
    }
    return undefined;
  }
  getPasteValue(nameGenerator: NameGenerator): JSONValue {
    return {
      ...this.toJsonValue(),
      header: this.children.header.getPasteValue(nameGenerator),
      body: _.mapValues(this.children.body.getView(), (comp) => {
        return {
          ...comp.toJsonValue(),
          view: comp.children.view.getPasteValue(nameGenerator),
        };
      }),
      footer: this.children.footer.getPasteValue(nameGenerator),
    };
  }
  override autoHeight(): boolean {
    return this.children.autoHeight.getView();
  }

  exposingNode() {
    // The exposingNodes of the container subcomponents are put together
    const allNodes: Record<string, Node<unknown>> = {};
    traverseCompTree(this.getCompTree(), (item) => {
      const comp = item.children.comp;
      let node = comp.exposingNode();
      // plus formDataKey
      if (nodeIsRecord(node) && !node.children.hasOwnProperty("formDataKey")) {
        const formDataKey = comp.children["formDataKey"];
        if (formDataKey) {
          node = fromRecord({ ...node.children, formDataKey: formDataKey.exposingNode() });
        }
      }
      allNodes[item.children.name.getView()] = node;
      return true;
    });
    return lastValueIfEqual(this, "exposing_node", fromRecord(allNodes), checkEquals);
  }

  getPropertyView(): ControlNode {
    return [this.areaPropertyView(), this.heightPropertyView()];
  }

  areaPropertyView() {
    return [
      this.children.showHeader.propertyView({ label: trans("prop.showHeader") }),
      this.children.showBody.propertyView({ label: trans("prop.showBody") }),
      this.children.showFooter.propertyView({ label: trans("prop.showFooter") }),
    ];
  }

  heightPropertyView() {
    return this.children.autoHeight.getPropertyView();
  }

  stylePropertyView() {
    return this.children.style.getPropertyView();
  }
}

function checkEquals(node1: Node<unknown>, node2: Node<unknown>): boolean {
  if (node1 === node2) {
    return true;
  }
  if (node1 && node2 && nodeIsRecord(node1) && nodeIsRecord(node2)) {
    const a = node1.children;
    const b = node2.children;
    const keys = Object.keys(a);
    return (
      keys.length === Object.keys(b).length && keys.every((key) => checkEquals(a[key], b[key]))
    );
  }
  return false;
}
