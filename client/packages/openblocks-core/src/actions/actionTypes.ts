import { CompConstructor } from "baseComps/comp";
import { JSONValue } from "util/jsonTypes";

export enum CompActionTypes {
  CHANGE_VALUE = "CHANGE_VALUE",
  RENAME = "RENAME",
  MULTI_CHANGE = "MULTI_CHANGE",
  ADD_CHILD = "ADD_CHILD",
  DELETE_COMP = "DELETE_COMP",
  REPLACE_COMP = "REPLACE_COMP",
  ONLY_EVAL = "NEED_EVAL",
  ASYNC = "ASYNC",
  ASYNC_END = "ASYNC_END",

  // UPDATE_NODES = "UPDATE_NODES",
  UPDATE_NODES_V2 = "UPDATE_NODES_V2",

  EXECUTE_QUERY = "EXECUTE_QUERY",

  TRIGGER_MODULE_EVENT = "TRIGGER_MODULE_EVENT",

  /**
   * this action can pass data to the comp by name
   */
  ROUTE_BY_NAME = "ROUTE_BY_NAME",

  /**
   * execute action with context. for example, buttons in table's column should has currentRow as context
   * FIXME: this is a broadcast message, better to be improved by a heritage mechanism.
   */
  UPDATE_ACTION_CONTEXT = "UPDATE_ACTION_CONTEXT",

  /**
   * comp-specific action can be placed not globally.
   * use CUSTOM uniformly.
   */
  CUSTOM = "CUSTOM",

  /**
   * broadcast other actions in comp tree structure.
   * used for encapsulate MultiBaseComp
   */
  BROADCAST = "BROADCAST",
}

export type ExtraActionType =
  | "layout"
  | "delete"
  | "add"
  | "modify"
  | "rename"
  | "recover"
  | "upgrade";
export type ActionExtraInfo = {
  compInfos?: {
    compName: string;
    compType: string;
    type: ExtraActionType;
  }[];
};

export type ActionPriority = "sync" | "defer";

interface ActionCommon {
  path: Array<string>;
  skipHistory?: boolean;
  extraInfo?: ActionExtraInfo;
  priority?: ActionPriority;
}

export interface CustomAction<DataType = JSONValue> extends ActionCommon {
  type: CompActionTypes.CUSTOM;
  value: DataType;
}

export interface ChangeValueAction<DataType extends JSONValue = JSONValue> extends ActionCommon {
  type: CompActionTypes.CHANGE_VALUE;
  value: DataType;
}

export interface ReplaceCompAction extends ActionCommon {
  type: CompActionTypes.REPLACE_COMP;
  compFactory: CompConstructor;
}

export interface RenameAction extends ActionCommon {
  type: CompActionTypes.RENAME;
  oldName: string;
  name: string;
}

export interface BroadcastAction<Action extends ActionCommon = ActionCommon> extends ActionCommon {
  type: CompActionTypes.BROADCAST;
  action: Action;
}

export interface MultiChangeAction extends ActionCommon {
  type: CompActionTypes.MULTI_CHANGE;
  changes: Record<string, CompAction>;
}

export interface AddChildAction extends ActionCommon {
  type: CompActionTypes.ADD_CHILD;
  key: string;
  value: JSONValue;
}

export interface SimpleCompAction extends ActionCommon {
  type: CompActionTypes.DELETE_COMP | CompActionTypes.ONLY_EVAL;
}

export interface ExecuteQueryAction extends ActionCommon {
  type: CompActionTypes.EXECUTE_QUERY;
  queryName?: string;
  args?: Record<string, unknown>;
  afterExecFunc?: () => void;
}

export interface TriggerModuleEventAction extends ActionCommon {
  type: CompActionTypes.TRIGGER_MODULE_EVENT;
  name: string;
}

export interface RouteByNameAction extends ActionCommon {
  type: CompActionTypes.ROUTE_BY_NAME;
  name: string;
  action: CompAction<any>;
}

// export interface ExecuteCompAction extends ActionCommon {
//   type: CompActionTypes.EXECUTE_COMP;
//   compName: string;
//   methodName: string;
//   params: Array<string>;
// }

export interface UpdateNodesV2Action extends ActionCommon {
  type: CompActionTypes.UPDATE_NODES_V2;
  value: any;
}

export type ActionContextType = Record<string, unknown>;

export interface UpdateActionContextAction extends ActionCommon {
  type: CompActionTypes.UPDATE_ACTION_CONTEXT;
  context: ActionContextType;
}

export type CompAction<DataType extends JSONValue = JSONValue> =
  | CustomAction<unknown>
  | ChangeValueAction<DataType>
  | BroadcastAction
  | RenameAction
  | ReplaceCompAction
  | AddChildAction
  | MultiChangeAction
  | SimpleCompAction
  | ExecuteQueryAction
  | UpdateActionContextAction
  | RouteByNameAction
  | TriggerModuleEventAction
  | UpdateNodesV2Action;
