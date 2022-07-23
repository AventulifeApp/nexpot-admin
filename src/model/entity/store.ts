import { GeoPoint } from 'firebase/firestore';

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
  geohash: GeoPoint;
  longitude: number;
  latitude: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
