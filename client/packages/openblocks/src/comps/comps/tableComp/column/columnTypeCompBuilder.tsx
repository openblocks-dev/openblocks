import { Comp } from "openblocks-core";
import {
  MultiCompBuilder,
  PropertyViewFnTypeForComp,
  ToChildrenNodeValueType,
  ToConstructor,
  ViewFnTypeForComp,
} from "comps/generators/multi";
import React from "react";
import { fromRecord, withFunction } from "openblocks-core";
import { JSONValue } from "util/jsonTypes";

export const __COLUMN_DISPLAY_VALUE_FN = "__COLUMN_DISPLAY_VALUE_FN";

type ViewValueFnType<ChildrenCompMap extends Record<string, Comp<unknown>>> = (
  nodeValue: ToChildrenNodeValueType<ChildrenCompMap>
) => JSONValue;

export class ColumnTypeCompBuilder<
  ViewReturn,
  ChildrenCompMap extends Record<string, Comp<unknown>>
> {
  private childrenMap: ToConstructor<ChildrenCompMap>;
  private viewFn: ViewFnTypeForComp<ViewReturn, ChildrenCompMap>;
  private displayValueFn: ViewValueFnType<ChildrenCompMap>;
  private propertyViewFn?: PropertyViewFnTypeForComp<ChildrenCompMap>;

  constructor(
    childrenMap: ToConstructor<ChildrenCompMap>,
    viewFn: ViewFnTypeForComp<ViewReturn, ChildrenCompMap>,
    displayValueFn: ViewValueFnType<ChildrenCompMap>
  ) {
    this.childrenMap = childrenMap;
    this.viewFn = viewFn;
    this.displayValueFn = displayValueFn;
  }

  setPropertyViewFn(propertyViewFn: PropertyViewFnTypeForComp<ChildrenCompMap>) {
    this.propertyViewFn = propertyViewFn;
    return this;
  }

  build() {
    if (!this.propertyViewFn) {
      throw new Error("need property view fn");
    }
    const ColumnTypeCompTmp = new MultiCompBuilder(this.childrenMap, this.viewFn)
      .setPropertyViewFn(this.propertyViewFn)
      .build();
    const displayValueFn = this.displayValueFn;

    return class extends ColumnTypeCompTmp {
      // table cell data
      readonly displayValue: JSONValue = null;

      override extraNode() {
        return {
          node: {
            [__COLUMN_DISPLAY_VALUE_FN]: withFunction(
              fromRecord(this.childrenNode()),
              () => displayValueFn
            ),
          },
          updateNodeFields: (value: any) => {
            const displayValueFunc = value[__COLUMN_DISPLAY_VALUE_FN];
            return { displayValue: displayValueFunc(value) };
          },
        };
      }

      /**
       * Get the data actually displayed by the table cell
       */
      getDisplayValue() {
        return this.displayValue;
      }
    };
  }
}
