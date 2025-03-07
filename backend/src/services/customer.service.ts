import { Customer } from "../interfaces/customer";
import { dateTimeMiddleware } from "../middlewares/date.middleware";
import { prisma } from "../prisma.client";

export class CustomerService {

  async create({ name, notes }: Customer) {
    try {
      const customer = await prisma.customer.create({
        data: {
          name, notes
        }
      });
      return customer;
    } catch {
      throw new Error('Cliente já cadastrado!');
    }
  }

  async findAll() {
    const customers = await prisma.customer.findMany();
    const result = dateTimeMiddleware(customers);
    return result;
  }

  async findById(id: string) {
    const customer = await prisma.customer.findFirst({
      where: { id }
    });
    const result = dateTimeMiddleware(customer);
    return result;
  }

  async update(id: string, { name, notes }: Customer) {
    try {
      const customer = await prisma.customer.update({
        where: { id },
        data: { name, notes }
      });
      return customer;
    } catch {
      throw new Error('Cliente já cadastrado!');
    }
  }

  async deleteOne(id: string) {
    try {
      await prisma.customer.delete({
        where: { id }
      })
    } catch {
      throw new Error('Cliente tem relação com ativos');
    }
  }

}