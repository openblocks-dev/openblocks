import express from "express";
import * as pluginControllers from "../controllers/plugins";
import jsControllers from "../controllers/runJavascript";

const apiRouter = express.Router();

apiRouter.post("/runJs", jsControllers.runJavascript);
apiRouter.post("/batchRunJs", jsControllers.batchRunJavascript);

apiRouter.get("/plugins", pluginControllers.listPlugins);
apiRouter.post("/runPluginQuery", pluginControllers.runPluginQuery);
apiRouter.post("/getPluginDynamicConfig", pluginControllers.getDynamicDef);
apiRouter.post("/validatePluginDataSourceConfig", pluginControllers.validatePluginDataSourceConfig);

export default apiRouter;
