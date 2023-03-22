import { TableRowSelection } from "antd/lib/table/interface";
import { dropdownControl } from "comps/controls/dropdownControl";
import { stateComp } from "comps/generators";
import { trans } from "i18n";
import { changeChildAction, ConstructorToComp } from "openblocks-core";
import { TableOnEventView } from "./tableTypes";
import { OB_ROW_ORI_INDEX, RecordType } from "comps/comps/tableComp/tableUtils";
import { ControlNodeCompBuilder } from "comps/generators/controlCompBuilder";

const modeOptions = [
  {
    label: trans("selectionControl.single"),
    value: "single",
  },
  {
    label: trans("selectionControl.multiple"),
    value: "multiple",
  },
  {
    label: trans("selectionControl.close"),
    value: "close",
  },
] as const;

/**
 * Currently use index as key
 */
function getKey(record: RecordType) {
  return record[OB_ROW_ORI_INDEX];
}

export function getSelectedRowKeys(
  selection: ConstructorToComp<typeof SelectionControl>
): Array<string> {
  const mode = selection.children.mode.getView();
  switch (mode) {
    case "single":
      return [selection.children.selectedRowKey.getView()];
    case "multiple":
      return selection.children.selectedRowKeys.getView();
  }
  return [];
}

export const SelectionControl = (function () {
  const childrenMap = {
    mode: dropdownControl(modeOptions, "single"),
    selectedRowKey: stateComp<string>("0"),
    selectedRowKeys: stateComp<Array<string>>([]),
  };
  return new ControlNodeCompBuilder(childrenMap, (props, dispatch) => {
    const changeSelectedRowKey = (record: RecordType) => {
      if (getKey(record) !== props.selectedRowKey) {
        dispatch(changeChildAction("selectedRowKey", getKey(record), false));
      }
    };
    return (onEvent: TableOnEventView) => {
      if (props.mode === "single" || props.mode === "close") {
        return {
          rowKey: getKey,
          rowClassName: (record: RecordType, index: number, indent: number) => {
            // Turn off row selection mode, only do visual shutdown, selectedRow still takes effect
            if (props.mode === "close") {
              return "";
            }
            return getKey(record) === props.selectedRowKey ? "ant-table-row-selected" : "";
          },
          onRow: (record: RecordType, index: number | undefined) => {
            return {
              onClick: () => {
                changeSelectedRowKey(record);
                onEvent("rowClick");
                if (getKey(record) !== props.selectedRowKey) {
                  onEvent("rowSelectChange");
                }
              },
            };
          },
        };
      }
      const result: TableRowSelection<any> = {
        type: "checkbox",
        selectedRowKeys: props.selectedRowKeys,
        preserveSelectedRowKeys: true,
        onChange: (selectedRowKeys) => {
          dispatch(changeChildAction("selectedRowKeys", selectedRowKeys, false));
          onEvent("rowSelectChange");
        },
        // click checkbox also trigger row click event
        onSelect: (record: RecordType) => {
          changeSelectedRowKey(record);
          onEvent("rowClick");
        },
      };
      return {
        rowKey: getKey,
        rowSelection: result,
        onRow: (record: RecordType) => {
          return {
            onClick: () => {
              changeSelectedRowKey(record);
              onEvent("rowClick");
            },
          };
        },
      };
    };
  })
    .setPropertyViewFn((children) =>
      children.mode.propertyView({
        label: trans("selectionControl.mode"),
        radioButton: true,
      })
    )
    .build();
})();
