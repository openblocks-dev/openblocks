type Modify<T, R> = Omit<T, keyof R> & R;
type KeysNotMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? never : K }[keyof T];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

type CommonParamType = "textInput" | "numberInput" | "select" | "keyValueInput";
type DataSourceParamType = CommonParamType | "password" | "checkbox" | "groupTitle";
type ActionParamType =
  | CommonParamType
  | "booleanInput"
  | "switch"
  | "file"
  | "jsonInput"
  | "graphqlInput"
  | "sqlInput";

type ParamTypeToValueType<T extends DataSourceParamType | ActionParamType> = T extends
  | "textInput"
  | "select"
  | "password"
  | "file"
  ? string
  : T extends "keyValueInput"
  ? { key: string; value: any }[]
  : T extends "numberInput"
  ? number
  : T extends "jsonInput"
  ? any
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
  updatable?: boolean;
  rules?: readonly ParamRule[];
}

interface DataSourceTextInputParamConfig extends DataSourceCommonParamConfig<"textInput"> {}
interface DataSourceKeyValueInputParamConfig extends DataSourceCommonParamConfig<"keyValueInput"> {
  valueType?: "json" | "string";
}
interface DataSourcePasswordInputParamConfig extends DataSourceCommonParamConfig<"password"> {}
interface DataSourceNumberInputParamConfig extends DataSourceCommonParamConfig<"numberInput"> {}
interface DataSourceCheckboxParamConfig extends DataSourceCommonParamConfig<"checkbox"> {}
interface DataSourceGroupTitleParamConfig extends DataSourceCommonParamConfig<"groupTitle"> {}
interface DataSourceSelectParamConfig extends DataSourceCommonParamConfig<"select"> {
  options: readonly ParamOption[];
}

type B = DataSourceCheckboxParamConfig["defaultValue"];

// ---- Action Param Config ----

interface ActionCommonParamConfig<T extends ActionParamType> extends CommonParamConfig<T> {}
interface ActionTextInputParamConfig extends ActionCommonParamConfig<"textInput"> {}
interface ActionNumberInputParamConfig extends ActionCommonParamConfig<"numberInput"> {}
interface ActionBooleanInputParamConfig extends ActionCommonParamConfig<"booleanInput"> {}
interface ActionKeyValueInputParamConfig extends ActionCommonParamConfig<"keyValueInput"> {
  valueType?: "json" | "string";
}
interface ActionSwitchParamConfig extends ActionCommonParamConfig<"switch"> {}
interface ActionFileParamConfig extends ActionCommonParamConfig<"file"> {}
interface ActionJSONParamConfig extends ActionCommonParamConfig<"jsonInput"> {}
interface ActionSQLParamConfig extends ActionCommonParamConfig<"sqlInput"> {}
interface ActionGraphQLParamConfig extends ActionCommonParamConfig<"graphqlInput"> {}
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

export type ActionCategoryValue = string | string[];
export interface ActionCategory {
  label: string;
  value: ActionCategoryValue;
  children?: ActionCategory[];
}

export type ActionConfig<
  C extends Config = readonly ActionParamConfig[],
  K extends string = string
> = {
  actionName: K;
  label: string;
  description?: string;
  category?: ActionCategoryValue;
  params: C;
};

export interface QueryConfig {
  type: "query";
  label?: string;
  tooltip?: string;
  categories?: {
    label?: string;
    items?: ActionCategory[];
  };
  actions: readonly ActionConfig[];
}

export type DataSourceConfig<DSC = any> = DataSourceConfigBasicInfo &
  DataSourceConfigFunctions<DSC>;

interface DataSourceConfigBasicInfo {
  type: "dataSource";
  params: readonly DataSourceParamConfig[];
}

interface DataSourceExtraConfig {
  data?: any;
  extraParams?: DataSourceParamConfig[];
}

interface DataSourceConfigFunctions<DSC = any> {
  extra?: (data: DSC) => Promise<DataSourceExtraConfig>;
}

// ---

type StringParamConfig =
  | DataSourceTextInputParamConfig
  | DataSourceSelectParamConfig
  | DataSourcePasswordInputParamConfig
  | ActionTextInputParamConfig
  | ActionSelectParamConfig
  | ActionSQLParamConfig
  | ActionGraphQLParamConfig
  | ActionFileParamConfig;

type NumberParamConfig = DataSourceNumberInputParamConfig | ActionNumberInputParamConfig;

type BooleanParamConfig =
  | DataSourceCheckboxParamConfig
  | ActionBooleanInputParamConfig
  | ActionSwitchParamConfig;

type JsonParamConfig = ActionJSONParamConfig;

type RecordParamConfig = ActionKeyValueInputParamConfig | DataSourceKeyValueInputParamConfig;

type SimpleParamConfig =
  | StringParamConfig
  | NumberParamConfig
  | BooleanParamConfig
  | JsonParamConfig
  | RecordParamConfig
  | NonValueParamConfig;

type NonValueParamConfig = DataSourceGroupTitleParamConfig;

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
  | DataSourceGroupTitleParamConfig
  | DataSourceKeyValueInputParamConfig
>;

export type ActionParamConfig = KeyedParamConfig<
  | ActionTextInputParamConfig
  | ActionNumberInputParamConfig
  | ActionBooleanInputParamConfig
  | ActionSelectParamConfig
  | ActionSwitchParamConfig
  | ActionFileParamConfig
  | ActionJSONParamConfig
  | ActionSQLParamConfig
  | ActionGraphQLParamConfig
  | ActionKeyValueInputParamConfig
>;

export type ArrayParamConfig = readonly KeyedParamConfig<
  ActionParamConfig | DataSourceParamConfig
>[];

export type ActionArrayParamConfig = readonly KeyedParamConfig<ActionParamConfig>[];

export type Config = KeyedParamConfig | ArrayParamConfig | QueryConfig | DataSourceConfig;

export type DynamicConfig = (data: any) => Promise<Config>;

export type MixedConfig = Config | DynamicConfig;

export type ConfigToType<T extends Config> = T extends StringParamConfig
  ? string
  : T extends NumberParamConfig
  ? number
  : T extends BooleanParamConfig
  ? boolean
  : T extends JsonParamConfig
  ? any
  : T extends RecordParamConfig
  ? { key: string; value: any }[]
  : T extends BooleanParamConfig
  ? boolean
  : T extends NonValueParamConfig
  ? never
  : T extends ArrayParamConfig
  ? UnionToIntersection<KeyedConfigToDataType<T[number]>>
  : T extends QueryConfig
  ? ActionConfigToDataType<T["actions"][number]>
  : T extends DataSourceConfig
  ? {
      extra?: any;
      dynamicParamsConfig?: any;
    } & ConfigToType<T["params"]>
  : never;

export interface ParamOption {
  value: string;
  label: string;
  description?: string;
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

export type RunFunc<AC = any, DSC = any> = (
  actionData: AC,
  dataSourceConfig: DSC,
  context: PluginContext
) => Promise<any>;

export type ValidateDataSourceConfigFunc<DSC = any> = (
  dataSourceConfig: DataSourceConfigType,
  context: PluginContext
) => Promise<ValidateDataSourceConfigResult>;

export interface DataSourcePluginBasicInfo {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category: string;
}

export interface DataSourcePlugin<AC = any, DSC = any> extends DataSourcePluginBasicInfo {
  dataSourceConfig: DataSourceConfig<DSC>;
  queryConfig: QueryConfig | ((dataSourceData: DSC) => Promise<QueryConfig>);
  validateDataSourceConfig?: ValidateDataSourceConfigFunc<DSC>;
  run: RunFunc<AC, DSC>;
}

export type DataSourcePluginFactory<ActionDataType = any, DataSourceConfigType = any> = (
  context: PluginContext
) => DataSourcePlugin<ActionDataType, DataSourceConfigType>;

export interface DataSourcePluginMeta extends DataSourcePluginBasicInfo {
  dataSourceConfig: Modify<
    DataSourceConfig,
    {
      extra?: DynamicConfigObject;
    }
  >;
  queryConfig: DynamicConfigObject | QueryConfig;
  shouldValidateDataSourceConfig: boolean;
}

export interface DynamicConfigObject {
  type: "dynamic";
}
