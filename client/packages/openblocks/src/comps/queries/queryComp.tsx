import {
  manualTriggerResource,
  QueryMap,
  ResourceType,
} from "@openblocks-ee/constants/queryConstants";
import { message } from "antd";
import axios from "axios";
import DataSourceIcon from "components/DataSourceIcon";
import { SimpleNameComp } from "comps/comps/simpleNameComp";
import { StringControl } from "comps/controls/codeControl";
import { eventHandlerControl } from "comps/controls/eventHandlerControl";
import { EditorState } from "comps/editorState";
import {
  stateComp,
  valueComp,
  withDefault,
  withTypeAndChildren,
  withViewFn,
} from "comps/generators";
import { list } from "comps/generators/list";
import { ToInstanceType } from "comps/generators/multi";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { genQueryId, genRandomKey } from "comps/utils/idGenerator";
import { getReduceContext } from "comps/utils/reduceContext";
import { trans } from "i18n";
import _ from "lodash";
import {
  ChangeValueAction,
  CompAction,
  CompActionTypes,
  CompParams,
  ConstructorToDataType,
  customAction,
  deferAction,
  ExecuteQueryAction,
  executeQueryAction,
  FetchCheckNode,
  FetchInfo,
  fromRecord,
  isCustomAction,
  MultiBaseComp,
  multiChangeAction,
  wrapActionExtraInfo,
} from "openblocks-core";
import { ValueFromOption } from "openblocks-design";
import { ReactNode, useEffect } from "react";
import {
  BottomResComp,
  BottomResCompResult,
  BottomResCompResultDataType,
  BottomResListComp,
  BottomResTypeEnum,
} from "types/bottomRes";
import { undoKey } from "util/keyUtils";
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { perfMark, perfMeasure } from "util/perfUtils";
import { getPromiseAfterDispatch, getPromiseParams } from "util/promiseUtils";
import { QueryExecuteResponse } from "../../api/queryApi";
import {
  JsPluginQueryMap,
  QUERY_EXECUTION_ERROR,
  QUERY_EXECUTION_OK,
} from "../../constants/queryConstants";
import { QueryContext } from "../../util/context/QueryContext";
import { useFixedDelay } from "../../util/hooks";
import { JSONObject, JSONValue } from "../../util/jsonTypes";
import { BoolPureControl } from "../controls/boolControl";
import { millisecondsControl } from "../controls/millisecondControl";
import { paramsMillisecondsControl } from "../controls/paramsControl";
import { NameConfig, withExposingConfigs } from "../generators/withExposing";
import { HttpQuery } from "./httpQuery/httpQuery";
import { QueryConfirmationModal } from "./queryComp/queryConfirmationModal";
import { QueryNotificationControl } from "./queryComp/queryNotificationControl";
import { QueryPropertyView } from "./queryComp/queryPropertyView";
import { getTriggerType, onlyManualTrigger } from "./queryCompUtils";

const latestExecution: Record<string, string> = {};

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

interface AfterExecuteQueryAction {
  type: "afterExecQuery";
  result: QueryResult;
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

const childrenMap = {
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
  cancelPrevious: withDefault(BoolPureControl, false),
};

let QueryCompTmp = withTypeAndChildren<typeof QueryMap, ToInstanceType<typeof childrenMap>>(
  (type, value) => {
    const resourceType = type as ResourceType;
    const Comp = QueryMap[resourceType];
    if (Comp) {
      return Comp;
    }
    if (!value?.datasourceId) {
      return;
    }
    const typeWithDataSourceId = `${type}:${value.datasourceId}` as `${string}:${string}`;
    return JsPluginQueryMap[typeWithDataSourceId];
  },
  "js",
  childrenMap
);

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

  execute(target: any) {
    if (!target["debounceExecute"]) {
      target["debounceExecute"] = _.debounce(
        () => {
          setTimeout(() => this.dispatchExecuteAction());
        },
        750,
        { leading: false, maxWait: 2000, trailing: true }
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
        queryDepFetchInfo: new FetchCheckNode(this.runningDependNodes(), {
          ignoreManualDepReadyStatus:
            this.children.compType.getView() === "js" && getTriggerType(this) === "automatic",
        }),
      },
      updateNodeFields: (value: any) => {
        const fetchInfo = value.queryDepFetchInfo as FetchInfo;
        return { isDepReady: fetchInfo.ready };
      },
    };
  }

  override reduce(action: CompAction): this {
    const isJsQuery = this.children.compType.getView() === "js";
    const notExecuted = this.children.lastQueryStartTime.getView() === -1;
    const isAutomatic = getTriggerType(this) === "automatic";

    if (
      action.type === CompActionTypes.UPDATE_NODES_V2 &&
      isAutomatic &&
      (!isJsQuery || (isJsQuery && notExecuted)) // query which has deps can be executed on page load(first time)
    ) {
      const next = super.reduce(action);
      const depends = this.children.comp.node()?.dependValues();
      const dsl = this.children.comp.toJsonValue();
      const lastDependsKey = "__query_comp_last_depends";
      const lastDslKey = "__query_comp_last_node";

      // isDepReady is set after finishing UPDATE_NODES_V2 action reducing.
      if (!next.isDepReady) {
        return setFieldsNoTypeCheck(next, {
          [lastDependsKey]: depends,
          [lastDslKey]: dsl,
        });
      }

      const target = this as any;

      const preDepends = target[lastDependsKey];
      const preDsl = target[lastDslKey];

      const dependsChanged = !_.isEqual(preDepends, depends);
      const dslNotChanged = _.isEqual(preDsl, dsl);

      // If the dsl has not changed, but the dependent node value has changed, then trigger the query execution
      // FIXME, this should be changed to a reference judgement, but for unknown reasons if the reference is modified once, it will change twice.
      if (dependsChanged) {
        if (dslNotChanged) {
          this.execute(next);
        }
        return setFieldsNoTypeCheck(next, {
          [lastDependsKey]: depends,
          [lastDslKey]: dsl,
        });
      }
      return next;
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
    if (isCustomAction<AfterExecuteQueryAction>(action, "afterExecQuery")) {
      return this.processEvents(action.value.result);
    }
    if (action.type === CompActionTypes.EXECUTE_QUERY) {
      if (getReduceContext().disableUpdateState) return this;
      return this.executeQuery(action);
    }
    if (action.type === CompActionTypes.CHANGE_VALUE) {
      const value: any = (action as ChangeValueAction).value;

      // when processing switches to manual mode, turn on error message notification
      if (action.path[0] === "triggerType" && value === "manual") {
        return super.reduce(action).reduce(
          this.changeChildAction("notification", {
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
      return isWrite ? comp.reduce(comp.changeChildAction("triggerType", "manual")) : comp;
    }

    return super.reduce(action);
  }

  private processEvents(result: QueryResult) {
    const onEvent = this.children.onEvent.getView();
    const name = this.children.name.getView();
    const triggerType = this.children.triggerType.getView();
    const success = result.success && this.children.notification.getQueryCustomResult();
    onEvent(success ? "success" : "fail");
    this.children.notification.getView()(name, triggerType, {
      ...result,
      code: result.code ?? QUERY_EXECUTION_OK,
      success: result.success ?? true,
    });
    return this;
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
      code: this.children.code.changeValueAction(result.code ?? QUERY_EXECUTION_OK),
      success: this.children.success.changeValueAction(result.success ?? true),
      message: this.children.message.changeValueAction(result.message ?? ""),
      data: this.children.data.changeValueAction(result.data),
      extra: this.children.extra.changeValueAction(result.extra ?? {}),
      isFetching: this.children.isFetching.changeValueAction(false),
      latestEndTime: this.children.latestEndTime.changeValueAction(Date.now()),
      runTime: this.children.runTime.changeValueAction(result.runTime ?? 0),
    });
    getPromiseAfterDispatch(this.dispatch, changeAction, {
      autoHandleAfterReduce: true,
    }).then(() => {
      this.dispatch(
        customAction(
          {
            type: "afterExecQuery",
            result,
          },
          false
        )
      );
      const queryId = this.children.id.getView();
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
    const cancelPrevious = this.children.cancelPrevious.getView();
    const executeId = genRandomKey();
    latestExecution[queryId] = executeId;
    this.children.confirmationModal
      .getView()(() => {
        this.dispatch(
          multiChangeAction({
            isFetching: this.children.isFetching.changeValueAction(true),
            lastQueryStartTime: this.children.lastQueryStartTime.changeValueAction(startTime),
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
          if (cancelPrevious && latestExecution[queryId] !== executeId) {
            promiseParams &&
              promiseParams.reject(new Error("The result of this query was ignored."));
            return;
          }
          this.processResult(result, action, startTime);
          if (result.success ?? true) {
            promiseParams && promiseParams.resolve(result.data);
          } else {
            promiseParams && promiseParams.reject({ message: result.message ?? "" });
          }
        },
        (error) => {
          if (axios.isCancel(error)) {
            return;
          }
          if (!cancelPrevious || latestExecution[queryId] === executeId) {
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
          }
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

  id(): string {
    return this.name();
  }

  name(): string {
    return this.children.name.getView();
  }

  icon(): ReactNode {
    const type = this.children.compType.getView();
    let method = undefined;
    if (type === "restApi") {
      const childComp = this.children.comp as HttpQuery;
      method = childComp.getHttpMethod();
    }
    return <DataSourceIcon dataSourceType={type} httpMethod={method} />;
  }

  order(): number {
    return this.children.order.getView();
  }
};

QueryCompTmp = withMethodExposing(QueryCompTmp, [
  {
    method: {
      name: "run",
      params: [{ name: "args", type: "JSON" }],
    },
    execute: (comp, params) => {
      return getPromiseAfterDispatch(
        comp.dispatch,
        executeQueryAction({
          args: params[0] as Record<string, unknown> | undefined,
        }),
        { notHandledError: trans("query.fixedDelayError") }
      );
    },
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
  new NameConfig("triggerType", trans("query.triggerTypeExportDesc")),
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

  autoSelectAfterCreate(): boolean {
    return true;
  }

  genNewName(editorState: EditorState) {
    const name = editorState.getNameGenerator().genItemName("query");
    return name;
  }

  select(editorState: EditorState, id: string) {
    editorState.setSelectedBottomRes(id, BottomResTypeEnum.Query);
  }

  add(editorState: EditorState, extraInfo?: any) {
    const id = genQueryId();
    const name = this.genNewName(editorState);
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
        {
          compInfos: [
            {
              type: "add",
              compName: name,
              compType: compType,
            },
          ],
        }
      )
    );
    this.select(editorState, name);
    return name;
  }

  copy(editorState: EditorState, name: string) {
    const queryComps = this.getView();
    const index = queryComps.findIndex((i) => i.children.name.getView() === name);
    const originQuery = queryComps[index];
    if (!originQuery) {
      return;
    }
    const newQueryName = this.genNewName(editorState);
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
        {
          compInfos: [
            {
              type: "add",
              compName: name,
              compType: originQuery.children.compType.getView(),
            },
          ],
        }
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
      wrapActionExtraInfo(this.deleteAction(toDelQueryIndex), {
        compInfos: [
          {
            type: "delete",
            compName: toDelQuery.children.name.getView(),
            compType: toDelQuery.children.compType.getView(),
          },
        ],
      })
    );
    message.success(trans("query.deleteSuccessMessage", { undoKey }));
  }

  items() {
    return this.getView() as unknown as BottomResComp[];
  }
}

export { QueryListComp };
