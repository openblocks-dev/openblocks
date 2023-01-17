import _ from "lodash";
import { toString, toNumber, toBoolean } from "../common/util";
import { getDynamicStringSegments, isDynamicSegment } from "openblocks-core";
import plugins from "../plugins";
import { Config, DataSourcePluginMeta, PluginContext } from "openblocks-sdk/dataSource";
import { ServiceError } from "../common/error";
import { Request } from "express";

function isReadOnlyArray(obj: any): obj is readonly any[] {
  return Array.isArray(obj);
}

type EvalContext = { key: string; value: any }[];

function evalCodeToValue(dsl: any, context: EvalContext) {
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
    return contextMap[segmentRaw];
  });

  return values.length === 1 ? values[0] : values.join("");
}

export function evalToValue<T extends Config>(config: T, dsl: any, context: EvalContext): any {
  if (isReadOnlyArray(config)) {
    const result: any = {};
    config.map((item) => {
      result[item.key] = evalToValue(item, _.get(dsl, item.key), context);
    });
    return result;
  }

  if (config.type === "query") {
    const commandType = dsl["actionName"];
    for (const child of config.actions) {
      if (child.actionName === commandType) {
        return {
          actionName: commandType,
          ...evalToValue(child.params, dsl["action"], context),
        };
      }
    }
    throw new ServiceError(
      `invalid query dsl, command type ${commandType} not defined in plugin`,
      400
    );
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

  throw new ServiceError(`invalid plugin definition, unknown config type: ${(config as any).type}`);
}

const PLUGIN_NAME_PREFIX = "plugin:";

export function getPlugin(id: string, ctx: PluginContext) {
  if (!id.startsWith(PLUGIN_NAME_PREFIX)) {
    throw new ServiceError(`invalid plugin name: ${id}`, 400);
  }
  const realPluginName = id.substring(PLUGIN_NAME_PREFIX.length);
  for (const item of plugins) {
    if (typeof item === "function") {
      const plugin = item(ctx);
      if (plugin.id === realPluginName) {
        return plugin;
      }
      continue;
    }
    if (item.id === realPluginName) {
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

export function listPlugins(ctx: PluginContext) {
  const pluginMetaList: DataSourcePluginMeta[] = plugins.map((i) => {
    const plugin = typeof i === "function" ? i(ctx) : i;
    return {
      ..._.omit(plugin, ["run", "validateDataSourceConfig"]),
      id: `${PLUGIN_NAME_PREFIX}${plugin.id}`,
      shouldValidateDataSourceConfig: !!plugin.validateDataSourceConfig,
    };
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
  const action = evalToValue(plugin.queryConfig, dsl, context);
  const result = await plugin.run(action, dataSourceConfig, pluginContext);

  return {
    result,
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
