import { TableRowSelection } from "antd/lib/table/interface";
import { changeChildAction } from "openblocks-core";
import { dropdownControl } from "comps/controls/dropdownControl";
import { stateComp } from "comps/generators";
import { MultiCompBuilder } from "comps/generators/multi";
import { RecordType, TableOnEventView } from "./tableTypes";
import { trans } from "i18n";

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
  return record.index + "";
}

export const SelectionControl = (function () {
  const childrenMap = {
    mode: dropdownControl(modeOptions, "single"),
    selectedRowKey: stateComp<string>("0"),
    selectedRowKeys: stateComp<Array<string>>([]),
  };
  return new MultiCompBuilder(childrenMap, (props, dispatch) => {
    const changeSelectedRowKey = (record: RecordType) => {
      if (getKey(record) !== props.selectedRowKey) {
        dispatch(changeChildAction("selectedRowKey", getKey(record)));
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
          dispatch(changeChildAction("selectedRowKeys", selectedRowKeys));
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
    .setPropertyViewFn((children) => {
      return (
        <>
          {children.mode.propertyView({
            label: trans("selectionControl.mode"),
            radioButton: true,
          })}
        </>
      );
    })
    .build();
})();
