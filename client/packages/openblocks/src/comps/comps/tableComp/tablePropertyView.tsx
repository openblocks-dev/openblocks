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
import styled from "styled-components";
import { newCustomColumn } from "comps/comps/tableComp/column/tableColumnComp";
import { TableChildrenType } from "./tableTypes";
import { tableDataDivClassName } from "pages/tutorials/tutorialsConstant";
import { hiddenPropertyView, loadingPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";

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

export function tablePropertyView(children: TableChildrenType) {
  const columns = children.columns.getView();
  const rowExample = children.dataRowExample.getView();
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
              children.columns.dispatchDataChanged(rowExample, true);
              children.dataRowExample.dispatchChangeValueAction(null);
            }}
          />
        </ToolTipLabel>
      )}
      <LinkButton
        icon={<BluePlusIcon />}
        text={trans("addItem")}
        onClick={() => {
          children.columns.dispatch(children.columns.pushAction(newCustomColumn()));
        }}
      />
    </InsertDiv>
  );
  return (
    <>
      <Section name={trans("data")}>
        <div className={tableDataDivClassName}>
          {children.data.propertyView({
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
              {column.getPropertyView()}
              {column.getView().isCustom && (
                <RedButton
                  onClick={() => {
                    CustomModal.confirm({
                      title: trans("table.deleteColumn"),
                      content: trans("table.confirmDeleteColumn") + `${column.getView().title}?`,
                      onConfirm: () =>
                        children.columns.dispatch(children.columns.deleteAction(index)),
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
            children.columns.dispatch(children.columns.pushAction(newCustomColumn()));
          }}
          onMove={(fromIndex, toIndex) => {
            const action = children.columns.arrayMoveAction(fromIndex, toIndex);
            children.columns.dispatch(action);
          }}
          hide={(column) => column.getView().hide}
          onHide={(column, hide) => column.children.hide.dispatchChangeValueAction(hide)}
          dataIndex={(column) => column.getView().dataIndex}
        />
      </Section>
      <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
      <Section name={trans("prop.rowSelection")}>{children.selection.getPropertyView()}</Section>
      <Section name={trans("prop.toolbar")}> {children.toolbar.getPropertyView()}</Section>
      <Section name={trans("prop.pagination")}>{children.pagination.getPropertyView()}</Section>
      <Section name={sectionNames.interaction}>
        {children.onEvent.getPropertyView()}
        {loadingPropertyView(children)}
        {children.viewModeResizable.propertyView({
          label: trans("table.viewModeResizable"),
          tooltip: trans("table.viewModeResizableTooltip"),
        })}
      </Section>
      <Section name={sectionNames.style}>
        {children.style.getPropertyView()}
        {children.size.propertyView({
          label: trans("table.tableSize"),
          radioButton: true,
        })}
        {children.hideHeader.propertyView({
          label: trans("table.hideHeader"),
        })}
        {children.hideBordered.propertyView({
          label: trans("table.hideBordered"),
        })}
      </Section>
    </>
  );
}
