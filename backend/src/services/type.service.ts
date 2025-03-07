import { Type } from "../interfaces/type";
import { dateTimeMiddleware } from "../middlewares/date.middleware";
import { prisma } from "../prisma.client";

export class TypeService {

  async create({ name }: Type) {
    try {
      const type = await prisma.type.create({
        data: {
          name
        }
      });
      return type;
    } catch {
      throw new Error('Tipo já cadastrado!');
    }
  }

  async findAll() {
    const types = await prisma.type.findMany();
    const result = dateTimeMiddleware(types);
    return result;
  }

  async findById(id: string) {
    const type = await prisma.type.findFirst({
      where: { id }
    });
    const result = dateTimeMiddleware(type);
    return result;
  }

  async update(id: string, { name }: Type) {
    try {
      const type = await prisma.type.update({
        where: { id },
        data: { name }
      });
      return type;
    } catch {
      throw new Error('Tipo já cadastrado!');
    }
  }

  async deleteOne(id: string) {
    try {
      await prisma.type.delete({
        where: { id }
      })
    } catch {
      throw new Error('Tipo tem relação com modelos');
    }
  }

}