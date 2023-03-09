import { Request, Response, NextFunction } from "express";
import { evalFunc, getErrorMessage } from "../eval/evalScript";
import { QueryApi } from "../api/queryApi";

type EvalRequest = {
  jsCode?: string;
  context?: any;
};

type EvalResult = {
  result?: any;
  error?: string;
};

type BatchEvalRequest = {
  requests?: EvalRequest[];
};

type BatchEvalResult = {
  results?: EvalResult[];
  error?: string;
};

async function evalJs(req: EvalRequest, cookie?: string): Promise<EvalResult> {
  const runQueryLibrary = (query: string, params?: Record<string, any>) =>
    QueryApi.executeQuery(
      {
        libraryQueryName: query,
        params:
          typeof params === "object" && params !== null
            ? Object.entries(params).map(([key, value]) => ({ key, value }))
            : undefined,
      },
      cookie
    ).then((r) => {
      const data = r.data;
      if (data.success) {
        return Promise.resolve(data.data);
      }
      return Promise.reject(new Error(`API failed. code:${data.code} message:${data.message}`));
    });
  try {
    return { result: await evalFunc(req.jsCode || "", { ...req.context, runQueryLibrary }) };
  } catch (e) {
    console.error("get error when eval js:", e);
    return { error: getErrorMessage(e) };
  }
}

async function batchEvalJs(req: BatchEvalRequest, cookie?: string): Promise<BatchEvalResult> {
  const requests = req.requests;
  if (!Array.isArray(requests)) {
    return { error: "No requests" };
  }
  return { results: await Promise.all(requests.map((r) => evalJs(r, cookie))) };
}

const runJavascript = async (req: Request, res: Response, next: NextFunction) => {
  const ret = await evalJs(req.body, req.headers.cookie);
  return res.status(200).json(ret);
};

const batchRunJavascript = async (req: Request, res: Response, next: NextFunction) => {
  const ret = await batchEvalJs(req.body, req.headers.cookie);
  return res.status(200).json(ret);
};

export default { runJavascript, batchRunJavascript };
