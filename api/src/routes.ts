import { Router } from "express";
import { companyRouter } from "./companies/company.controller";
import { manufacturerRouter } from "./manufacturers/manufacturer.controller";
import { architectureRouter } from "./architectures/architecture.controller";
import { assetTypeRouter } from "./asset-types/asset-type.controller";
import { locationRouter } from "./locations/location.controller";
import { assetModelRouter } from "./asset-models/asset-model.controller";

const routes = Router();

routes.use(companyRouter);
routes.use(manufacturerRouter);
routes.use(architectureRouter);
routes.use(assetTypeRouter);
routes.use(locationRouter);
routes.use(assetModelRouter);

export {
    routes
}