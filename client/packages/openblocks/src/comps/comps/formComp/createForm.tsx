import { Form, FormInstance, message, Select } from "antd";
import {
  CheckBox,
  CustomModal,
  CustomSelect,
  DragIcon,
  EditText,
  labelCss,
  ModalFooterWrapper,
  TacoButton,
} from "openblocks-design";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { fetchDatasourceStructure } from "redux/reduxActions/datasourceActions";
import { getDataSource, getDataSourceTypes } from "redux/selectors/datasourceSelectors";
import { DatasourceStructure } from "api/datasourceApi";
import styled from "styled-components";
import { getDataSourceTypeConfig } from "./generate";
import { DataSourceTypeConfig, TableColumn } from "./generate/dataSourceCommon";
import { CompConfig } from "./generate/comp";
import { uiCompRegistry } from "comps/uiCompRegistry";
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { trans } from "i18n";
import log from "loglevel";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";
import DataSourceIcon from "components/DataSourceIcon";

const OpenDialogButton = styled.span`
  :hover {
    cursor: pointer;
  }

  color: #4965f2;
`;
const LineWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const DataSourceWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 8px;
`;
const TableNameWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 8px;
`;
const StyledSelect = styled(CustomSelect)`
  .ant-select .ant-select-selector .ant-select-selection-item {
    padding-right: 20px;
  }
`;
const SelectLabel = styled.label`
  ${labelCss};
  user-select: text;
  margin-right: 8px;
  max-width: 100px;
  white-space: nowrap;
`;
const SelectOptionLabel = styled.div`
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const SelectOptionWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
const FormItem = styled(Form.Item)`
  margin: 0;
  line-height: 13px;
  width: 100%;

  .ant-form-item-explain {
    font-size: 12px;
  }

  .ant-form-item-control-input {
    min-height: auto;
  }
`;
const EmptyBody = styled.div`
  font-size: 13px;
  color: #b8b9bf;
  text-align: center;
  line-height: 13px;
  height: 276px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// table
const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  width: 100%;
  height: 36px;
  background: #f5f5f6;
  font-weight: 500;
  font-size: 13px;
  color: #222222;
  line-height: 13px;
`;
const DataBody = styled.div`
  overflow: auto;
  height: 263px;

  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    background-clip: content-box;
    border-radius: 9999px;
    background-color: rgba(139, 143, 163, 0.12);
  }
`;
const DataRow = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 43px;
  z-index: 2000;
  vertical-align: middle;
  border-bottom: 1px solid #f0f0f0;
  background: ${(props) => (props.disabled ? "#FAFAFA" : "#ffffff")};

  font-size: 13px;
  color: ${(props) => (props.disabled ? "#B8B9BF" : "#333333")};
  line-height: 13px;
`;
const CellName = styled.div<{ head?: boolean }>`
  width: 176px;
  padding-left: ${(props) => (props.head ? "16px" : "10px")};
`;
const CellType = styled.div<{ head?: boolean }>`
  width: 128px;
  padding-left: 16px;
`;
const CellLabel = styled.div<{ head?: boolean }>`
  width: 104px;
  padding-left: ${(props) => (props.head ? "16px" : "10px")};
`;
const CellComp = styled.div<{ head?: boolean }>`
  width: 126px;
  padding-left: 16px;
`;
const CellRequired = styled.div<{ head?: boolean }>`
  /* width: 52px; */
  padding-left: 16px;
`;
const StyledDragIcon = styled(DragIcon)`
  cursor: grab;
  width: 16px;
  height: 16px;
`;
const TextWrapper = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const EditTextWrapper = styled.div<{ disabled?: boolean }>`
  .taco-edit-text-wrapper {
    width: 94px;
    height: 24px;
    padding: 0 6px;
    margin: 0;
    border-radius: 4px;

    font-size: 13px;
    color: ${(props) => (props.disabled ? "#B8B9BF" : "#333333")};
    line-height: 13px;

    :hover {
      background-color: #f5f5f6;
    }
  }

  .taco-edit-text-body {
    height: auto;
  }

  .taco-edit-text-icon {
    margin: 0;
  }

  .taco-edit-text-input {
    width: 94px;
    height: 24px;
    padding: 0 6px;
    margin: 0;
    border-radius: 4px;

    font-size: 13px;
    color: #333333;
    line-height: 13px;
    background-color: #ffffff;
    border: 1px solid #315efb;

    :focus {
      border-color: #315efb;
      box-shadow: 0 0 0 2px #d6e4ff;
    }
  }
`;
const CompFormItem = styled(FormItem)`
  .ant-select {
    font-size: 13px;
    color: #333333;
    line-height: 13px;

    :hover {
      color: #315efb;
    }
  }
`;
const StyledCheckbox = styled(CheckBox)<{ disabled?: boolean }>`
  .ant-checkbox-checked {
    .ant-checkbox-inner::after {
      border: 2px solid ${(props) => (props.disabled ? "#B8B9BF" : "#4965f2")};
      border-top: 0;
      border-left: 0;
    }
  }
`;

type CompItem = {
  comp: CompConfig;
  compTypeName: string;
};

// The data required when the draggable row render
type RowItem = {
  columnName: string;
  columnType: string;
  compItems: CompItem[];
};

// The data of the corresponding data column in the form
type FormColumn = {
  enabled: boolean;
  label: string;
  compType: string;
  required: boolean;
};

// data structure in the form
type FormData = {
  dataSourceId?: string;
  tableName?: string;
  columns?: Record<string, FormColumn>;
};

export type CreateData = {
  dataSourceId: string;
  dataSourceTypeConfig: DataSourceTypeConfig;
  tableName: string;
  columns: TableColumn[];
};

export type CreateHandler = (data: CreateData) => Promise<string>;

function getCompSelection(dataSourceTypeConfig: DataSourceTypeConfig, columnType: string) {
  const compSelection = dataSourceTypeConfig.getCompSelection(columnType);
  if (!compSelection) {
    log.error(trans("formComp.compSelectionError"), dataSourceTypeConfig.type, columnType);
    return undefined;
  }
  const compItems: CompItem[] = [];
  compSelection.comps.forEach((comp) => {
    const compTypeName = uiCompRegistry[comp.type]?.name;
    if (!compTypeName) {
      log.error(trans("formComp.compTypeNameError"), comp.type, columnType);
      return;
    }
    compItems.push({ comp, compTypeName });
  });
  if (compItems.length === 0) {
    // The column configuration is empty, indicating that the column type is not supported
    return undefined;
  }
  // use the first one when no default value is found
  let defaultCompType = compSelection.defaultCompType;
  if (!compItems.find(({ comp }) => comp.type === defaultCompType)) {
    defaultCompType = compItems[0].comp.type;
  }
  return { compItems, defaultCompType };
}

function getInitItemsAndColumns(
  dataSourceTypeConfig?: DataSourceTypeConfig,
  tableStructure?: DatasourceStructure
) {
  const initItems: RowItem[] = [];
  const initColumns: Record<string, FormColumn> = {};
  tableStructure?.columns?.forEach(({ name, type, isAutogenerated }) => {
    if (dataSourceTypeConfig && name && type) {
      const selection = getCompSelection(dataSourceTypeConfig, type);
      if (selection) {
        initItems.push({
          columnName: name,
          columnType: type,
          compItems: selection.compItems,
        });
        initColumns[name] = {
          enabled: !isAutogenerated,
          label: name.split("_").map(_.upperFirst).join(" "),
          compType: selection.defaultCompType,
          required: true,
        };
      }
    }
  });
  return { initItems, initColumns };
}

// The data structure submitted by the Form only has the type of the component, add other initialization information for the generated component
function onSubmit(
  data: FormData,
  dataSourceTypeConfig: DataSourceTypeConfig | undefined,
  items: RowItem[],
  onCreate: CreateHandler,
  onFinish: (error?: string) => void
) {
  if (!data.dataSourceId || !dataSourceTypeConfig) {
    onFinish(trans("formComp.noDataSourceSelected"));
    return;
  }
  if (!data.tableName) {
    onFinish(trans("formComp.noTableSelected"));
    return;
  }
  if (!data.columns || Object.keys(data.columns).length === 0) {
    onFinish(trans("formComp.noColumn"));
    return;
  }
  const columns: TableColumn[] = [];
  items.map(({ columnName, columnType, compItems }) => {
    const info = data.columns?.[columnName];
    if (info && info.enabled) {
      const compItem = compItems.find(({ comp }) => comp.type === info.compType);
      if (compItem) {
        columns.push({
          type: columnType,
          name: columnName,
          comp: compItem.comp,
          label: info.label,
          required: !!info.required,
        });
      }
    }
  });
  if (columns.length === 0) {
    onFinish(trans("formComp.noColumnSelected"));
    return;
  }
  return onCreate({
    dataSourceId: data.dataSourceId,
    dataSourceTypeConfig,
    tableName: data.tableName,
    columns: columns,
  }).then((error) => onFinish(error));
}

function onClick(
  form: FormInstance,
  dataSourceTypeConfig: DataSourceTypeConfig | undefined,
  items: RowItem[],
  onCreate: CreateHandler
) {
  form
    .validateFields()
    .then((data: FormData) => {
      return onSubmit(data, dataSourceTypeConfig, items, onCreate, (error) => {
        if (error) {
          message.error(error);
        } else {
          message.success(trans("formComp.success"));
        }
      });
    })
    .catch((e) => {
      message.error(JSON.stringify(e));
    });
}

// UI
const CustomEditText = (props: {
  value?: string;
  onChange?: (value: string) => void;
  disabled: boolean;
}) => {
  return (
    <EditTextWrapper disabled={props.disabled}>
      <EditText
        text={props.value ?? ""}
        onChange={(value) => {
          // keep the last value when empty
          if (value) {
            props.onChange?.(value);
          }
        }}
        onFinish={() => {}}
        disabled={props.disabled}
      />
    </EditTextWrapper>
  );
};

const DragHandle = SortableHandle(() => <StyledDragIcon />);

const SortableItem = SortableElement((props: { item: RowItem; form: FormInstance }) => {
  const { item, form } = props;
  const { columnName, columnType, compItems } = item;
  const disabled = !Form.useWatch(["columns", columnName, "enabled"], form);
  return (
    <DataRow disabled={disabled}>
      <CellName>
        <LineWrapper>
          <DragHandle />
          <FormItem
            name={["columns", columnName, "enabled"]}
            valuePropName="checked"
            style={{ width: "auto", marginLeft: "4px", marginRight: "8px" }}
          >
            <CheckBox />
          </FormItem>
          <TextWrapper title={columnName}>{columnName}</TextWrapper>
        </LineWrapper>
      </CellName>
      <CellType>
        <TextWrapper title={columnType}>{columnType}</TextWrapper>
      </CellType>
      <CellLabel>
        <FormItem name={["columns", columnName, "label"]}>
          <CustomEditText disabled={disabled} />
        </FormItem>
      </CellLabel>
      <CellComp>
        <CompFormItem name={["columns", columnName, "compType"]}>
          <StyledSelect
            placeholder={trans("formComp.selectCompType")}
            border={true}
            disabled={disabled}
          >
            {compItems.map(({ comp, compTypeName }) => {
              return (
                <Select.Option key={comp.type} value={comp.type}>
                  {compTypeName}
                </Select.Option>
              );
            })}
          </StyledSelect>
        </CompFormItem>
      </CellComp>
      <CellRequired>
        <FormItem name={["columns", columnName, "required"]} valuePropName="checked">
          <StyledCheckbox disabled={disabled} />
        </FormItem>
      </CellRequired>
    </DataRow>
  );
});

const SortableBody = SortableContainer((props: { items: RowItem[]; form: FormInstance }) => {
  return (
    <DataBody>
      {props.items.map((t, index) => {
        // Use the column name as the key here to ensure that the useState is correct when dragging
        return <SortableItem key={t.columnName} index={index} item={t} form={props.form} />;
      })}
    </DataBody>
  );
});

function getEmptyText(dataSourceNum: number, tableNum: number, columnNum: number): string {
  if (dataSourceNum === 0) {
    return trans("formComp.noDataSourceFound");
  }
  if (tableNum === 0) {
    return trans("formComp.noTableFound");
  }
  if (columnNum === 0) {
    return trans("formComp.noColumnFound");
  }
  return "";
}

function useDataSourceItems() {
  // All data source type data, data source information, obtained when the app starts
  const dataSourceTypeInfos = useSelector(getDataSourceTypes);
  const dataSourceInfos = useSelector(getDataSource);
  const typeConfigs: Record<string, DataSourceTypeConfig> = {};
  dataSourceTypeInfos?.forEach(({ id }) => {
    const config = getDataSourceTypeConfig(id);
    if (config) {
      typeConfigs[id] = config;
    }
  });
  const dataSourceItems: { dataSource: Datasource; typeConfig: DataSourceTypeConfig }[] = [];
  dataSourceInfos?.forEach(({ datasource }) => {
    const typeConfig = typeConfigs[datasource.type];
    if (typeConfig) {
      dataSourceItems.push({ dataSource: datasource, typeConfig });
    }
  });
  return dataSourceItems;
}

function useTableStructures(dataSourceId?: string) {
  const dataSourceStructure = useSelector((state: AppState) => state.entities.datasource.structure);
  return dataSourceId && dataSourceStructure
    ? (dataSourceStructure[dataSourceId] ?? []).filter((t) => t.type === "TABLE")
    : [];
}

const CreateFormBody = (props: { onCreate: CreateHandler }) => {
  const [form] = Form.useForm();
  // data source
  const dataSourceId: string | undefined = Form.useWatch("dataSourceId", form);
  const dataSourceItems = useDataSourceItems();
  const dataSourceItem = dataSourceItems.find((t) => t.dataSource.id === dataSourceId);
  // default to the first item
  useEffect(() => {
    if (!dataSourceItem) {
      const id = dataSourceItems.length > 0 ? dataSourceItems[0].dataSource.id : undefined;
      form.setFieldsValue({ dataSourceId: id });
    }
  }, [dataSourceItems]);
  // Refetch when changed
  const dispatch = useDispatch();
  useEffect(() => {
    if (dataSourceId) {
      dispatch(fetchDatasourceStructure({ datasourceId: dataSourceId }));
    }
  }, [dataSourceId]);
  // data table
  const tableName: string | undefined = Form.useWatch("tableName", form);
  const tableStructures = useTableStructures(dataSourceId);
  const tableStructure = tableStructures.find((t) => t.name === tableName);
  // default to the first one
  useEffect(() => {
    if (!tableStructure) {
      const name = tableStructures.length > 0 ? tableStructures[0].name : undefined;
      form.setFieldsValue({ tableName: name });
    }
  }, [tableStructures]);
  // Columns of the data table, saved to support drag and drop
  const [items, setItems] = useState<RowItem[]>([]);
  const dataSourceTypeConfig = dataSourceItem?.typeConfig;
  useEffect(() => {
    const { initItems, initColumns } = getInitItemsAndColumns(dataSourceTypeConfig, tableStructure);
    // Set the initial value by the method. Because if another table has the same column name, setting via initialValue is invalid.
    form.setFieldsValue({ columns: initColumns });
    setItems(initItems);
  }, [dataSourceTypeConfig, tableStructure]);
  const emptyText = getEmptyText(dataSourceItems.length, tableStructures.length, items.length);
  return (
    <>
      <Form form={form} preserve={false}>
        <LineWrapper>
          <DataSourceWrapper>
            <SelectLabel>{trans("formComp.dataSource")}</SelectLabel>
            <FormItem name={"dataSourceId"}>
              <StyledSelect style={{ width: "208px" }} placeholder={trans("formComp.selectSource")}>
                {dataSourceItems.map(({ dataSource }) => (
                  <Select.Option key={dataSource.id} value={dataSource.id}>
                    <SelectOptionWrapper>
                      {dataSource.type && <DataSourceIcon dataSourceType={dataSource.type} />}
                      <SelectOptionLabel title={dataSource.name}>
                        {dataSource.name}
                      </SelectOptionLabel>
                    </SelectOptionWrapper>
                  </Select.Option>
                ))}
              </StyledSelect>
            </FormItem>
          </DataSourceWrapper>
          <TableNameWrapper>
            <SelectLabel>{trans("formComp.table")}</SelectLabel>
            <FormItem name={"tableName"}>
              <StyledSelect
                style={{ width: "208px" }}
                placeholder={trans("formComp.selectTable")}
                showSearch
              >
                {tableStructures.map((t) => (
                  <Select.Option key={t.name} value={t.name}>
                    <SelectOptionLabel title={t.name}>
                      {t.name + " (" + t.columns.length + ")"}
                    </SelectOptionLabel>
                  </Select.Option>
                ))}
              </StyledSelect>
            </FormItem>
          </TableNameWrapper>
        </LineWrapper>
        {emptyText ? (
          <EmptyBody>{emptyText}</EmptyBody>
        ) : (
          <>
            <HeaderRow>
              <CellName head={true}>{trans("formComp.columnName")}</CellName>
              <CellType head={true}>{trans("formComp.dataType")}</CellType>
              <CellLabel head={true}>{trans("label")}</CellLabel>
              <CellComp head={true}>{trans("formComp.compType")}</CellComp>
              <CellRequired head={true}>{trans("formComp.required")}</CellRequired>
            </HeaderRow>
            <SortableBody
              items={items}
              form={form}
              useDragHandle
              onSortEnd={({ oldIndex, newIndex }) => {
                if (oldIndex !== newIndex) {
                  setItems(arrayMove(items, oldIndex, newIndex));
                }
              }}
            />
            <ModalFooterWrapper>
              <TacoButton
                buttonType="primary"
                loading={false}
                onClick={() => onClick(form, dataSourceTypeConfig, items, props.onCreate)}
              >
                {trans("formComp.generateForm")}
              </TacoButton>
            </ModalFooterWrapper>
          </>
        )}
      </Form>
    </>
  );
};

export const CreateForm = (props: { onCreate: CreateHandler }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <OpenDialogButton
        onMouseDown={(e) => {
          setVisible(true);
          e.stopPropagation();
        }}
      >
        {trans("formComp.openDialogButton")}
      </OpenDialogButton>
      <div
        onKeyDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <CustomModal
          visible={visible}
          destroyOnClose={true}
          title={trans("formComp.generateForm")}
          footer={null}
          onCancel={() => setVisible(false)}
          width="600px"
          children={<CreateFormBody {...props} />}
          bodyStyle={{ padding: 0 }}
        />
      </div>
    </>
  );
};
