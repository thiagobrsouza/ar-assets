import { Manufacturer } from "../interfaces/manufacturer";
import { dateTimeMiddleware } from "../middlewares/date.middleware";
import { prisma } from "../prisma.client";

export class ManufacturerService {

  async create({ name }: Manufacturer) {
    try {
      const manufacturer = await prisma.manufacturer.create({
        data: {
          name
        }
      });
      return manufacturer;
    } catch {
      throw new Error('Fabricante já cadastrado!');
    }
  }

  async findAll() {
    const manufacturers = await prisma.manufacturer.findMany();
    const result = dateTimeMiddleware(manufacturers);
    return result;
  }

  async findById(id: string) {
    const manufacturer = await prisma.manufacturer.findFirst({
      where: { id }
    });
    const result = dateTimeMiddleware(manufacturer);
    return result;
  }

  async update(id: string, { name }: Manufacturer) {
    try {
      const manufacturer = await prisma.manufacturer.update({
        where: { id },
        data: { name }
      });
      return manufacturer;
    } catch {
      throw new Error('Fabricante já cadastrado!');
    }
  }

  async deleteOne(id: string) {
    try {
      await prisma.manufacturer.delete({
        where: { id }
      })
    } catch {
      throw new Error('Fabricante tem relação com modelos');
    }
  }

}