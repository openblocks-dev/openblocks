import express from "express";
import * as systemControllers from "../controllers/system";

const systemRouter = express.Router();

systemRouter.get("/prometheus", systemControllers.prometheus);

export default systemRouter;
