import { Request, Response, Router } from "express";
import { ManufacturerService } from "../services/manufacturer.service";

const service = new ManufacturerService();
export const manufacturerRoute = Router();

manufacturerRoute.post('/manufacturers',
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const response = await service.create({ name });
    res.status(201).json(response);
    return;
  }
);

manufacturerRoute.get('/manufacturers',
  async (req: Request, res: Response) => {
    const response = await service.findAll();
    res.json(response);
    return;
  }
);

manufacturerRoute.get('/manufacturers/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await service.findById(id);
    res.json(response);
    return;
  }
);

manufacturerRoute.put('/manufacturers/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const response = await service.update(id, { name });
    res.json(response);
    return;
  }
);

manufacturerRoute.delete('/manufacturers/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await service.deleteOne(id);
    res.json(response);
    return;
  }
);