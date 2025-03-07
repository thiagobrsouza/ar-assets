import { Router } from "express";
import { manufacturerRoute } from "./controllers/manufacturer.controller";
import { typeRoute } from "./controllers/type.controller";
import { modelRoute } from "./controllers/model.controller";
import { customerRoute } from "./controllers/customer.controller";
import { locationRoute } from "./controllers/location.controller";

export const routes = Router();

routes.use(manufacturerRoute);
routes.use(typeRoute);
routes.use(modelRoute);
routes.use(customerRoute);
routes.use(locationRoute);