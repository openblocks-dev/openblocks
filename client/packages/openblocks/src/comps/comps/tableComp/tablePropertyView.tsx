import { newCustomColumn } from "comps/comps/tableComp/column/tableColumnComp";
import { hiddenPropertyView, loadingPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { MultiBaseComp } from "openblocks-core";
import {
  BluePlusIcon,
  CustomModal,
  labelCss,
  LinkButton,
  Option,
  RedButton,
  RefreshIcon,
  Section,
  sectionNames,
  TextLabel,
  ToolTipLabel,
} from "openblocks-design";
import { tableDataDivClassName } from "pages/tutorials/tutorialsConstant";
import styled from "styled-components";
import { getSelectedRowKeys } from "./selectionControl";
import { TableChildrenType } from "./tableTypes";

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

export function compTablePropertyView<T extends MultiBaseComp<TableChildrenType>>(comp: T) {
  const selection = getSelectedRowKeys(comp.children.selection)[0] ?? "0";
  const columns = comp.children.columns.getView();
  const rowExample = comp.children.dataRowExample.getView();
  const dynamicColumn = comp.children.dynamicColumn.getView();
  const columnOptionHeader = (
    <InsertDiv>
      <div style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
        <TextLabel label={trans("table.columnNum")} />
        <Graylabel>{"(" + columns.length + ")"}</Graylabel>
      </div>
      {rowExample && (
        <ToolTipLabel title={trans("table.refreshButtonTooltip")}>
          <StyledRefreshIcon
            onClick={() => {
              comp.children.columns.dispatchDataChanged({
                rowExample,
                doGeneColumn: true,
                dynamicColumn: dynamicColumn,
              });
              comp.children.dataRowExample.dispatchChangeValueAction(null);
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
      <Section name={trans("data")}>
        <div className={tableDataDivClassName}>
          {comp.children.data.propertyView({
            label: trans("data"),
          })}
        </div>
      </Section>
      <Section name={trans("prop.columns")}>
        <Option
          items={columns}
          optionHeader={columnOptionHeader}
          itemTitle={(column) => column.getView().title}
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
          hide={(column) => column.getView().hide}
          onHide={(column, hide) => column.children.hide.dispatchChangeValueAction(hide)}
          dataIndex={(column) => column.getView().dataIndex}
        />
        {comp.children.dynamicColumn.propertyView({ label: trans("table.dynamicColumn") })}
        {dynamicColumn &&
          comp.children.dynamicColumnConfig.propertyView({
            label: trans("table.dynamicColumnConfig"),
            tooltip: trans("table.dynamicColumnConfigDesc"),
          })}
      </Section>
      <Section name={sectionNames.layout}>{hiddenPropertyView(comp.children)}</Section>
      <Section name={trans("prop.rowSelection")}>
        {comp.children.selection.getPropertyView()}
      </Section>
      <Section name={trans("prop.toolbar")}> {comp.children.toolbar.getPropertyView()}</Section>
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
