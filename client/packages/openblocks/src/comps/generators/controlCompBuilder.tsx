import { Comp, DispatchType } from "openblocks-core";
import { controlItem, ControlItemData, ControlNode } from "openblocks-design";
import { MultiCompBuilder } from "./multi";

// Build a comp with getPropertyView() returns ControlItem
export class ControlItemCompBuilder<
  ViewReturn,
  ChildrenCompMap extends Record<string, Comp>
> extends MultiCompBuilder<ViewReturn, ChildrenCompMap> {
  private data?: ControlItemData;

  setControlItemData(data: ControlItemData) {
    this.data = data;
    return this;
  }

  override build() {
    const data = this.data;
    if (!data) {
      throw new Error("miss data");
    }
    const temp = super.build();
    return class ControlItemComp extends temp {
      override getPropertyView() {
        return controlItem(data, super.getPropertyView() as JSX.Element);
      }
    };
  }
}

type ControlPropertyViewFn<ChildrenCompMap> = (
  children: ChildrenCompMap,
  dispatch: DispatchType
) => ControlNode;

// Build a comp with getPropertyView() returns ControlNode
export class ControlNodeCompBuilder<
  ViewReturn,
  ChildrenCompMap extends Record<string, Comp>
> extends MultiCompBuilder<ViewReturn, ChildrenCompMap> {
  private controlPropertyViewFn?: ControlPropertyViewFn<ChildrenCompMap>;

  override setPropertyViewFn(propertyViewFn: ControlPropertyViewFn<ChildrenCompMap>) {
    this.controlPropertyViewFn = propertyViewFn;
    return this;
  }

  override build() {
    const builder = this;
    const temp = super.build();
    return class ControlNodeComp extends temp {
      override getPropertyView() {
        return builder.controlPropertyViewFn?.(this.children, this.dispatch);
      }
    };
  }
}
