import { Status } from '../../generated/prisma/client';

export interface Asset {
    name: string;
    status: Status;
    serialNumber: string;
    assetModelId: string;
    companyId: string;
    locationId?: string;
    userId?: string;
    entryDate: any;
    expirationDate: any;
    notes: string;
}