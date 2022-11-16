import { MultiCompBuilder, withPropertyViewFn } from "comps/generators";
import { ParamsStringControl, ParamsJsonControl } from "../../controls/paramsControl";
import { FunctionProperty, toQueryView } from "../queryCompUtils";
import { withTypeAndChildrenAbstract } from "../../generators/withType";
import { changeValueAction, CompAction, DispatchType, MultiBaseComp } from "openblocks-core";
import {
  Dropdown,
  QueryConfigItemWrapper,
  QueryConfigLabel,
  QueryConfigWrapper,
} from "openblocks-design";
import { BoolPureControl } from "../../controls/boolControl";
import { dropdownControl } from "../../controls/dropdownControl";
import { TableNameComp } from "./tableNameComp";
import { ChangeSetComp, ChangeSetTypeDropdown } from "./changeSetComp";
import { FilterComp } from "./FilterComp";
import { trans } from "i18n";

const changeSetParams = {
  styleName: "medium" as const,
  placeholder: `{{ form.data }}`,
  label: " ",
  placement: "bottom" as const,
};

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
  })
);

const CommandMap = {
  INSERT: new MultiCompBuilder(
    { table: TableNameComp, changeSet: ChangeSetComp },
    (props) => props.changeSet
  )
    .setPropertyViewFn((children) => (
      <>
        <ChangeSetTypeDropdown
          label={trans("sqlQuery.insertList")}
          value={children.changeSet.children.compType.getView()}
          dispatch={children.changeSet.dispatch}
        />
        {children.changeSet.children.comp.propertyView({
          table: children.table.value,
          ...changeSetParams,
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
        <ChangeSetTypeDropdown
          label={trans("sqlQuery.updateList")}
          value={children.changeSet.children.compType.getView()}
          dispatch={children.changeSet.dispatch}
        />
        {children.changeSet.children.comp.propertyView({
          table: children.table.value,
          ...changeSetParams,
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
        <ChangeSetTypeDropdown
          label={trans("sqlQuery.insertList")}
          tooltip={trans("sqlQuery.insertListTooltip")}
          value={children.insertChangeSet.children.compType.getView()}
          dispatch={children.insertChangeSet.dispatch}
        />
        {children.insertChangeSet.children.comp.propertyView({
          table: children.table.value,
          ...changeSetParams,
        })}
        <ChangeSetTypeDropdown
          label={trans("sqlQuery.updateList")}
          tooltip={trans("sqlQuery.updateListTooltip")}
          value={children.updateChangeSet.children.compType.getView()}
          dispatch={children.updateChangeSet.dispatch}
        />
        {children.updateChangeSet.children.comp.propertyView({
          table: children.table.value,
          ...changeSetParams,
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

const regexp = new RegExp("(\\s|^)(update|insert|delete)(\\s|$)", "i");

type ChildrenType = InstanceType<typeof SQLTmpQuery> extends MultiBaseComp<infer X> ? X : never;

const SQLQueryPropertyView = (props: { children: ChildrenType; dispatch: DispatchType }) => {
  const { children, dispatch } = props;

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
                {
                  label: trans("sqlQuery.upsert"),
                  value: "UPSERT",
                },
                { label: trans("sqlQuery.update"), value: "UPDATE" },
                { label: trans("sqlQuery.delete"), value: "DELETE" },
                { label: trans("sqlQuery.bulkInsert"), value: "BULK_INSERT" },
              ] as const
            }
            value={children.commandType.getView()}
            onChange={(value) => {
              dispatch(
                changeValueAction({
                  mode: children.mode.toJsonValue(),
                  command: children.command.toJsonValue(),
                  commandType: value,
                  sql: children.sql.toJsonValue(),
                  disablePreparedStatement: children.disablePreparedStatement.toJsonValue(),
                })
              );
            }}
          />
          {children.command.getPropertyView()}
        </>
      )}

      {/*<div style={{ width: "calc(30% - 8px)" }}>*/}
      {/*  {childrenMap.timeout.propertyView({ label: "Timeout" })}*/}
      {/*</div>*/}
    </>
  );
};

export const SQLQuery = class extends SQLTmpQuery {
  isWrite(action: CompAction): boolean {
    return (
      (action.path.includes("sql") && regexp.test(this.children.sql.toJsonValue())) ||
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
            value: e[1] as Function,
          }))
    );
  }

  override getPropertyView() {
    return <SQLQueryPropertyView children={this.children} dispatch={this.dispatch} />;
  }
};
