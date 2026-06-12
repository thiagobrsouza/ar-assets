import { prisma } from "../prisma";
import type { Manufacturer } from "./manufacturer.model";

export class ManufacturerService {

    async create({ name, notes }: Manufacturer) {
        const exists = await prisma.manufacturer.findFirst({
            where: {name}
        });
        if (exists) {
            throw new Error('Fabricante já cadastrada!');
        }
        const manufacturer = await prisma.manufacturer.create({
            data: {
                name, notes
            }
        });
        return manufacturer;
    }

    async findAll() {
        const manufacturers = await prisma.manufacturer.findMany();
        return manufacturers;
    }

    async findById(id: string) {
        const manufacturer = await prisma.manufacturer.findUnique({
            where: {
                id
            }
        });
        return manufacturer;
    }

    async update(id: string, { name, notes }: Manufacturer) {
        const manufacturerFounded = await prisma.manufacturer.findUnique({
            where: {
                id
            }
        });
        const exists = await prisma.manufacturer.findFirst({
            where: {name}
        });
        if (exists && manufacturerFounded?.id !== exists.id) {
            throw new Error('Fabricante já cadastrada!');
        }
        const manufacturer = await prisma.manufacturer.update({
            where: {
                id
            },
            data: {
                name, notes
            }
        });
        return manufacturer;
    }

    async delete(id: string) {
        const manufacturer = await prisma.manufacturer.delete({
            where: {
                id
            }
        });
        return manufacturer;
    }
}