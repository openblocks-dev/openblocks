import { MultiCompBuilder, valueComp, withPropertyViewFn } from "comps/generators";
import {
  ParamsJsonControl,
  ParamsStringControl,
  ValueFunction,
} from "../../controls/paramsControl";
import { toQueryView } from "../queryCompUtils";
import { withTypeAndChildrenAbstract } from "../../generators/withType";
import { CompAction } from "openblocks-core";
import {
  Dropdown,
  QueryConfigItemWrapper,
  QueryConfigLabel,
  QueryConfigWrapper,
} from "openblocks-design";
import { BoolPureControl } from "../../controls/boolControl";
import { dropdownControl } from "../../controls/dropdownControl";
import { TableNameComp } from "./tableNameComp";
import { ChangeSetComp } from "./changeSetComp";
import { FilterComp } from "./FilterComp";
import { trans } from "i18n";
import { ColumnNameDropdown } from "./columnNameDropdown";
import React, { useContext } from "react";
import { QueryContext } from "util/context/QueryContext";

const AllowMultiModifyComp = withPropertyViewFn(BoolPureControl, (comp) =>
  comp.propertyView({
    label: trans("sqlQuery.allowMultiModify"),
    type: "checkbox",
    placement: "bottom",
    tooltip: trans("sqlQuery.allowMultiModifyTooltip"),
  })
);

const RecordsComp = withPropertyViewFn(ParamsJsonControl, (comp) =>
  comp.propertyView({
    label: trans("sqlQuery.array"),
    placement: "bottom",
    placeholder: "{{ [{ a: 1, b: 1}, {...}] }}",
    styleName: "medium",
    enableMetaCompletion: true,
  })
);

const CommandMap = {
  INSERT: new MultiCompBuilder(
    { table: TableNameComp, changeSet: ChangeSetComp },
    (props) => props.changeSet
  )
    .setPropertyViewFn((children) => (
      <>
        {children.changeSet.propertyView({
          label: trans("sqlQuery.insertList"),
          table: children.table.value,
        })}
      </>
    ))
    .build(),
  UPDATE: new MultiCompBuilder(
    {
      table: TableNameComp,
      changeSet: ChangeSetComp,
      filterBy: FilterComp,
      allowMultiModify: AllowMultiModifyComp,
    },
    (props) => ({ ...props.changeSet, ...props.filterBy })
  )
    .setPropertyViewFn((children) => (
      <>
        <QueryConfigWrapper>
          <QueryConfigLabel>{trans("sqlQuery.filterRule")}</QueryConfigLabel>
          <QueryConfigItemWrapper>
            {children.filterBy.propertyView({ table: children.table.value, placement: "bottom" })}
          </QueryConfigItemWrapper>
        </QueryConfigWrapper>
        {children.changeSet.propertyView({
          label: trans("sqlQuery.updateList"),
          table: children.table.value,
        })}
        {children.allowMultiModify.getPropertyView()}
      </>
    ))
    .build(),
  UPSERT: new MultiCompBuilder(
    {
      table: TableNameComp,
      insertChangeSet: ChangeSetComp,
      updateChangeSet: ChangeSetComp,
    },
    (props) => ({ ...props.insertChangeSet, ...props.updateChangeSet })
  )
    .setPropertyViewFn((children) => (
      <>
        {children.insertChangeSet.propertyView({
          label: trans("sqlQuery.insertList"),
          tooltip: trans("sqlQuery.insertListTooltip"),
          table: children.table.value,
        })}
        {children.updateChangeSet.propertyView({
          label: trans("sqlQuery.updateList"),
          tooltip: trans("sqlQuery.updateListTooltip"),
          table: children.table.value,
        })}
      </>
    ))
    .build(),
  DELETE: new MultiCompBuilder(
    { table: TableNameComp, filterBy: FilterComp, allowMultiModify: AllowMultiModifyComp },
    (props) => props.filterBy
  )
    .setPropertyViewFn((children) => (
      <>
        <QueryConfigWrapper>
          <QueryConfigLabel>{trans("sqlQuery.filterRule")}</QueryConfigLabel>
          <QueryConfigItemWrapper>
            {children.filterBy.propertyView({ table: children.table.value, placement: "bottom" })}
          </QueryConfigItemWrapper>
        </QueryConfigWrapper>
        {children.allowMultiModify.getPropertyView()}
      </>
    ))
    .build(),
  BULK_INSERT: new MultiCompBuilder(
    { table: TableNameComp, records: RecordsComp },
    (props) => props.records
  )
    .setPropertyViewFn((children) => <>{children.records.getPropertyView()}</>)
    .build(),
  BULK_UPDATE: new MultiCompBuilder(
    { table: TableNameComp, primaryKey: valueComp<string>(""), records: RecordsComp },
    (props) => props.records
  )
    .setPropertyViewFn((children) => (
      <>
        <ColumnNameDropdown
          table={children.table.value}
          value={children.primaryKey.value}
          dispatch={children.primaryKey.dispatch}
          placement={"bottom"}
          label={trans("sqlQuery.primaryKeyColumn")}
        />
        {children.records.getPropertyView()}
      </>
    ))
    .build(),
} as const;

const childrenMap = {
  mode: dropdownControl(
    [
      { label: trans("sqlQuery.sqlMode"), value: "SQL" },
      { label: trans("sqlQuery.guiMode"), value: "GUI" },
    ] as const,
    "SQL"
  ),
  sql: ParamsStringControl,
  disablePreparedStatement: BoolPureControl,
};

const SQLTmpQuery = withTypeAndChildrenAbstract(
  CommandMap,
  "INSERT",
  childrenMap,
  "commandType",
  "command"
);

const regexp = new RegExp("(\\s|^)(update|insert|delete|drop)(\\s|$)", "i");

const SQLQueryPropertyView = (props: { comp: InstanceType<typeof SQLQuery> }) => {
  const { children } = props.comp;
  const context = useContext(QueryContext);

  return (
    <>
      {children.mode.getView() === "SQL" ? (
        children.sql.propertyView({
          placement: "bottom",
          placeholder: "SELECT * FROM users;",
          styleName: "medium",
          language: "sql",
          enableMetaCompletion: true,
        })
      ) : (
        <>
          {children.command.children.table.getPropertyView()}
          <Dropdown
            label={trans("sqlQuery.operation")}
            placement={"bottom"}
            options={
              [
                { label: trans("sqlQuery.insert"), value: "INSERT" },
                ...(context?.resourceType && SUPPORT_UPSERT_SQL_QUERY.includes(context.resourceType)
                  ? [{ label: trans("sqlQuery.upsert"), value: "UPSERT" }]
                  : []),
                { label: trans("sqlQuery.update"), value: "UPDATE" },
                { label: trans("sqlQuery.delete"), value: "DELETE" },
                ...(context?.resourceType !== "oracle"
                  ? [{ label: trans("sqlQuery.bulkInsert"), value: "BULK_INSERT" }]
                  : []),
                { label: trans("sqlQuery.bulkUpdate"), value: "BULK_UPDATE" },
              ] as const
            }
            value={children.commandType.getView()}
            onChange={(value: any) => {
              props.comp.dispatchChangeAndPreserveAction({
                command: { table: children.command.children.table.getView() },
                commandType: value,
                mode: children.mode.toJsonValue(),
                sql: children.sql.toJsonValue(),
                disablePreparedStatement: children.disablePreparedStatement.toJsonValue(),
              });
            }}
          />
          {children.command.getPropertyView()}
        </>
      )}
    </>
  );
};

export const SQLQuery = class extends SQLTmpQuery {
  isWrite(action: CompAction): boolean {
    return (
      (action.path.includes("sql") && regexp.test(this.children.sql.toJsonValue() as string)) ||
      (action.path.includes("mode") && (action as any).value === "GUI")
    );
  }

  override getView() {
    return toQueryView(
      this.children.mode.getView() === "SQL"
        ? Object.entries(this.children.sql.getView()).map((kv) => ({
            key: kv[0],
            value: kv[1],
          }))
        : Object.entries(this.children.command.getView()).map((e) => ({
            key: e[0],
            value: e[1] as ValueFunction,
          }))
    );
  }

  override getPropertyView() {
    return <SQLQueryPropertyView comp={this} />;
  }
};

export const NOT_SUPPORT_GUI_SQL_QUERY: string[] = [
  "clickHouse",
  "snowflake",
  "tdengine",
  "dameng",
];
const SUPPORT_UPSERT_SQL_QUERY: string[] = [
  "mysql",
  "oceanBase",
  "tidb",
  "polardbMysql",
  "sequoiadbMysql",
  "starrocks",
  "mariadb",
];
