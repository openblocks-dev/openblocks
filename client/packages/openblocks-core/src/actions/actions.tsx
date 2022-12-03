import { JSONValue } from "util/jsonTypes";
import _ from "lodash";
import {
  CompAction,
  ActionContextType,
  ActionExtraInfo,
  AddChildAction,
  BroadcastAction,
  ChangeValueAction,
  CompActionTypes,
  CustomAction,
  ExecuteQueryAction,
  MultiChangeAction,
  RenameAction,
  RouteByNameAction,
  SimpleCompAction,
  UpdateActionContextAction,
  UpdateNodesV2Action,
  TriggerModuleEventAction,
  ReplaceCompAction,
} from "./actionTypes";
import { CompConstructor } from "baseComps/comp";

export function customAction<DataType>(value: DataType): CustomAction<DataType> {
  return {
    type: CompActionTypes.CUSTOM,
    path: [],
    value: value,
  };
}

export function updateActionContextAction(
  context: ActionContextType
): BroadcastAction<UpdateActionContextAction> {
  const value: UpdateActionContextAction = {
    type: CompActionTypes.UPDATE_ACTION_CONTEXT,
    path: [],
    context: context,
  };
  return {
    type: CompActionTypes.BROADCAST,
    path: [],
    action: value,
  };
}

/**
 * check if it's current custom action.
 * keep type safe via generics, users should keep type the same as T, otherwise may cause bug.
 */
export function isMyCustomAction<T>(action: CompAction, type: string): action is CustomAction<T> {
  return !isChildAction(action) && isCustomAction(action, type);
}

export function isCustomAction<T>(action: CompAction, type: string): action is CustomAction<T> {
  return action.type === CompActionTypes.CUSTOM && _.get(action.value, "type") === type;
}

/**
 * The action of execute query.
 * path route to the query exactly.
 * RootComp will change the path correctly when queryName is passed.
 */
export function executeQueryAction(props: {
  args?: Record<string, unknown>;
  afterExecFunc?: () => void;
}): ExecuteQueryAction {
  return {
    type: CompActionTypes.EXECUTE_QUERY,
    path: [],
    ...props,
  };
}

export function triggerModuleEventAction(name: string): TriggerModuleEventAction {
  return {
    type: CompActionTypes.TRIGGER_MODULE_EVENT,
    path: [],
    name,
  };
}

/**
 * better to use comp.dispatchChangeValueAction to keep type safe
 */
export function changeValueAction(value: JSONValue): ChangeValueAction {
  return {
    type: CompActionTypes.CHANGE_VALUE,
    path: [],
    value: value,
  };
}

export function isBroadcastAction<T extends CompAction>(
  action: CompAction,
  type: T["type"]
): action is BroadcastAction<T> {
  return action.type === CompActionTypes.BROADCAST && _.get(action.action, "type") === type;
}

export function renameAction(oldName: string, name: string): BroadcastAction<RenameAction> {
  const value: RenameAction = {
    type: CompActionTypes.RENAME,
    path: [],
    oldName: oldName,
    name: name,
  };
  return {
    type: CompActionTypes.BROADCAST,
    path: [],
    action: value,
  };
}

export function routeByNameAction(name: string, action: CompAction<any>): RouteByNameAction {
  return {
    type: CompActionTypes.ROUTE_BY_NAME,
    path: [],
    name: name,
    action: action,
  };
}

export function addChildAction(key: string, value: JSONValue): AddChildAction {
  return {
    type: CompActionTypes.ADD_CHILD,
    path: [],
    key: key,
    value: value,
  };
}

export function multiChangeAction(changes: Record<string, CompAction>): MultiChangeAction {
  return {
    type: CompActionTypes.MULTI_CHANGE,
    path: [],
    changes: changes,
  };
}

export function deleteCompAction(): SimpleCompAction {
  return {
    type: CompActionTypes.DELETE_COMP,
    path: [],
  };
}

export function replaceCompAction(compFactory: CompConstructor): ReplaceCompAction {
  return {
    type: CompActionTypes.REPLACE_COMP,
    path: [],
    compFactory: compFactory,
  };
}

export function onlyEvalAction(): SimpleCompAction {
  return {
    type: CompActionTypes.ONLY_EVAL,
    path: [],
  };
}

export function wrapChildAction(childName: string, action: CompAction): CompAction {
  return {
    ...action,
    path: [childName, ...action.path],
  };
}

export function isChildAction(action: CompAction): boolean {
  return (action?.path?.length ?? 0) > 0;
}

export function unwrapChildAction(action: CompAction): [string, CompAction] {
  return [action.path[0], { ...action, path: action.path.slice(1) }];
}

export function changeChildAction(childName: string, value: JSONValue): CompAction {
  return wrapChildAction(childName, changeValueAction(value));
}

export function updateNodesV2Action(value: any): UpdateNodesV2Action {
  return {
    type: CompActionTypes.UPDATE_NODES_V2,
    path: [],
    value: value,
  };
}

export function wrapActionExtraInfo<T extends CompAction>(
  action: T,
  extraCompInfos: ActionExtraInfo["compInfos"]
): T {
  return { ...action, extraInfo: { compInfos: extraCompInfos } };
}

export function deferAction<T extends CompAction>(action: T): T {
  return { ...action, priority: "defer" };
}
