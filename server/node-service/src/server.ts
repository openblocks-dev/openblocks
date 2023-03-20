import http from "http";
import "./common/logger";
import "express-async-errors";
import express, { Response, Request, NextFunction } from "express";
import { ServiceError } from "./common/error";
import path from "node:path";
import morgan from "morgan";
import { collectDefaultMetrics } from "prom-client";
import apiRouter from "./routes/apiRouter";
import systemRouter from "./routes/systemRouter";
collectDefaultMetrics();

const prefix = "/node-service";

const router = express();

/** Static */
router.use(prefix, express.static(path.join(__dirname, "static")));

/** Logging */
router.use(morgan("dev"));

/** Parse the request */
router.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
router.use(
  express.json({
    limit: 1024 * 1024 * 50, // 50 MB
  })
);

/** RULES OF OUR API */
router.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,PATCH,DELETE,POST");
    return res.status(200).json({});
  }
  next();
});

/** Routes */
router.use(`${prefix}/api`, apiRouter);
router.use(`${prefix}/system`, systemRouter);

// service err
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  let message = err.message || "";
  let status = 500;
  console.error(err);
  if (err instanceof ServiceError) {
    status = err.code;
    message = err.message;
  }
  res.status(status).json({
    message,
  });
});

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT = process.env.NODE_SERVICE_PORT ?? 6060;
httpServer.listen(PORT, () => logger.info(`The server is running on port: ${PORT}`));
