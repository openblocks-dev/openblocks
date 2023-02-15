import _ from "lodash";
import { toString, toNumber, toBoolean, toJsonValue, toStringOrJson } from "../common/util";
import { getDynamicStringSegments, isDynamicSegment } from "openblocks-core";
import jsonPath from "jsonpath";
import plugins from "../plugins";
import {
  Config,
  DataSourcePlugin,
  DataSourcePluginMeta,
  DynamicConfig,
  DynamicConfigObject,
  MixedConfig,
  PluginContext,
} from "openblocks-sdk/dataSource";
import { badRequest, ServiceError } from "../common/error";
import { Request } from "express";

function isReadOnlyArray(obj: any): obj is readonly any[] {
  return Array.isArray(obj);
}

type EvalContext = { key: string; value: any }[];

export function evalCodeToValue(dsl: string, context: EvalContext) {
  if (!dsl) {
    return undefined;
  }

  if (typeof dsl !== "string") {
    return dsl;
  }

  const contextMap = Object.fromEntries(context.map((i) => [i.key, i.value]));

  // copy from string2Fn Parser
  const values = getDynamicStringSegments(dsl).map((segment) => {
    if (!isDynamicSegment(segment)) {
      return segment;
    }
    const segmentRaw = segment.slice(2, -2);
    return JSON.stringify(contextMap[segmentRaw]);
  });

  return values.join("");
}

export async function evalToValue<T extends Config>(
  cfg: T,
  dsl: any,
  context: EvalContext,
  dataSourceData: any
): Promise<any> {
  const config = isDynamicConfig(cfg) ? await cfg(dataSourceData) : cfg;

  if (isReadOnlyArray(config)) {
    const result: Record<string, any> = {};
    for (const item of config) {
      result[item.key] = await evalToValue(item, _.get(dsl, item.key), context, dataSourceData);
    }
    return result;
  }

  if (config.type === "query") {
    const actionName = dsl["actionName"];
    const action = config.actions.find((i) => i.actionName === actionName);
    if (!action) {
      throw badRequest(`invalid query dsl, the action name ${actionName} not defined in plugin`);
    }
    const actionDsl = dsl["action"];
    const actionCompValue = await evalToValue(action.params, actionDsl, context, dataSourceData);
    return {
      actionName,
      ...actionCompValue,
    };
  }

  if (config.type === "textInput" || config.type === "select" || config.type === "password") {
    return toString(evalCodeToValue(dsl, context));
  }

  if (config.type === "numberInput") {
    return toNumber(evalCodeToValue(dsl, context));
  }

  if (config.type === "booleanInput" || config.type === "switch" || config.type === "checkbox") {
    return toBoolean(evalCodeToValue(dsl, context));
  }

  if (config.type === "jsonInput") {
    return toJsonValue(evalCodeToValue(dsl, context));
  }

  if (config.type === "file") {
    return toStringOrJson(evalCodeToValue(dsl, context));
  }

  throw new ServiceError(`invalid plugin definition, unknown config type: ${(config as any).type}`);
}

export function getPlugin(id: string, ctx: PluginContext) {
  for (const item of plugins) {
    if (typeof item === "function") {
      const plugin = item(ctx);
      if (plugin.id === id) {
        return plugin;
      }
      continue;
    }
    if (item.id === id) {
      return item;
    }
  }
  throw new ServiceError(`plugin not found: ${id}`, 400);
}

export function getPluginContext(req: Request): PluginContext {
  return {
    languages: req.acceptsLanguages(),
  };
}

async function getQueryConfig(plugin: DataSourcePlugin, dataSourceConfig: any = {}) {
  if (typeof plugin.queryConfig === "function") {
    return plugin.queryConfig(dataSourceConfig);
  }
  return plugin.queryConfig;
}

function isDynamicConfig(config: MixedConfig): config is DynamicConfig {
  return typeof config === "function";
}

function maybeDynamicConfig<T extends MixedConfig>(config: T): T | DynamicConfigObject {
  if (isDynamicConfig(config)) {
    return {
      type: "dynamic",
    };
  }
  return config;
}

function removeFromJson() {
  return undefined;
}

const pluginMetaOps: [string, (v: any) => any][] = [
  ["$.queryConfig", maybeDynamicConfig],
  ["$.dataSourceConfig.extra", maybeDynamicConfig],
  ["$.validateDataSourceConfig", removeFromJson],
  ["$.run", removeFromJson],
];
export function listPlugins(ctx: PluginContext, ids: string[] = []) {
  const pluginMetaList: DataSourcePluginMeta[] = [];

  plugins.forEach((i) => {
    const plugin = typeof i === "function" ? i(ctx) : _.cloneDeep(i);
    if (ids.length > 0 && !ids.includes(plugin.id)) {
      return;
    }
    pluginMetaOps.forEach(([path, fn]) => {
      jsonPath.apply(plugin, path, fn);
    });
    pluginMetaList.push({
      ...plugin,
      shouldValidateDataSourceConfig: !!plugin.validateDataSourceConfig,
    } as DataSourcePluginMeta);
  });

  return pluginMetaList;
}

export async function runPluginQuery(
  pluginName: string,
  dsl: any,
  context: EvalContext = [],
  dataSourceConfig: any = {},
  pluginContext: PluginContext
) {
  const plugin = getPlugin(pluginName, pluginContext);
  const queryConfig = await getQueryConfig(plugin, dataSourceConfig);
  const action = await evalToValue(queryConfig, dsl, context, dataSourceConfig);
  const result = await plugin.run(action, dataSourceConfig, pluginContext);

  return {
    result: result || {},
  };
}

export async function validatePluginDataSourceConfig(
  pluginName: string,
  dataSourceConfig: any = {},
  pluginContext: PluginContext
) {
  const plugin = getPlugin(pluginName, pluginContext);
  if (!plugin.validateDataSourceConfig) {
    throw new ServiceError(`plugin not define validateDataSourceConfig func: ${pluginName}`, 400);
  }

  const result = await plugin.validateDataSourceConfig(dataSourceConfig, pluginContext);
  return result;
}

export async function getDynamicConfigDef(
  id: string,
  path: string,
  dataSourceConfig: any,
  ctx: PluginContext
): Promise<Config> {
  const plugin = getPlugin(id, ctx);
  const results = jsonPath.query(plugin, path);
  if (results.length === 0) {
    throw badRequest(`No field found with path ${path} and id ${id}`);
  }
  if (results.length > 1) {
    throw badRequest(`More than one fields found with path ${path} and id ${id}`);
  }

  const targetConfig = results[0];
  if (!isDynamicConfig(targetConfig)) {
    throw badRequest(`Target field is not a dynamic config`);
  }
  return targetConfig(dataSourceConfig);
}
