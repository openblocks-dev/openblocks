import express from "express";
import * as pluginControllers from "../controllers/plugins";
import jsControllers from "../controllers/runJavascript";
const router = express.Router();

router.post("/runJs", jsControllers.runJavascript);
router.post("/batchRunJs", jsControllers.batchRunJavascript);

router.get("/plugins", pluginControllers.listPlugins);
router.post("/runPluginQuery", pluginControllers.runPluginQuery);
router.post("/getPluginDynamicConfig", pluginControllers.getDynamicDef);
router.post("/validatePluginDataSourceConfig", pluginControllers.validatePluginDataSourceConfig);

export default router;
