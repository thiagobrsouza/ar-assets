import { Router } from "express";
import { companyRouter } from "./companies/company.controller";
import { manufacturerRouter } from "./manufacturers/manufacturer.controller";
import { architectureRouter } from "./architectures/architecture.controller";
import { assetTypeRouter } from "./asset-types/asset-type.controller";

const routes = Router();

routes.use(companyRouter);
routes.use(manufacturerRouter);
routes.use(architectureRouter);
routes.use(assetTypeRouter);

export {
    routes
}