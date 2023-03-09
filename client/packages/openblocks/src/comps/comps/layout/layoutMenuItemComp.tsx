import { MultiBaseComp } from "openblocks-core";
import { BoolPureControl } from "comps/controls/boolControl";
import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { keyValueListControl } from "comps/controls/keyValueControl";
import { withDefault } from "comps/generators";
import { list } from "comps/generators/list";
import {
  parseChildrenFromValueAndChildrenMap,
  ToInstanceType,
  ToViewReturn,
} from "comps/generators/multi";
import { genRandomKey } from "comps/utils/idGenerator";
import { BranchDiv, Treediv } from "openblocks-design";
import _ from "lodash";
import { ReactNode } from "react";
import { IconControl } from "comps/controls/iconControl";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { AppSelectComp } from "comps/comps/layout/appSelectComp";

const QueryHashList = withDefault(keyValueListControl(false, [], "string"), [
  { key: "", value: "" },
]);

const childrenMap = {
  label: StringControl,
  hidden: BoolCodeControl,
  app: AppSelectComp,
  icon: IconControl,
  hideWhenNoPermission: withDefault(BoolPureControl, true),
  queryParam: QueryHashList,
  hashParam: QueryHashList,
};

type ChildrenType = ToInstanceType<typeof childrenMap> & {
  items: InstanceType<typeof LayoutMenuItemListComp>;
};

/**
 * copy from navItemComp,
 * FIXME: refactor it more general
 */
export class LayoutMenuItemComp extends MultiBaseComp<ChildrenType> {
  private itemKey?: string;

  override getView() {
    return _.mapValues(this.children, (c) => c.getView()) as ToViewReturn<ChildrenType>;
  }

  override getPropertyView(): ReactNode {
    const isLeaf = this.children.items.getView().length === 0;
    return (
      <>
        {isLeaf &&
          this.children.app.propertyView({
            onChange: (label) => {
              label && this.children.label.dispatchChangeValueAction(label);
            },
          })}
        {this.children.label.propertyView({ label: trans("label") })}
        {this.children.icon.propertyView({
          label: trans("icon"),
          tooltip: trans("aggregation.iconTooltip"),
        })}
        {hiddenPropertyView(this.children)}
        {isLeaf &&
          this.children.hideWhenNoPermission.propertyView({
            label: trans("aggregation.hideWhenNoPermission"),
          })}
        {isLeaf && (
          <Treediv>
            <BranchDiv>
              {this.children.queryParam.propertyView({
                label: trans("aggregation.queryParam"),
                layout: "vertical",
              })}
            </BranchDiv>
            <BranchDiv>
              {this.children.hashParam.propertyView({
                label: trans("aggregation.hashParam"),
                layout: "vertical",
              })}
            </BranchDiv>
          </Treediv>
        )}
      </>
    );
  }

  override parseChildrenFromValue(params: any) {
    return parseChildrenFromValueAndChildrenMap(params, {
      ...childrenMap,
      items: LayoutMenuItemListComp,
    }) as unknown as ChildrenType;
  }

  protected override ignoreChildDefaultValue() {
    return true;
  }

  addSubItem(value: any) {
    this.children.items.addItem(value);
  }

  getItemKey() {
    if (!this.itemKey) {
      this.itemKey = genRandomKey();
    }
    return this.itemKey;
  }
}

export class LayoutMenuItemListComp extends list(LayoutMenuItemComp) {
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
}
