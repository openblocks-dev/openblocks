import { Request, Response } from "express";
import { register } from "prom-client";
import _ from "lodash";

export async function prometheus(req: Request, res: Response) {
  const metrics = await register.metrics();
  res.send(metrics);
}

export async function status(req: Request, res: Response) {
  res.json({
    ok: true,
  });
}
