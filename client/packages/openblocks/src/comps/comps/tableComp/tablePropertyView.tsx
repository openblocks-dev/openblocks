import {
  ColumnCompType,
  newCustomColumn,
  RawColumnType,
} from "comps/comps/tableComp/column/tableColumnComp";
import { hiddenPropertyView, loadingPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { changeValueAction, deferAction, MultiBaseComp, wrapChildAction } from "openblocks-core";
import {
  BluePlusIcon,
  CheckBox,
  CloseEyeIcon,
  controlItem,
  CustomModal,
  Dropdown,
  labelCss,
  LinkButton,
  OpenEyeIcon,
  Option,
  OptionItem,
  RedButton,
  RefreshIcon,
  Section,
  sectionNames,
  TextLabel,
  ToolTipLabel,
} from "openblocks-design";
import { tableDataDivClassName } from "pages/tutorials/tutorialsConstant";
import styled, { css } from "styled-components";
import { getSelectedRowKeys } from "./selectionControl";
import { TableChildrenType } from "./tableTypes";
import React, { useMemo, useState } from "react";
import { GreyTextColor } from "constants/style";
import { alignOptions } from "comps/controls/dropdownControl";
import { ColumnTypeCompMap } from "comps/comps/tableComp/column/columnTypeComp";

const InsertDiv = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 8px;
  align-items: center;
`;
const Graylabel = styled.span`
  ${labelCss};
  color: #8b8fa3;
`;

const StyledRefreshIcon = styled(RefreshIcon)`
  width: 16px;
  height: 16px;
  cursor: pointer;

  :hover {
    g g {
      stroke: #4965f2;
    }
  }
`;

const eyeIconCss = css`
  height: 16px;
  width: 16px;
  display: inline-block;

  :hover {
    cursor: pointer;
  }

  &:hover path {
    fill: #315efb;
  }
`;

const CloseEye = styled(CloseEyeIcon)`
  ${eyeIconCss}
`;
const OpenEye = styled(OpenEyeIcon)`
  ${eyeIconCss}
`;

const ColumnDropdown = styled(Dropdown)`
  width: 100px;

  &,
  > div {
    height: 22px;
  }

  .ant-segmented-item-label {
    height: 18px;
    min-height: 18px;
    line-height: 18px;
    padding: 0;
  }
`;

const ColumnBatchOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${GreyTextColor}
  line-height: 16px;
  font-size: 13px;
`;

const columnFilterOptions = [
  { label: trans("table.allColumn"), value: "all" },
  { label: trans("table.visibleColumn"), value: "visible" },
];
type ColumnFilterOptionValueType = typeof columnFilterOptions[number]["value"];

const columnBatchOptions = [
  {
    label: trans("prop.hide"),
    value: "hide",
  },
  {
    label: trans("table.editable"),
    value: "editable",
  },
  {
    label: trans("table.autoWidth"),
    value: "autoWidth",
  },
  {
    label: trans("table.sortable"),
    value: "sortable",
  },
  {
    label: trans("table.align"),
    value: "align",
  },
] as const;

type ColumnBatchOptionValueType = typeof columnBatchOptions[number]["value"];

function HideIcon(props: { hide: boolean; setHide: (hide: boolean) => void }) {
  const { hide, setHide } = props;
  const Eye = hide ? CloseEye : OpenEye;
  return (
    <Eye
      onClick={(e) => {
        setHide(!hide);
      }}
    />
  );
}

function columnBatchCheckBox<T extends keyof ColumnCompType["children"]>(
  childrenKey: T,
  convertValueFunc?: (checked: boolean) => RawColumnType[T]
) {
  const isChecked = (column: ColumnCompType) => {
    if (childrenKey === "autoWidth") {
      return column.children.autoWidth.getView() === "auto";
    } else {
      return column.children[childrenKey].getView();
    }
  };

  const convertValue = convertValueFunc ?? ((checked: boolean) => checked);

  return (column: Array<ColumnCompType> | ColumnCompType) => {
    const isBatch = Array.isArray(column);
    const columns = isBatch ? column : [column];
    const disabledStatus = columns.map((c) => {
      if (childrenKey !== "editable") {
        return false;
      }
      const columnType = c.children.render
        .getOriginalComp()
        .children.comp.children.compType.getView();
      return !ColumnTypeCompMap[columnType].canBeEditable();
    });
    let allChecked = true;
    let allNotChecked = true;
    columns.forEach((c, index) => {
      if (disabledStatus[index]) {
        if (!isBatch) {
          // The batch status is not affected by disabled
          allChecked = false;
        }
        return;
      }
      if (isChecked(c)) {
        allNotChecked = false;
      } else {
        allChecked = false;
      }
    });

    const onCheckChange = (checked: boolean) => {
      columns.forEach(
        (c, index) =>
          !disabledStatus[index] &&
          c.children[childrenKey].dispatch(
            deferAction(changeValueAction(convertValue(checked) as any, true))
          )
      );
    };

    if (childrenKey === "hide") {
      return <HideIcon hide={allChecked} setHide={(hide) => onCheckChange(hide)} />;
    }

    return (
      <CheckBox
        indeterminate={!allChecked && !allNotChecked}
        disabled={!isBatch && disabledStatus[0]}
        checked={allChecked}
        onChange={(e) => {
          onCheckChange(e.target.checked);
        }}
      />
    );
  };
}

const ColumnBatchView: Record<
  ColumnBatchOptionValueType,
  (column: ColumnCompType | Array<ColumnCompType>) => JSX.Element
> = {
  hide: columnBatchCheckBox("hide"),
  editable: columnBatchCheckBox("editable"),
  sortable: columnBatchCheckBox("sortable"),
  autoWidth: columnBatchCheckBox("autoWidth", (checked) => {
    return checked ? "auto" : "fixed";
  }),
  align: (column) => {
    const columns = Array.isArray(column) ? column : [column];
    const value = Array.isArray(column) ? undefined : column.children.align.getView();
    return (
      <ColumnDropdown
        options={alignOptions}
        value={value}
        radioButton={true}
        onChange={(value) => {
          columns.forEach((c) =>
            c.children.align.dispatch(deferAction(changeValueAction(value, true)))
          );
        }}
      />
    );
  },
};

function ColumnPropertyView<T extends MultiBaseComp<TableChildrenType>>(props: {
  comp: T;
  columnLabel: string;
}) {
  const { comp } = props;
  const selection = getSelectedRowKeys(comp.children.selection)[0] ?? "0";
  const [columnFilterType, setColumnFilterType] = useState<ColumnFilterOptionValueType>("all");
  const columns = comp.children.columns.getView();
  const rowExample = comp.children.dataRowExample.getView();
  const dynamicColumn = comp.children.dynamicColumn.getView();
  const data = comp.children.data.getView();
  const [columnBatchType, setColumnBatchType] = useState<ColumnBatchOptionValueType>("hide");
  const columnOptionItems = useMemo(
    () => columns.filter((c) => columnFilterType === "all" || !c.children.hide.getView()),
    [columnFilterType, columns]
  );

  const columnOptionToolbar = (
    <InsertDiv>
      <div style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
        <TextLabel label={props.columnLabel} />
        <Graylabel>{"(" + columns.length + ")"}</Graylabel>
      </div>
      {rowExample && (
        <ToolTipLabel title={trans("table.refreshButtonTooltip")}>
          <StyledRefreshIcon
            onClick={() => {
              const actions = [
                wrapChildAction(
                  "columns",
                  comp.children.columns.dataChangedAction({
                    rowExample,
                    doGeneColumn: true,
                    dynamicColumn: dynamicColumn,
                    data: data,
                  })
                ),
                comp.changeChildAction("dataRowExample", null),
              ];
              actions.forEach((action) => comp.dispatch(deferAction(action)));
            }}
          />
        </ToolTipLabel>
      )}
      <LinkButton
        icon={<BluePlusIcon />}
        text={trans("addItem")}
        onClick={() => {
          comp.children.columns.dispatch(comp.children.columns.pushAction(newCustomColumn()));
        }}
      />
    </InsertDiv>
  );

  return (
    <>
      <Option
        headerItem={
          <OptionItem
            title={
              <Dropdown
                border={true}
                style={{ width: "auto", marginLeft: "8px" }}
                value={columnFilterType}
                options={columnFilterOptions}
                label=""
                onChange={(value) => {
                  setColumnFilterType(value);
                }}
              />
            }
            config={{ dataIndex: "header" }}
            draggable={false}
            optionExtra={
              <ColumnBatchOptionWrapper>
                <Dropdown
                  border={true}
                  style={{ width: "auto" }}
                  value={columnBatchType}
                  options={columnBatchOptions}
                  label=""
                  onChange={(value) => {
                    setColumnBatchType(value);
                  }}
                />
                {ColumnBatchView[columnBatchType](columns)}
              </ColumnBatchOptionWrapper>
            }
          />
        }
        itemExtra={(column) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {ColumnBatchView[columnBatchType](column)}
            </div>
          );
        }}
        items={columnOptionItems}
        optionToolbar={columnOptionToolbar}
        itemTitle={(column) => {
          const columnView = column.getView();
          if (columnView.hide) {
            return <span style={{ color: GreyTextColor }}>{columnView.title}</span>;
          }
          return columnView.title;
        }}
        popoverTitle={(column) => {
          const columnView = column.getView();
          return columnView.isCustom ? trans("table.customColumn") : columnView.dataIndex;
        }}
        content={(column, index) => (
          <>
            {column.propertyView(selection)}
            {column.getView().isCustom && (
              <RedButton
                onClick={() => {
                  CustomModal.confirm({
                    title: trans("table.deleteColumn"),
                    content: trans("table.confirmDeleteColumn") + `${column.getView().title}?`,
                    onConfirm: () =>
                      comp.children.columns.dispatch(comp.children.columns.deleteAction(index)),
                    confirmBtnType: "delete",
                    okText: trans("delete"),
                  });
                }}
              >
                {trans("delete")}
              </RedButton>
            )}
          </>
        )}
        onAdd={() => {
          comp.children.columns.dispatch(comp.children.columns.pushAction(newCustomColumn()));
        }}
        onMove={(fromIndex, toIndex) => {
          const action = comp.children.columns.arrayMoveAction(fromIndex, toIndex);
          comp.children.columns.dispatch(action);
        }}
        dataIndex={(column) => column.getView().dataIndex}
      />
    </>
  );
}

function columnPropertyView<T extends MultiBaseComp<TableChildrenType>>(comp: T) {
  const columnLabel = trans("table.columnNum");
  const dynamicColumn = comp.children.dynamicColumn.getView();
  return [
    controlItem(
      { filterText: columnLabel },
      <ColumnPropertyView comp={comp} columnLabel={columnLabel} />
    ),
    comp.children.dynamicColumn.propertyView({ label: trans("table.dynamicColumn") }),
    dynamicColumn &&
      comp.children.dynamicColumnConfig.propertyView({
        label: trans("table.dynamicColumnConfig"),
        tooltip: trans("table.dynamicColumnConfigDesc"),
      }),
  ];
}

export function compTablePropertyView<T extends MultiBaseComp<TableChildrenType>>(comp: T) {
  const dataLabel = trans("data");
  return (
    <>
      <Section name={trans("data")}>
        {controlItem(
          { filterText: dataLabel },
          <div className={tableDataDivClassName}>
            {comp.children.data.propertyView({
              label: dataLabel,
            })}
          </div>
        )}
      </Section>
      <Section name={trans("prop.columns")}>{columnPropertyView(comp)}</Section>
      <Section name={sectionNames.layout}>
        {comp.children.expansion.getPropertyView()}
        {hiddenPropertyView(comp.children)}
      </Section>
      <Section name={trans("prop.rowSelection")}>
        {comp.children.selection.getPropertyView()}
      </Section>
      <Section name={trans("prop.toolbar")}>{comp.children.toolbar.getPropertyView()}</Section>
      <Section name={trans("prop.pagination")}>
        {comp.children.pagination.getPropertyView()}
      </Section>
      <Section name={sectionNames.interaction}>
        {comp.children.onEvent.getPropertyView()}
        {loadingPropertyView(comp.children)}
        {comp.children.showDataLoadSpinner.propertyView({
          label: trans("table.showDataLoadSpinner"),
        })}
        {comp.children.viewModeResizable.propertyView({
          label: trans("table.viewModeResizable"),
          tooltip: trans("table.viewModeResizableTooltip"),
        })}
      </Section>
      <Section name={sectionNames.style}>
        {comp.children.style.getPropertyView()}
        {comp.children.rowColor.getPropertyView()}
        {comp.children.size.propertyView({
          label: trans("table.tableSize"),
          radioButton: true,
        })}
        {comp.children.hideHeader.propertyView({
          label: trans("table.hideHeader"),
        })}
        {comp.children.hideBordered.propertyView({
          label: trans("table.hideBordered"),
        })}
      </Section>
    </>
  );
}
