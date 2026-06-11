import { Router } from "express";
import { companyRouter } from "./companies/company.controller";

const routes = Router();

routes.use(companyRouter);

export {
    routes
}