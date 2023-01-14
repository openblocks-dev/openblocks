import {
  CellViewReturn,
  EditableCell,
  EditViewFn,
  TABLE_EDITABLE_SWITCH_ON,
} from "components/table/EditableCell";
import { stateComp } from "comps/generators";
import {
  MultiCompBuilder,
  PropertyViewFnTypeForComp,
  ToConstructor,
  ViewFnTypeForComp,
} from "comps/generators/multi";
import _ from "lodash";
import {
  CompConstructor,
  ConstructorToNodeType,
  fromRecord,
  NodeToValue,
  RecordConstructorToComp,
  withFunction,
} from "openblocks-core";
import { ReactNode } from "react";
import { JSONValue } from "util/jsonTypes";

export const __COLUMN_DISPLAY_VALUE_FN = "__COLUMN_DISPLAY_VALUE_FN";

type RecordConstructorToNodeValue<T> = {
  [K in keyof T]: NodeToValue<ConstructorToNodeType<T[K]>>;
};

type ViewValueFnType<ChildrenCtorMap extends Record<string, CompConstructor<unknown>>> = (
  nodeValue: RecordConstructorToNodeValue<ChildrenCtorMap>
) => JSONValue;

type NewChildrenCtorMap<ChildrenCtorMap, T extends JSONValue> = ChildrenCtorMap & {
  changeValue: ReturnType<typeof stateComp<T | null>>;
};

export type ColumnTypeViewFn<ChildrenCtroMap, T extends JSONValue, ViewReturn> = ViewFnTypeForComp<
  ViewReturn,
  RecordConstructorToComp<NewChildrenCtorMap<ChildrenCtroMap, T>>
>;

export class ColumnTypeCompBuilder<
  ChildrenCtorMap extends Record<string, CompConstructor<unknown>>,
  T extends JSONValue = JSONValue
> {
  private childrenMap: NewChildrenCtorMap<ChildrenCtorMap, T>;
  private propertyViewFn?: PropertyViewFnTypeForComp<
    RecordConstructorToComp<NewChildrenCtorMap<ChildrenCtorMap, T>>
  >;
  private editViewFn?: EditViewFn<T>;

  constructor(
    childrenMap: ChildrenCtorMap,
    private viewFn: ColumnTypeViewFn<ChildrenCtorMap, T, ReactNode>,
    private displayValueFn: ViewValueFnType<ChildrenCtorMap>,
    private baseValueFn?: ColumnTypeViewFn<ChildrenCtorMap, T, T>
  ) {
    this.childrenMap = { ...childrenMap, changeValue: stateComp<T | null>(null) };
  }

  setEditViewFn(editViewFn: NonNullable<typeof this.editViewFn>) {
    if (TABLE_EDITABLE_SWITCH_ON) {
      this.editViewFn = editViewFn;
    }
    return this;
  }

  setPropertyViewFn(
    propertyViewFn: PropertyViewFnTypeForComp<
      RecordConstructorToComp<NewChildrenCtorMap<ChildrenCtorMap, T>>
    >
  ) {
    this.propertyViewFn = propertyViewFn;
    return this;
  }

  build() {
    if (!this.propertyViewFn) {
      throw new Error("need property view fn");
    }
    const viewFn: ColumnTypeViewFn<ChildrenCtorMap, T, CellViewReturn> =
      (props, dispatch): CellViewReturn =>
      (cellProps) => {
        const baseValue = this.baseValueFn?.(props, dispatch);
        const normalView = this.viewFn(props, dispatch);
        return (
          <EditableCell<T>
            {...cellProps}
            normalView={normalView}
            dispatch={dispatch}
            baseValue={baseValue}
            changeValue={props.changeValue as any}
            editViewFn={this.editViewFn}
          />
        );
      };
    const ColumnTypeCompTmp = new MultiCompBuilder(
      this.childrenMap as ToConstructor<
        RecordConstructorToComp<NewChildrenCtorMap<ChildrenCtorMap, T>>
      >,
      viewFn
    )
      .setPropertyViewFn(this.propertyViewFn)
      .build();
    const displayValueFn = this.displayValueFn;
    const editViewFn = this.editViewFn;

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

      static canBeEditable() {
        return !_.isNil(editViewFn);
      }
    };
  }
}
