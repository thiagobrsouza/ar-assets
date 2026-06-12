import { Router } from "express";
import { LocationService } from "./location.service";

const service = new LocationService();
const locationRouter = Router();

locationRouter.post('/locations', async (req, res) => {
    const location = await service.create(req.body);
    res.json(location).status(201);
});

locationRouter.get('/locations', async (req, res) => {
    const locations = await service.findAll();
    res.json(locations);
});

locationRouter.get('/locations/:id', async (req, res) => {
    const location = await service.findById(req.params.id);
    res.json(location);
});

locationRouter.put('/locations/:id', async (req, res) => {
    const location = await service.update(req.params.id, req.body);
    res.json(location);
});

locationRouter.delete('/locations/:id', async (req, res) => {
    await service.delete(req.params.id);
    res.status(204).send();
});

export {
    locationRouter
}