export interface Asset {
  name: string;
  serial: string;
  status: boolean;
  entryDate: Date;
  expirationDate: Date;
  modelId: string;
  customerId: string;
  locationId: string;
  notes?: string;
}