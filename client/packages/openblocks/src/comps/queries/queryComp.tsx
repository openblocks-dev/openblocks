import { message } from "antd";
import {
  changeChildAction,
  ChangeValueAction,
  changeValueAction,
  CompAction,
  CompActionTypes,
  CompParams,
  ConstructorToDataType,
  deferAction,
  ExecuteQueryAction,
  executeQueryAction,
  FetchCheckNode,
  FetchInfo,
  fromRecord,
  MultiBaseComp,
  multiChangeAction,
  wrapActionExtraInfo,
} from "openblocks-core";
import { SimpleNameComp } from "comps/comps/simpleNameComp";
import { StringControl } from "comps/controls/codeControl";
import { eventHandlerControl } from "comps/controls/eventHandlerControl";
import { stateComp, valueComp, withTypeAndChildren, withViewFn } from "comps/generators";
import { list } from "comps/generators/list";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { ValueFromOption } from "openblocks-design";
import _ from "lodash";
import { ReactNode, useEffect } from "react";
import { getPromiseAfterDispatch, getPromiseParams } from "util/promiseUtils";
import { QueryExecuteResponse } from "../../api/queryApi";
import { JSONObject, JSONValue } from "../../util/jsonTypes";
import { NameConfig, withExposingConfigs } from "../generators/withExposing";
import { getTriggerType, onlyManualTrigger } from "./queryCompUtils";
import { QueryNotificationControl } from "./queryComp/queryNotificationControl";
import { QueryPropertyView } from "./queryComp/queryPropertyView";
import { getReduceContext } from "comps/utils/reduceContext";
import { QueryConfirmationModal } from "./queryComp/queryConfirmationModal";
import { BoolPureControl } from "../controls/boolControl";
import { useFixedDelay } from "../../util/hooks";
import { millisecondsControl } from "../controls/millisecondControl";
import { EditorState } from "comps/editorState";
import { genQueryId } from "comps/utils/idGenerator";
import { paramsMillisecondsControl } from "../controls/paramsControl";
import {
  BottomResComp,
  BottomResCompResult,
  BottomResCompResultDataType,
  BottomResListComp,
  BottomResTypeEnum,
} from "types/bottomRes";
import { QueryContext } from "../../util/context/QueryContext";
import { perfMark, perfMeasure } from "util/perfUtils";
import { trans } from "i18n";
import { undoKey } from "util/keyUtils";
import { manualTriggerResource, QueryMap } from "@openblocks-ee/constants/queryConstants";
import { QUERY_EXECUTION_ERROR, QUERY_EXECUTION_OK } from "../../constants/queryConstants";
import DataSourceIcon from "components/DataSourceIcon";

export type QueryResultExtra = Omit<
  QueryExecuteResponse,
  "code" | "message" | "data" | "success" | "runTime" | "queryCode"
>;

export interface QueryResult {
  code?: string;
  success: boolean;
  message?: string;
  data: JSONValue;
  runTime?: number;
  extra?: QueryResultExtra;
}

const TriggerTypeOptions = [
  { label: trans("query.triggerTypeAuto"), value: "automatic" },
  { label: trans("query.triggerTypeManual"), value: "manual" },
] as const;
export type TriggerType = ValueFromOption<typeof TriggerTypeOptions>;

const EventOptions = [
  { label: trans("query.success"), value: "success", description: trans("query.successDesc") },
  { label: trans("query.fail"), value: "fail", description: trans("query.failDesc") },
] as const;

let QueryCompTmp = withTypeAndChildren(QueryMap, "js", {
  id: valueComp<string>(""),
  name: SimpleNameComp,
  order: valueComp<number>(0),

  code: stateComp<string>(QUERY_EXECUTION_OK),
  success: stateComp<boolean>(true),
  message: stateComp<string>(""),
  data: stateComp<JSONValue>(null),
  extra: stateComp<JSONValue>({}),
  isFetching: stateComp<boolean>(false),
  lastQueryStartTime: stateComp<number>(-1), // The last execution time of the query, in order to avoid multiple executions overwriting each other, not persistent
  latestEndTime: stateComp<number>(0), // The time when the query was last executed
  runTime: stateComp<number>(0), // query run time

  datasourceId: StringControl,
  triggerType: valueComp<TriggerType>("automatic"),
  // onSuccess: eventHandlerControl([{label: "", value: "after",},], "query"), offline
  // onFail: eventHandlerControl([{label: "", value: "after",},], "query"), offline
  onEvent: eventHandlerControl(EventOptions, "query"),
  notification: QueryNotificationControl,
  isNewCreate: stateComp<boolean>(false), // Used to mark the newly created/copied query to prevent the new one from being executed immediately

  // advanced
  timeout: paramsMillisecondsControl({
    left: 0,
    right: 120 * 1000,
    defaultValue: 10 * 1000,
  }),
  confirmationModal: QueryConfirmationModal,
  periodic: BoolPureControl,
  periodicTime: millisecondsControl({
    defaultValue: Number.NaN,
    toMilliseconds: (value: number, left: number, right: number, unit: "ms" | "s") => {
      if (value < 100 || Number.isNaN(value)) {
        throw new TypeError(
          trans("millisecondsControl.timeoutLessThanMinError", { left: "100ms", value: value })
        );
      }
      return unit === "s" ? value * 1000 : value;
    },
  }),
});

export type QueryChildrenType = InstanceType<typeof QueryCompTmp> extends MultiBaseComp<infer X>
  ? X
  : never;

/**
 * Logic to automatically trigger execution
 */
QueryCompTmp = class extends QueryCompTmp {
  readonly isDepReady: boolean = false;

  dispatchExecuteAction() {
    this.dispatch(executeQueryAction({}));
  }

  execute() {
    const target = this as any;
    if (!target["debounceExecute"]) {
      target["debounceExecute"] = _.debounce(
        () => {
          setTimeout(() => this.dispatchExecuteAction());
        },
        750,
        { leading: true, maxWait: 2000, trailing: true }
      );
    }
    target["debounceExecute"]();
  }

  private runningDependNodes() {
    const childrenNodes = this.childrenNode();
    return fromRecord(_.omit(childrenNodes, "onEvent"));
  }

  override extraNode() {
    return {
      node: {
        queryDepFetchInfo: new FetchCheckNode(this.runningDependNodes()),
      },
      updateNodeFields: (value: any) => {
        const fetchInfo = value.queryDepFetchInfo as FetchInfo;
        return { isDepReady: fetchInfo.ready };
      },
    };
  }

  override reduce(action: CompAction): this {
    if (
      action.type === CompActionTypes.UPDATE_NODES_V2 &&
      getTriggerType(this) === "automatic" &&
      (this.children.compType.getView() !== "js" ||
        (this.children.compType.getView() === "js" &&
          this.children.lastQueryStartTime.getView() === -1)) // query which has deps can be executed on page load(first time)
    ) {
      const dependValues = this.children.comp.node()?.dependValues();
      const target = this as any;
      // If the dsl has not changed, but the dependent node value has changed, then trigger the query execution
      // FIXME, this should be changed to a reference judgement, but for unknown reasons if the reference is modified once, it will change twice.
      if (!_.isEqual(target["__query_comp_last_depends"], dependValues)) {
        if (_.isEqual(target["__query_comp_last_node"], this.children.comp.toJsonValue())) {
          this.execute();
        }
        target["__query_comp_last_depends"] = dependValues;
        target["__query_comp_last_node"] = this.children.comp.toJsonValue();
      }
    }
    return super.reduce(action);
  }
};

interface QueryViewProps {
  comp: InstanceType<typeof QueryCompTmp>;
}

function QueryView(props: QueryViewProps) {
  const { comp } = props;

  useEffect(() => {
    // Automatically load when page load
    if (
      getTriggerType(comp) === "automatic" &&
      (comp as any).isDepReady &&
      !comp.children.isNewCreate.value
    ) {
      setTimeout(() => {
        comp.dispatch(deferAction(executeQueryAction({})));
      });
    }
  }, []);

  useFixedDelay(
    () =>
      getPromiseAfterDispatch(comp.dispatch, executeQueryAction({}), {
        notHandledError: trans("query.fixedDelayError"),
      }),
    getTriggerType(comp) === "automatic" && comp.children.periodic.getView()
      ? comp.children.periodicTime.getView()
      : null
  );

  return null;
}

QueryCompTmp = withViewFn(QueryCompTmp, (comp) => {
  return <QueryView key={comp.children.id.getView()} comp={comp} />;
});

QueryCompTmp = class extends QueryCompTmp {
  override reduce(action: CompAction): this {
    if (action.type === CompActionTypes.EXECUTE_QUERY) {
      return this.executeQuery(action);
    } else if (action.type === CompActionTypes.CHANGE_VALUE) {
      const value: any = (action as ChangeValueAction).value;

      // when processing switches to manual mode, turn on error message notification
      if (action.path[0] === "triggerType" && value === "manual") {
        return super.reduce(action).reduce(
          changeChildAction("notification", {
            ...this.children.notification.toJsonValue(),
            showFail: true, //
          })
        );
      }
    }

    // handle triggerType automatic => manual
    if (
      getTriggerType(this) === "automatic" &&
      (action.type === CompActionTypes.CHANGE_VALUE || action.type === CompActionTypes.MULTI_CHANGE)
    ) {
      const comp = super.reduce(action);
      const isWrite = "isWrite" in comp.children.comp && comp.children.comp.isWrite(action);
      return isWrite ? comp.reduce(changeChildAction("triggerType", "manual")) : comp;
    }

    return super.reduce(action);
  }

  /**
   * Process the execution result
   */
  private processResult(result: QueryResult, action: ExecuteQueryAction, startTime: number) {
    const lastQueryStartTime = this.children.lastQueryStartTime.getView();
    if (lastQueryStartTime > startTime) {
      // There are more new requests, ignore this result
      // FIXME: cancel this request in advance in the future
      return;
    }
    const changeAction = multiChangeAction({
      code: changeValueAction(result.code ?? QUERY_EXECUTION_OK),
      success: changeValueAction(result.success ?? true),
      message: changeValueAction(result.message ?? ""),
      data: changeValueAction(result.data),
      extra: changeValueAction(result.extra ?? {}),
      isFetching: changeValueAction(false),
      latestEndTime: changeValueAction(Date.now()),
      runTime: changeValueAction(result.runTime ?? 0),
    });
    getPromiseAfterDispatch(this.dispatch, deferAction(changeAction), {
      autoHandleAfterReduce: true,
    }).then(() => {
      const queryId = this.children.id.getView();
      if (result.success && this.children.notification.getQueryCustomResult()) {
        this.children.onEvent.getView()("success");
      } else {
        this.children.onEvent.getView()("fail");
      }
      this.children.notification.getView()(
        this.children.name.getView(),
        this.children.triggerType.getView(),
        { ...result, code: result.code ?? QUERY_EXECUTION_OK, success: result.success ?? true }
      );
      const afterExecFunc = action.afterExecFunc;
      afterExecFunc && afterExecFunc();
      perfMark(`query-${queryId}-end`);
      perfMeasure(`query-${queryId}`, `query-${queryId}-start`, `query-${queryId}-end`);
    });

    this.children.notification.dispatchContextChanged(result);
  }

  private executeQuery(action: ExecuteQueryAction): this {
    // query start execution time
    const queryId = this.children.id.getView();
    perfMark(`query-${queryId}-start`);
    const startTime = new Date().getTime();
    const queryFunc = this.getTypeSafeView();
    const promiseParams = getPromiseParams(action);
    const { applicationId, parentApplicationPath } = getReduceContext();
    this.children.confirmationModal
      .getView()(() => {
        this.dispatch(
          multiChangeAction({
            isFetching: changeValueAction(true),
            lastQueryStartTime: changeValueAction(startTime),
          })
        );
        return queryFunc({
          queryId,
          applicationId: applicationId,
          applicationPath: parentApplicationPath,
          args: action.args,
          timeout: this.children.timeout,
        });
      }, getTriggerType(this) === "manual")
      .then(
        (result) => {
          this.processResult(result, action, startTime);
          if (result.success ?? true) {
            promiseParams && promiseParams.resolve(result.data);
          } else {
            promiseParams && promiseParams.reject({ message: result.message ?? "" });
          }
        },
        (error) => {
          this.processResult(
            {
              code: QUERY_EXECUTION_ERROR,
              success: false,
              data: {},
              message: error.message,
            },
            action,
            startTime
          );
          promiseParams && promiseParams.reject(error);
        }
      )
      .catch((e: any) => {
        // should not happen
        promiseParams && promiseParams.reject(e);
        message.error(JSON.stringify(e));
      });
    promiseParams && promiseParams.setHandled();
    return this;
  }

  override getPropertyView() {
    return (
      <QueryContext.Provider
        value={{
          datasourceId: this.children.datasourceId.getView(),
          resourceType: this.children.compType.getView(),
        }}
      >
        <QueryPropertyView comp={this as any} />
      </QueryContext.Provider>
    );
  }
};

// compatible work
QueryCompTmp = class extends QueryCompTmp implements BottomResComp {
  constructor(params: CompParams<ConstructorToDataType<typeof QueryCompTmp>>) {
    const newParams = { ...params };
    if (newParams.value) {
      // Offline compatible with onSuccess/onFail
      if (newParams.value.hasOwnProperty("onSuccess") || newParams.value.hasOwnProperty("onFail")) {
        type TargetType = typeof newParams.value.onEvent;
        newParams.value.onEvent = [
          ...(newParams.value?.onEvent ?? []),
          ...((((newParams.value as JSONObject)["onSuccess"] as TargetType)?.map((item) => ({
            ...item,
            name: "success",
          })) as TargetType) ?? []),
          ...((((newParams.value as JSONObject)["onFail"] as TargetType)?.map((item) => ({
            ...item,
            name: "fail",
          })) as TargetType) ?? []),
        ];
      }
      if (onlyManualTrigger(newParams.value.compType) && newParams.value.triggerType !== "manual") {
        newParams.value.triggerType = "manual";
      }
      // add a dsl without notification for the old query without notification
      if (
        !newParams.value.hasOwnProperty("notification") &&
        newParams.value.hasOwnProperty("onEvent")
      ) {
        newParams.value["notification"] = { showSuccess: false, showFail: false };
      }
    }

    super(newParams);
  }

  private resultDataType(): BottomResCompResultDataType {
    const type = this.children.compType.getView();
    switch (type) {
      case "js":
      case "restApi":
      case "mongodb":
      case "redis":
      case "es":
      case "smtp":
        return "json";

      default:
        return "default";
    }
  }

  result(): BottomResCompResult | null {
    if (this.children.isFetching.getView()) {
      return null;
    }
    const name = this.name();
    const success = this.children.success.getView();
    const errorMessage = success ? "" : this.children.message.getView();
    return {
      success: success,
      errorMessage,
      title: `${name} ${success ? trans("query.execSuccess") : trans("query.execFail")}`,
      dataType: this.resultDataType(),
      data: this.children.data.getView(),
      runTime: this.children.runTime.getView(),
    };
  }

  type(): BottomResTypeEnum {
    return BottomResTypeEnum.Query;
  }

  name(): string {
    return this.children.name.getView();
  }

  icon(): ReactNode {
    const type = this.children.compType.getView();
    return <DataSourceIcon dataSourceType={type} />;
  }

  order(): number {
    return this.children.order.getView();
  }
};

QueryCompTmp = withMethodExposing(QueryCompTmp, [
  {
    method: {
      name: "run",
      params: [],
    },
    execute: (comp, params) =>
      getPromiseAfterDispatch(
        comp.dispatch,
        executeQueryAction({
          args: params[0] as Record<string, unknown> | undefined,
        }),
        { notHandledError: trans("query.fixedDelayError") }
      ),
  },
]);

export const QueryComp = withExposingConfigs(QueryCompTmp, [
  new NameConfig("data", trans("query.dataExportDesc")),
  new NameConfig("code", trans("query.codeExportDesc")),
  new NameConfig("success", trans("query.successExportDesc")),
  new NameConfig("message", trans("query.messageExportDesc")),
  new NameConfig("extra", trans("query.extraExportDesc")),
  new NameConfig("isFetching", trans("query.isFetchingExportDesc")),
  new NameConfig("runTime", trans("query.runTimeExportDesc")),
  new NameConfig("latestEndTime", trans("query.latestEndTimeExportDesc")),
]);

const QueryListTmpComp = list(QueryComp);

class QueryListComp extends QueryListTmpComp implements BottomResListComp {
  nameAndExposingInfo(): NameAndExposingInfo {
    const result: NameAndExposingInfo = {};
    Object.values(this.children).forEach((comp) => {
      result[comp.children.name.getView()] = comp.exposingInfo();
    });
    return result;
  }

  add(editorState: EditorState, extraInfo?: any) {
    const id = genQueryId();
    const name = editorState.getNameGenerator().genItemName("query");
    const compType = extraInfo?.compType || "js";
    const dataSourceId = extraInfo?.dataSourceId;

    this.dispatch(
      wrapActionExtraInfo(
        this.pushAction({
          id: id,
          name: name,
          datasourceId: dataSourceId,
          compType,
          triggerType: manualTriggerResource.includes(compType) ? "manual" : "automatic",
          isNewCreate: true,
          order: Date.now(),
        }),
        [
          {
            type: "add",
            compName: name,
            compType: compType,
          },
        ]
      )
    );
    editorState.setSelectedBottomRes(name, BottomResTypeEnum.Query);
  }

  copy(editorState: EditorState, name: string) {
    const queryComps = this.getView();
    const index = queryComps.findIndex((i) => i.children.name.getView() === name);
    const originQuery = queryComps[index];
    if (!originQuery) {
      return;
    }
    const newQueryName = editorState.getNameGenerator().genItemName("query");
    const id = genQueryId();
    this.dispatch(
      wrapActionExtraInfo(
        this.pushAction({
          ...originQuery.toJsonValue(),
          id: id,
          name: newQueryName,
          isNewCreate: true,
          order: Date.now(),
        }),
        [
          {
            type: "add",
            compName: name,
            compType: originQuery.children.compType.getView(),
          },
        ]
      )
    );
    editorState.setSelectedBottomRes(newQueryName, BottomResTypeEnum.Query);
  }

  delete(name: string) {
    const queryComps = this.getView();
    const toDelQueryIndex = queryComps.findIndex((i) => i.children.name.getView() === name);
    const toDelQuery = queryComps[toDelQueryIndex];
    if (!toDelQuery) {
      return;
    }
    this.dispatch(
      wrapActionExtraInfo(this.deleteAction(toDelQueryIndex), [
        {
          type: "delete",
          compName: toDelQuery.children.name.getView(),
          compType: toDelQuery.children.compType.getView(),
        },
      ])
    );
    message.success(trans("query.deleteSuccessMessage", { undoKey }));
  }

  items() {
    return this.getView() as unknown as BottomResComp[];
  }
}

export { QueryListComp };
