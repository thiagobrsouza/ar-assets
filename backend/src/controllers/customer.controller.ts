import { Request, Response, Router } from "express";
import { CustomerService } from "../services/customer.service";

const service = new CustomerService();
export const customerRoute = Router();

customerRoute.post('/customers',
  async (req: Request, res: Response) => {
    const { name, notes } = req.body;
    const response = await service.create({ name, notes });
    res.status(201).json(response);
    return;
  }
);

customerRoute.get('/customers',
  async (req: Request, res: Response) => {
    const response = await service.findAll();
    res.json(response);
    return;
  }
);

customerRoute.get('/customers/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await service.findById(id);
    res.json(response);
    return;
  }
);

customerRoute.put('/customers/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, notes } = req.body;
    const response = await service.update(id, { name, notes });
    res.json(response);
    return;
  }
);

customerRoute.delete('/customers/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await service.deleteOne(id);
    res.json(response);
    return;
  }
);