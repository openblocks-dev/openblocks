import { Request, Response } from "express";
import _ from "lodash";
import * as pluginServices from "../services/plugin";

export async function listPlugins(req: Request, res: Response) {
  const ctx = pluginServices.getPluginContext(req);
  const result = pluginServices.listPlugins(ctx);
  return res.status(200).json(result);
}

export async function runPluginQuery(req: Request, res: Response) {
  const { pluginName, dsl, context, dataSourceConfig } = req.body;
  const ctx = pluginServices.getPluginContext(req);
  const result = await pluginServices.runPluginQuery(
    pluginName,
    dsl,
    context,
    dataSourceConfig,
    ctx
  );
  return res.status(200).json(result);
}

export async function validatePluginDataSourceConfig(req: Request, res: Response) {
  const { pluginName, dataSourceConfig } = req.body;
  const ctx = pluginServices.getPluginContext(req);
  const result = await pluginServices.validatePluginDataSourceConfig(
    pluginName,
    dataSourceConfig,
    ctx
  );
  return res.status(200).json(result);
}
