import { Status } from '../../generated/prisma/client';

export interface License {
    name: string;
    status: Status;
    serialKey: string;
    assetModelId: string;
    supplier?: string;
    entryDate: any;
    expirationDate: any;
    notes: string;
}