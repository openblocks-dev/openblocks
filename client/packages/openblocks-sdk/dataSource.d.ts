type KeysNotMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? never : K }[keyof T];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

type CommonParamType = "textInput" | "numberInput" | "select";
type DataSourceParamType = CommonParamType | "password" | "checkbox";
type ActionParamType = CommonParamType | "booleanInput" | "switch";

type ParamTypeToValueType<T extends DataSourceParamType | ActionParamType> = T extends
  | "textInput"
  | "select"
  | "password"
  ? string
  : T extends "numberInput"
  ? number
  : T extends "checkbox" | "booleanInput" | "switch"
  ? boolean
  : never;

interface CommonParamConfig<T extends DataSourceParamType | ActionParamType> {
  type: T;
  defaultValue?: ParamTypeToValueType<T>;
  label?: string;
  tooltip?: string;
  placeholder?: string;
}

// ---- Data Source Param Config ----

interface DataSourceCommonParamConfig<T extends DataSourceParamType> extends CommonParamConfig<T> {
  rules?: readonly ParamRule[];
}

interface DataSourceTextInputParamConfig extends DataSourceCommonParamConfig<"textInput"> {}
interface DataSourcePasswordInputParamConfig extends DataSourceCommonParamConfig<"password"> {}
interface DataSourceNumberInputParamConfig extends DataSourceCommonParamConfig<"numberInput"> {}
interface DataSourceCheckboxParamConfig extends DataSourceCommonParamConfig<"checkbox"> {}
interface DataSourceSelectParamConfig extends DataSourceCommonParamConfig<"select"> {
  options: readonly ParamOption[];
}

type B = DataSourceCheckboxParamConfig["defaultValue"];

// ---- Action Param Config ----

interface ActionCommonParamConfig<T extends ActionParamType> extends CommonParamConfig<T> {}
interface ActionTextInputParamConfig extends ActionCommonParamConfig<"textInput"> {}
interface ActionNumberInputParamConfig extends ActionCommonParamConfig<"numberInput"> {}
interface ActionBooleanInputParamConfig extends ActionCommonParamConfig<"booleanInput"> {}
interface ActionSwitchParamConfig extends ActionCommonParamConfig<"switch"> {}
interface ActionSelectParamConfig extends ActionCommonParamConfig<"select"> {
  options: readonly ParamOption[];
}

type KeyedConfigToDataType<X extends KeyedParamConfig> = X extends KeyedParamConfig<
  infer C,
  infer K
>
  ? {
      [key in K]: ConfigToType<C>;
    }
  : never;

type ActionConfigToDataType<X extends ActionConfig> = X extends ActionConfig<infer C, infer K>
  ? ConfigToType<C> & {
      actionName: K;
    }
  : never;

export type ActionConfig<
  C extends Config = readonly ActionParamConfig[],
  K extends string = string
> = {
  actionName: K;
  label: string;
  params: C;
};

export interface QueryConfig {
  type: "query";
  label?: string;
  tooltip?: string;
  actions: readonly ActionConfig[];
}

export interface DataSourceConfig {
  type: "dataSource";
  params: readonly DataSourceParamConfig[];
}

// ---

type StringParamConfig =
  | DataSourceTextInputParamConfig
  | DataSourceSelectParamConfig
  | DataSourcePasswordInputParamConfig
  | ActionTextInputParamConfig
  | ActionSelectParamConfig;

type NumberParamConfig = DataSourceNumberInputParamConfig | ActionNumberInputParamConfig;

type BooleanParamConfig =
  | DataSourceCheckboxParamConfig
  | ActionBooleanInputParamConfig
  | ActionSwitchParamConfig;

type SimpleParamConfig = StringParamConfig | NumberParamConfig | BooleanParamConfig;

type KeyedParamConfig<C extends Config = SimpleParamConfig, K extends string = string> = C & {
  key: K;
};

type ParamType<T extends { type: string }> = T extends { type: infer K } ? K : never;

export type DataSourceParamType = ParamType<DataSourceParamConfig>;
export type ActionParamType = ParamType<ActionParamConfig>;

export type DataSourceParamConfig = KeyedParamConfig<
  | DataSourceCheckboxParamConfig
  | DataSourceNumberInputParamConfig
  | DataSourcePasswordInputParamConfig
  | DataSourceTextInputParamConfig
  | DataSourceSelectParamConfig
>;

export type ActionParamConfig = KeyedParamConfig<
  | ActionTextInputParamConfig
  | ActionNumberInputParamConfig
  | ActionBooleanInputParamConfig
  | ActionSelectParamConfig
  | ActionSwitchParamConfig
>;

export type ArrayParamConfig = readonly KeyedParamConfig<
  ActionParamConfig | DataSourceParamConfig
>[];

export type ActionArrayParamConfig = readonly KeyedParamConfig<ActionParamConfig>[];

export type Config = KeyedParamConfig | ArrayParamConfig | QueryConfig | DataSourceConfig;

export type ConfigToType<T extends Config> = T extends StringParamConfig
  ? string
  : T extends NumberParamConfig
  ? number
  : T extends BooleanParamConfig
  ? boolean
  : T extends ArrayParamConfig
  ? UnionToIntersection<KeyedConfigToDataType<T[number]>>
  : T extends QueryConfig
  ? ActionConfigToDataType<T["actions"][number]>
  : T extends DataSourceConfig
  ? ConfigToType<T["params"]>
  : never;

export interface ParamOption {
  value: string;
  label: string;
}

export type FieldRuleType =
  | "string"
  | "number"
  | "boolean"
  | "method"
  | "regexp"
  | "integer"
  | "float"
  | "object"
  | "enum"
  | "date"
  | "url"
  | "hex"
  | "email";

export interface ParamRule {
  warningOnly?: boolean;
  enum?: any[];
  len?: number;
  max?: number;
  message?: string | ReactElement;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  type?: FieldRuleType;
  whitespace?: boolean;
}

export interface ValidateDataSourceConfigResult {
  success: boolean;
  message?: string;
}

export interface PluginContext {
  languages: string[];
}

export interface DataSourcePlugin<ActionDataType = any, DataSourceConfigType = any> {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category: string;
  dataSourceConfig: DataSourceConfig;
  queryConfig: QueryConfig;

  validateDataSourceConfig?: (
    dataSourceConfig: DataSourceConfigType,
    context: PluginContext
  ) => Promise<ValidateDataSourceConfigResult>;

  run: (
    actionData: ActionDataType,
    dataSourceConfig: DataSourceConfigType,
    context: PluginContext
  ) => Promise<any>;
}

export type DataSourcePluginFactory<ActionDataType = any, DataSourceConfigType = any> = (
  context: PluginContext
) => DataSourcePlugin<ActionDataType, DataSourceConfigType>;

export interface DataSourcePluginMeta
  extends Omit<DataSourcePlugin, "run" | "validateDataSourceConfig"> {
  shouldValidateDataSourceConfig: boolean;
}
