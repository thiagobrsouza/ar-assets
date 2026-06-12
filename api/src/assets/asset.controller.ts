import { Router } from "express";
import { AssetService } from "./asset.service";

const service = new AssetService();
const assetRouter = Router();

assetRouter.post('/assets', async (req, res) => {
    const asset = await service.create(req.body);
    res.json(asset).status(201);
});

assetRouter.get('/assets', async (req, res) => {
    const assets = await service.findAll();
    res.json(assets);
});

assetRouter.get('/assets/:id', async (req, res) => {
    const asset = await service.findById(req.params.id);
    res.json(asset);
});

assetRouter.put('/assets/:id', async (req, res) => {
    const asset = await service.update(req.params.id, req.body);
    res.json(asset);
});

assetRouter.delete('/assets/:id', async (req, res) => {
    await service.delete(req.params.id);
    res.status(204).send();
});

export {
    assetRouter
}