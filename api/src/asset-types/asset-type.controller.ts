import { Router } from "express";
import { AssetTypeService } from "./asset-type.service";

const service = new AssetTypeService();
const assetTypeRouter = Router();

assetTypeRouter.post('/asset-types', async (req, res) => {
    const assetType = await service.create(req.body);
    res.json(assetType).status(201);
});

assetTypeRouter.get('/asset-types', async (req, res) => {
    const assetTypes = await service.findAll();
    res.json(assetTypes);
});

assetTypeRouter.get('/asset-types/:id', async (req, res) => {
    const assetType = await service.findById(req.params.id);
    res.json(assetType);
});

assetTypeRouter.put('/asset-types/:id', async (req, res) => {
    const assetType = await service.update(req.params.id, req.body);
    res.json(assetType);
});

assetTypeRouter.delete('/asset-types/:id', async (req, res) => {
    await service.delete(req.params.id);
    res.status(204).send();
});

export {
    assetTypeRouter
}