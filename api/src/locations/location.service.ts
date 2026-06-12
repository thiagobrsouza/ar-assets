import { prisma } from "../prisma";
import type { Location } from "./location.model";

export class LocationService {

    async create({ name, companyId, notes }: Location) {
        const location = await prisma.location.create({
            data: {
                name, company: { connect: { id: companyId } }, notes
            }
        });
        return location;
    }

    async findAll() {
        const locations = await prisma.location.findMany({
            include: {company: true}
        });
        return locations;
    }

    async findById(id: string) {
        const location = await prisma.location.findUnique({
            where: {
                id
            },
            select: {id: true, name: true, notes: true, company: { select: { id: true, name: true } }
            }
        });
        return location;
    }

    async update(id: string, { name, companyId, notes }: Location) {
        const location = await prisma.location.update({
            where: {
                id
            },
            data: {
                name, company: { connect: { id: companyId } }, notes
            }
        });
        return location;
    }

    async delete(id: string) {
        const location = await prisma.location.delete({
            where: {
                id
            }
        });
        return location;
    }
}