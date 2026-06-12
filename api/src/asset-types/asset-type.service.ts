import { prisma } from "../prisma";
import type { AssetType } from "./asset-type.model";

export class AssetTypeService {

    async create({ name, architectureId, notes }: AssetType) {
        const exists = await prisma.assetType.findFirst({
            where: {name}
        });
        if (exists) {
            throw new Error('Tipo de ativo já cadastrado!');
        }
        const assetType = await prisma.assetType.create({
            data: {
                name, architecture: { connect: { id: architectureId } }, notes
            }
        });
        return assetType;
    }

    async findAll() {
        const assetTypes = await prisma.assetType.findMany({
            include: {architecture: true}
        });
        return assetTypes;
    }

    async findById(id: string) {
        const assetType = await prisma.assetType.findUnique({
            where: {
                id
            },
            select: {id: true, name: true, notes: true, architecture: { select: { id: true, name: true } }
            }
        });
        return assetType;
    }

    async update(id: string, { name, architectureId, notes }: AssetType) {
        const assetTypeFounded = await prisma.assetType.findUnique({
            where: {
                id
            }
        });
        const exists = await prisma.assetType.findFirst({
            where: {name}
        });
        if (exists && assetTypeFounded?.id !== exists.id) {
            throw new Error('Fabricante já cadastrada!');
        }
        const assetType = await prisma.assetType.update({
            where: {
                id
            },
            data: {
                name, architecture: { connect: { id: architectureId } }, notes
            }
        });
        return assetType;
    }

    async delete(id: string) {
        const assetType = await prisma.assetType.delete({
            where: {
                id
            }
        });
        return assetType;
    }
}