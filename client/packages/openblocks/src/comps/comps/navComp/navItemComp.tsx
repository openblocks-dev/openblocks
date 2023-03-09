import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { clickEvent, eventHandlerControl } from "comps/controls/eventHandlerControl";
import { list } from "comps/generators/list";
import { parseChildrenFromValueAndChildrenMap, ToViewReturn } from "comps/generators/multi";
import { withDefault } from "comps/generators/simpleGenerators";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import _ from "lodash";
import { fromRecord, MultiBaseComp, Node, RecordNode, RecordNodeToValue } from "openblocks-core";
import { ReactNode } from "react";

const events = [clickEvent];

const childrenMap = {
  label: StringControl,
  hidden: BoolCodeControl,
  active: BoolCodeControl,
  onEvent: withDefault(eventHandlerControl(events), [
    {
      // name: "click",
      name: "click",
      handler: {
        compType: "openAppPage",
      },
    },
  ]),
};

type ChildrenType = {
  label: InstanceType<typeof StringControl>;
  hidden: InstanceType<typeof BoolCodeControl>;
  active: InstanceType<typeof BoolCodeControl>;
  onEvent: InstanceType<ReturnType<typeof eventHandlerControl>>;
  items: InstanceType<ReturnType<typeof navListComp>>;
};

export class NavItemComp extends MultiBaseComp<ChildrenType> {
  override getView() {
    return _.mapValues(this.children, (c) => c.getView()) as ToViewReturn<ChildrenType>;
  }

  override getPropertyView(): ReactNode {
    return (
      <>
        {this.children.label.propertyView({ label: trans("label") })}
        {hiddenPropertyView(this.children)}
        {this.children.active.propertyView({ label: trans("navItemComp.active") })}
        {this.children.onEvent.propertyView({ inline: true })}
      </>
    );
  }

  override parseChildrenFromValue(params: any) {
    return parseChildrenFromValueAndChildrenMap(params, {
      ...childrenMap,
      items: navListComp(),
    }) as unknown as ChildrenType;
  }

  protected override ignoreChildDefaultValue() {
    return true;
  }

  addSubItem(value: any) {
    this.children.items.addItem(value);
  }

  exposingNode(): RecordNode<NavItemExposing> {
    return fromRecord({
      label: this.children.label.exposingNode(),
      hidden: this.children.hidden.exposingNode(),
      active: this.children.active.exposingNode(),
      items: this.children.items.exposingNode(),
    });
  }
}

type NavItemExposing = {
  label: Node<string>;
  hidden: Node<boolean>;
  active: Node<boolean>;
  items: Node<RecordNodeToValue<NavItemExposing>[]>;
};

export function navListComp() {
  const NavItemListCompBase = list(NavItemComp);

  return class NavItemListComp extends NavItemListCompBase {
    addItem(value?: any) {
      const data = this.getView();
      this.dispatch(
        this.pushAction(
          value || {
            label: trans("menuItem") + " " + (data.length + 1),
          }
        )
      );
    }

    deleteItem(index: number) {
      this.dispatch(this.deleteAction(index));
    }

    moveItem(from: number, to: number) {
      this.dispatch(this.arrayMoveAction(from, to));
    }
  };
}
