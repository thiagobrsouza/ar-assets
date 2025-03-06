import { Router } from "express";
import { manufacturerRoute } from "./controllers/manufacturer.controller";

export const routes = Router();

routes.use(manufacturerRoute);