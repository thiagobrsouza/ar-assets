import { Model } from "../interfaces/model";
import { dateTimeMiddleware } from "../middlewares/date.middleware";
import { prisma } from "../prisma.client";

export class ModelService {

  async create({ name, typeId, manufacturerId }: Model) {
    try {
      const model = await prisma.model.create({
        data: {
          name,
          type: { connect: { id: typeId } },
          manufacturer: { connect: { id: manufacturerId }}
        }
      });
      return model;
    } catch {
      throw new Error('Modelo já cadastrado!');
    }
  }

  async findAll() {
    const models = await prisma.model.findMany({
      include: { type: true, manufacturer: true }
    });
    const result = dateTimeMiddleware(models);
    return result;
  }

  async findById(id: string) {
    const model = await prisma.model.findFirst({
      where: { id },
      include: { type: true, manufacturer: true }
    });
    const result = dateTimeMiddleware(model);
    return result;
  }

  async update(id: string, { name, typeId, manufacturerId }: Model) {
    try {
      const model = await prisma.model.update({
        where: { id },
        data: {
          name,
          type: { connect: { id: typeId } },
          manufacturer: { connect: { id: manufacturerId }}
        }
      });
      return model;
    } catch {
      throw new Error('Modelo já cadastrado!');
    }
  }

  async deleteOne(id: string) {
    try {
      await prisma.model.delete({
        where: { id }
      })
    } catch {
      throw new Error('Modelo tem relação com ativos');
    }
  }

}