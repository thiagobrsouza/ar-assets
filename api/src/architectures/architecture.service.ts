import { prisma } from "../prisma";
import type { Architecture } from "./architecture.model";

export class ArchitectureService {

    async create({ name, notes }: Architecture) {
        const exists = await prisma.architecture.findFirst({
            where: {name}
        });
        if (exists) {
            throw new Error('Arquitetura já cadastrada!');
        }
        const architecture = await prisma.architecture.create({
            data: {
                name, notes
            }
        });
        return architecture;
    }

    async findAll() {
        const companies = await prisma.architecture.findMany();
        return companies;
    }

    async findById(id: string) {
        const architecture = await prisma.architecture.findUnique({
            where: {
                id
            }
        });
        return architecture;
    }

    async update(id: string, { name, notes }: Architecture) {
        const architectureFounded = await prisma.architecture.findUnique({
            where: {
                id
            }
        });
        const exists = await prisma.architecture.findFirst({
            where: {name}
        });
        if (exists && architectureFounded?.id !== exists.id) {
            throw new Error('Arquitetura já cadastrada!');
        }
        const architecture = await prisma.architecture.update({
            where: {
                id
            },
            data: {
                name, notes
            }
        });
        return architecture;
    }

    async delete(id: string) {
        const architecture = await prisma.architecture.delete({
            where: {
                id
            }
        });
        return architecture;
    }
}