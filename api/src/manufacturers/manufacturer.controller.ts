import { Router } from "express";
import { ManufacturerService } from "./manufacturer.service";

const service = new ManufacturerService();
const manufacturerRouter = Router();

manufacturerRouter.post('/manufacturers', async (req, res) => {
    const manufacturer = await service.create(req.body);
    res.json(manufacturer).status(201);
});

manufacturerRouter.get('/manufacturers', async (req, res) => {
    const manufacturers = await service.findAll();
    res.json(manufacturers);
});

manufacturerRouter.get('/manufacturers/:id', async (req, res) => {
    const manufacturer = await service.findById(req.params.id);
    res.json(manufacturer);
});

manufacturerRouter.put('/manufacturers/:id', async (req, res) => {
    const manufacturer = await service.update(req.params.id, req.body);
    res.json(manufacturer);
});

manufacturerRouter.delete('/manufacturers/:id', async (req, res) => {
    await service.delete(req.params.id);
    res.status(204).send();
});

export {
    manufacturerRouter
}