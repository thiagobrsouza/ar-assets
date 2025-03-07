import { Request, Response, Router } from "express";
import { ModelService } from "../services/model.service";

const service = new ModelService();
export const modelRoute = Router();

modelRoute.post('/models',
  async (req: Request, res: Response) => {
    const { name, typeId, manufacturerId } = req.body;
    const response = await service.create({ name, typeId, manufacturerId });
    res.status(201).json(response);
    return;
  }
);

modelRoute.get('/models',
  async (req: Request, res: Response) => {
    const response = await service.findAll();
    res.json(response);
    return;
  }
);

modelRoute.get('/models/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await service.findById(id);
    res.json(response);
    return;
  }
);

modelRoute.put('/models/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, typeId, manufacturerId } = req.body;
    const response = await service.update(id, { name, typeId, manufacturerId });
    res.json(response);
    return;
  }
);

modelRoute.delete('/models/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await service.deleteOne(id);
    res.json(response);
    return;
  }
);