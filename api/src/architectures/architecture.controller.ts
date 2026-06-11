import { Router } from "express";
import { ArchitectureService } from "./architecture.service";

const service = new ArchitectureService();
const architectureRouter = Router();

architectureRouter.post('/architectures', async (req, res) => {
    const architecture = await service.create(req.body);
    res.json(architecture).status(201);
});

architectureRouter.get('/architectures', async (req, res) => {
    const architectures = await service.findAll();
    res.json(architectures);
});

architectureRouter.get('/architectures/:id', async (req, res) => {
    const architecture = await service.findById(req.params.id);
    res.json(architecture);
});

architectureRouter.put('/architectures/:id', async (req, res) => {
    const architecture = await service.update(req.params.id, req.body);
    res.json(architecture);
});

architectureRouter.delete('/architectures/:id', async (req, res) => {
    await service.delete(req.params.id);
    res.status(204).send();
});

export {
    architectureRouter
}