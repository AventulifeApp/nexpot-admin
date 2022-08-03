import { GeoPosition } from '~/types/common';

export type Store = {
  id: string;
  uid: string;
  companyId: string;
  name: string;
  companyName: string;
  phone: string;
  address: string;
  postCode: string;
  prefecture: string;
  municipality: string;
  block: string;
  buildingName: string;
  position: GeoPosition;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
