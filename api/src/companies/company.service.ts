import { prisma } from "../prisma";
import type { Company } from "./company.model";

export class CompanyService {

    async create({ name, cnpj, notes, isSupplier }: Company) {
        const exists = await prisma.company.findFirst({
            where: {
                OR: [
                    { name },
                    { cnpj }
                ]
            }
        });
        if (exists) {
            throw new Error('Empresa já cadastrada!');
        }
        const company = await prisma.company.create({
            data: {
                name, cnpj, isSupplier, notes
            }
        });
        return company;
    }

    async findAll() {
        const companies = await prisma.company.findMany();
        return companies;
    }

    async findById(id: string) {
        const company = await prisma.company.findUnique({
            where: {
                id
            }
        });
        return company;
    }

    async update(id: string, { name, cnpj, notes, isSupplier }: Company) {
        const companyFounded = await prisma.company.findUnique({
            where: {
                id
            }
        });
        const exists = await prisma.company.findFirst({
            where: {
                OR: [
                    { name },
                    { cnpj }
                ]
            }
        });
        if (exists && companyFounded?.id !== exists.id) {
            throw new Error('Empresa já cadastrada!');
        }
        const company = await prisma.company.update({
            where: {
                id
            },
            data: {
                name, cnpj, notes, isSupplier
            }
        });
        return company;
    }

    async delete(id: string) {
        const company = await prisma.company.delete({
            where: {
                id
            }
        });
        return company;
    }
}