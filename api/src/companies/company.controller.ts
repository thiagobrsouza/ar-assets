import { Router } from "express";
import { CompanyService } from "./company.service";

const service = new CompanyService();
const companyRouter = Router();

companyRouter.post('/companies', async (req, res) => {
    const company = await service.create(req.body);
    res.json(company).status(201);
});

companyRouter.get('/companies', async (req, res) => {
    const companies = await service.findAll();
    res.json(companies);
});

companyRouter.get('/companies/:id', async (req, res) => {
    const company = await service.findById(req.params.id);
    res.json(company);
});

companyRouter.put('/companies/:id', async (req, res) => {
    const company = await service.update(req.params.id, req.body);
    res.json(company);
});

companyRouter.delete('/companies/:id', async (req, res) => {
    await service.delete(req.params.id);
    res.status(204).send();
});

export {
    companyRouter
}