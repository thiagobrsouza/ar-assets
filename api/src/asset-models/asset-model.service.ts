import { prisma } from "../prisma";
import type { AssetModel } from "./asset-model.model";

export class AssetModelService {

    async create({ name, assetTypeId, manufacturerId, notes }: AssetModel) {
        const exists = await prisma.assetModel.findFirst({
            where: { name }
        });
        if (exists) {
            throw new Error('Modelo de ativo já cadastrado!');
        }
        const assetModel = await prisma.assetModel.create({
            data: {
                name, assetTypeId, manufacturerId, notes
            }
        });
        return assetModel;
    }

    async findAll() {
        const assetModels = await prisma.assetModel.findMany({
            include: {
                assetType: true,
                manufacturer: true
            }
        });
        return assetModels;
    }

    async findById(id: string) {
        const assetModel = await prisma.assetModel.findUnique({
            where: {
                id
            },
            include: {
                assetType: {
                    include: { architecture: true }
                },
                manufacturer: true
            }
        });
        return assetModel;
    }

    async update(id: string, { name, assetTypeId, manufacturerId, notes }: AssetModel) {
        const assetModelFounded = await prisma.assetModel.findUnique({
            where: {
                id
            }
        });
        const exists = await prisma.assetModel.findFirst({
            where: { name }
        });
        if (exists && assetModelFounded?.id !== exists.id) {
            throw new Error('Modelo de ativo já cadastrado!');
        };
        const assetModel = await prisma.assetModel.update({
            where: {
                id
            },
            data: {
                name, assetTypeId, manufacturerId, notes
            }
        });
        return assetModel;
    }

    async delete(id: string) {
        const assetModel = await prisma.assetModel.delete({
            where: {
                id
            }
        });
        return assetModel;
    }
}