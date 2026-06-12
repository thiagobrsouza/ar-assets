import { prisma } from "../prisma";
import type { Asset } from "./asset.model";

export class AssetService {

    async create({ name, status, serialNumber, companyId, assetModelId, locationId, userId, entryDate, expirationDate, notes }: Asset) {
        const exists = await prisma.asset.findFirst({
            where: { serialNumber }
        });
        if (exists) {
            throw new Error('Ativo já cadastrado!');
        }
        const asset = await prisma.asset.create({
            data: {
                name,
                status,
                serialNumber,
                company: { connect: { id: companyId } },
                model: { connect: { id: assetModelId } },
                location: locationId ? { connect: { id: locationId } } : { disconnect: true },
                user: userId ? { connect: { id: userId } } : { disconnect: true },
                entryDate,
                expirationDate,
                notes
            }
        });
        return asset;
    }

    async findAll() {
        const assets = await prisma.asset.findMany({
            include: { company: true, model: true }
        });
        return assets;
    }

    async findById(id: string) {
        const asset = await prisma.asset.findUnique({
            where: {
                id
            },
            include: {
                company: true,
                model: {
                    include: {manufacturer: true, assetType: true}
                },
                location: {
                    include: { company: true }
                },
                user: true
            }
        });
        return asset;
    }

    async update(id: string, { name, status, serialNumber, companyId, assetModelId, locationId, userId, entryDate, expirationDate, notes }: Asset) {
        const assetFounded = await prisma.asset.findUnique({
            where: {
                id
            }
        });
        const exists = await prisma.asset.findFirst({
            where: { name }
        });
        if (exists && assetFounded?.id !== exists.id) {
            throw new Error('Ativo já cadastrado!');
        };
        const asset = await prisma.asset.update({
            where: {
                id
            },
            data: {
                name,
                status,
                serialNumber,
                company: { connect: { id: companyId } },
                model: { connect: { id: assetModelId } },
                location: locationId ? { connect: { id: locationId } } : { disconnect: true },
                user: userId ? { connect: { id: userId } } : { disconnect: true },
                entryDate,
                expirationDate,
                notes
            }
        });
        return asset;
    }

    async delete(id: string) {
        const asset = await prisma.asset.delete({
            where: {
                id
            }
        });
        return asset;
    }
}