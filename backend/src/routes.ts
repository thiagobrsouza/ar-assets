import { Router } from "express";
import { manufacturerRoute } from "./controllers/manufacturer.controller";
import { typeRoute } from "./controllers/type.controller";
import { modelRoute } from "./controllers/model.controller";

export const routes = Router();

routes.use(manufacturerRoute);
routes.use(typeRoute);
routes.use(modelRoute);