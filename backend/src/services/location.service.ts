import { Location } from "../interfaces/location";
import { dateTimeMiddleware } from "../middlewares/date.middleware";
import { prisma } from "../prisma.client";

export class LocationService {

  async create({ name, notes }: Location) {
    try {
      const location = await prisma.location.create({
        data: {
          name, notes
        }
      });
      return location;
    } catch {
      throw new Error('Localização já cadastrada!');
    }
  }

  async findAll() {
    const locations = await prisma.location.findMany();
    const result = dateTimeMiddleware(locations);
    return result;
  }

  async findById(id: string) {
    const location = await prisma.location.findFirst({
      where: { id }
    });
    const result = dateTimeMiddleware(location);
    return result;
  }

  async update(id: string, { name, notes }: Location) {
    try {
      const location = await prisma.location.update({
        where: { id },
        data: { name, notes }
      });
      return location;
    } catch {
      throw new Error('Localização já cadastrada!');
    }
  }

  async deleteOne(id: string) {
    try {
      await prisma.location.delete({
        where: { id }
      })
    } catch {
      throw new Error('Localização tem relação com ativos');
    }
  }

}