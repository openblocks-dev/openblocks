import { badRequest } from "../common/error";
import { Request, Response } from "express";
import _ from "lodash";
import { Config } from "openblocks-sdk/dataSource";
import * as pluginServices from "../services/plugin";

export async function listPlugins(req: Request, res: Response) {
  let ids = req.query["id"] || [];
  if (typeof ids === "string") {
    ids = [ids];
  }
  const ctx = pluginServices.getPluginContext(req);
  const result = pluginServices.listPlugins(ctx, ids as string[]);
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

type GetDynamicDefReqBody = {
  pluginName: string;
  path: string;
  dataSourceConfig: any;
}[];

export async function getDynamicDef(req: Request, res: Response) {
  const ctx = pluginServices.getPluginContext(req);
  if (!Array.isArray(req.body)) {
    throw badRequest("request body is not a valid array");
  }
  const fields = req.body as GetDynamicDefReqBody;
  const result: Config[] = [];
  for (const item of fields) {
    const def = await pluginServices.getDynamicConfigDef(
      item.pluginName,
      item.path,
      item.dataSourceConfig,
      ctx
    );
    result.push(def);
  }
  return res.status(200).json(result);
}
