import { Router } from "express";
import { AssetModelService } from "./asset-model.service";

const service = new AssetModelService();
const assetModelRouter = Router();

assetModelRouter.post('/asset-models', async (req, res) => {
    const assetModel = await service.create(req.body);
    res.json(assetModel).status(201);
});

assetModelRouter.get('/asset-models', async (req, res) => {
    const assetModels = await service.findAll();
    res.json(assetModels);
});

assetModelRouter.get('/asset-models/:id', async (req, res) => {
    const assetModel = await service.findById(req.params.id);
    res.json(assetModel);
});

assetModelRouter.put('/asset-models/:id', async (req, res) => {
    const assetModel = await service.update(req.params.id, req.body);
    res.json(assetModel);
});

assetModelRouter.delete('/asset-models/:id', async (req, res) => {
    await service.delete(req.params.id);
    res.status(204).send();
});

export {
    assetModelRouter
}