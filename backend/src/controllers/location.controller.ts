import { Request, Response, Router } from "express";
import { LocationService } from "../services/location.service";

const service = new LocationService();
export const locationRoute = Router();

locationRoute.post('/locations',
  async (req: Request, res: Response) => {
    const { name, notes } = req.body;
    const response = await service.create({ name, notes });
    res.status(201).json(response);
    return;
  }
);

locationRoute.get('/locations',
  async (req: Request, res: Response) => {
    const response = await service.findAll();
    res.json(response);
    return;
  }
);

locationRoute.get('/locations/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await service.findById(id);
    res.json(response);
    return;
  }
);

locationRoute.put('/locations/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, notes } = req.body;
    const response = await service.update(id, { name, notes });
    res.json(response);
    return;
  }
);

locationRoute.delete('/locations/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await service.deleteOne(id);
    res.json(response);
    return;
  }
);