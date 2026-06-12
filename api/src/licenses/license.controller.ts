import { Router } from "express";
import { LicenseService } from "./license.service";

const service = new LicenseService();
const licenseRouter = Router();

licenseRouter.post('/licenses', async (req, res) => {
    const license = await service.create(req.body);
    res.json(license).status(201);
});

licenseRouter.get('/licenses', async (req, res) => {
    const licenses = await service.findAll();
    res.json(licenses);
});

licenseRouter.get('/licenses/:id', async (req, res) => {
    const license = await service.findById(req.params.id);
    res.json(license);
});

licenseRouter.put('/licenses/:id', async (req, res) => {
    const license = await service.update(req.params.id, req.body);
    res.json(license);
});

licenseRouter.delete('/licenses/:id', async (req, res) => {
    await service.delete(req.params.id);
    res.status(204).send();
});

export {
    licenseRouter
}