import { CompConstructor } from "baseComps/comp";
import _ from "lodash";
import { JSONValue } from "util/jsonTypes";
import {
  ActionContextType,
  ActionExtraInfo,
  BroadcastAction,
  ChangeValueAction,
  CompAction,
  CompActionTypes,
  CustomAction,
  ExecuteQueryAction,
  MultiChangeAction,
  RenameAction,
  ReplaceCompAction,
  RouteByNameAction,
  SimpleCompAction,
  TriggerModuleEventAction,
  UpdateActionContextAction,
  UpdateNodesV2Action,
} from "./actionTypes";

export function customAction<DataType>(value: DataType, editDSL: boolean): CustomAction<DataType> {
  return {
    type: CompActionTypes.CUSTOM,
    path: [],
    value: value,
    editDSL,
  };
}

export function updateActionContextAction(
  context: ActionContextType
): BroadcastAction<UpdateActionContextAction> {
  const value: UpdateActionContextAction = {
    type: CompActionTypes.UPDATE_ACTION_CONTEXT,
    path: [],
    editDSL: false,
    context: context,
  };
  return {
    type: CompActionTypes.BROADCAST,
    path: [],
    editDSL: false,
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
    editDSL: false,
    ...props,
  };
}

export function triggerModuleEventAction(name: string): TriggerModuleEventAction {
  return {
    type: CompActionTypes.TRIGGER_MODULE_EVENT,
    path: [],
    editDSL: false,
    name,
  };
}

/**
 * better to use comp.dispatchChangeValueAction to keep type safe
 */
export function changeValueAction(value: JSONValue, editDSL: boolean): ChangeValueAction {
  return {
    type: CompActionTypes.CHANGE_VALUE,
    path: [],
    editDSL,
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
    editDSL: true,
    oldName: oldName,
    name: name,
  };
  return {
    type: CompActionTypes.BROADCAST,
    path: [],
    editDSL: true,
    action: value,
  };
}

export function routeByNameAction(name: string, action: CompAction<any>): RouteByNameAction {
  return {
    type: CompActionTypes.ROUTE_BY_NAME,
    path: [],
    name: name,
    editDSL: action.editDSL,
    action: action,
  };
}

export function multiChangeAction(changes: Record<string, CompAction>): MultiChangeAction {
  const editDSL = Object.values(changes).some((action) => !!action.editDSL);
  console.assert(
    Object.values(changes).every(
      (action) => !_.isNil(action.editDSL) && action.editDSL === editDSL
    ),
    `multiChangeAction should wrap actions with the same editDSL value in property. editDSL: ${editDSL}\nchanges:`,
    changes
  );
  return {
    type: CompActionTypes.MULTI_CHANGE,
    path: [],
    editDSL,
    changes: changes,
  };
}

export function deleteCompAction(): SimpleCompAction {
  return {
    type: CompActionTypes.DELETE_COMP,
    path: [],
    editDSL: true,
  };
}

export function replaceCompAction(compFactory: CompConstructor): ReplaceCompAction {
  return {
    type: CompActionTypes.REPLACE_COMP,
    path: [],
    editDSL: false,
    compFactory: compFactory,
  };
}

export function onlyEvalAction(): SimpleCompAction {
  return {
    type: CompActionTypes.ONLY_EVAL,
    path: [],
    editDSL: false,
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

export function changeChildAction(
  childName: string,
  value: JSONValue,
  editDSL: boolean
): CompAction {
  return wrapChildAction(childName, changeValueAction(value, editDSL));
}

export function updateNodesV2Action(value: any): UpdateNodesV2Action {
  return {
    type: CompActionTypes.UPDATE_NODES_V2,
    path: [],
    editDSL: false,
    value: value,
  };
}

export function wrapActionExtraInfo<T extends CompAction>(
  action: T,
  extraInfos: ActionExtraInfo
): T {
  return { ...action, extraInfo: { ...action.extraInfo, ...extraInfos } };
}

export function deferAction<T extends CompAction>(action: T): T {
  return { ...action, priority: "defer" };
}

export function changeEditDSLAction<T extends CompAction>(action: T, editDSL: boolean): T {
  return { ...action, editDSL };
}
