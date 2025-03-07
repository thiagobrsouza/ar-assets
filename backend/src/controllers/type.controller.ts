import { Request, Response, Router } from "express";
import { TypeService } from "../services/type.service";

const service = new TypeService();
export const typeRoute = Router();

typeRoute.post('/types',
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const response = await service.create({ name });
    res.status(201).json(response);
    return;
  }
);

typeRoute.get('/types',
  async (req: Request, res: Response) => {
    const response = await service.findAll();
    res.json(response);
    return;
  }
);

typeRoute.get('/types/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await service.findById(id);
    res.json(response);
    return;
  }
);

typeRoute.put('/types/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const response = await service.update(id, { name });
    res.json(response);
    return;
  }
);

typeRoute.delete('/types/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await service.deleteOne(id);
    res.json(response);
    return;
  }
);