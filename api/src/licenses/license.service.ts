import { prisma } from "../prisma";
import type { License } from "./license.model";

export class LicenseService {

    async create({ name, status, serialKey, supplier, assetModelId, entryDate, expirationDate, notes }: License) {
        const exists = await prisma.license.findFirst({
            where: { name }
        });
        if (exists) {
            throw new Error('Ativo já cadastrado!');
        }
        const license = await prisma.license.create({
            data: {
                name,
                status,
                serialKey,
                supplier: supplier ? { connect: { id: supplier } } : { disconnect: true },
                model: { connect: { id: assetModelId } },
                entryDate,
                expirationDate,
                notes
            }
        });
        return license;
    }

    async findAll() {
        const licenses = await prisma.license.findMany({
            include: { supplier: true, model: true }
        });
        return licenses;
    }

    async findById(id: string) {
        const license = await prisma.license.findUnique({
            where: {
                id
            },
            include: { supplier: true, model: true }
        });
        return license;
    }

    async update(id: string, { name, status, serialKey, supplier, assetModelId, entryDate, expirationDate, notes }: License) {
        const licenseFounded = await prisma.license.findUnique({
            where: {
                id
            }
        });
        const exists = await prisma.license.findFirst({
            where: { name }
        });
        if (exists && licenseFounded?.id !== exists.id) {
            throw new Error('Ativo já cadastrado!');
        };
        const license = await prisma.license.update({
            where: {
                id
            },
            data: {
                name,
                status,
                serialKey,
                supplier: supplier ? { connect: { id: supplier } } : { disconnect: true },
                model: { connect: { id: assetModelId } },
                entryDate,
                expirationDate,
                notes
            }
        });
        return license;
    }

    async delete(id: string) {
        const license = await prisma.license.delete({
            where: {
                id
            }
        });
        return license;
    }
}