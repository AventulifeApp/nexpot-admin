import { GeoPoint } from 'firebase/firestore';
import { NextPage } from 'next';
import { memo } from 'react';
import { BUTTON_COLORS } from '~/constants/constants';

export type NextProps<P = {}> = NextPage<P & { className?: string }>;
export const typedMemo: <T>(c: T) => T = memo;
export type ResponseData = { message: string };
export type ButtonColors = keyof typeof BUTTON_COLORS;
export type PagingType = {
  startAt: number;
  limit: number;
  orderBy: 'asc' | 'desc';
  isNext: boolean;
};
export type CRUDDomainType<T> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
export type StoreFormValue = {
  companyName: string;
  name: string;
  phone: string;
  postCode: string;
  prefecture: string;
  municipality: string;
  block: string;
  buildingName: string;
};
export type CompanyFormValue = {
  name: string;
  phone: string;
};
export type GeoPosition = {
  geohash: string;
  geopoint: {
    latitude: number;
    longitude: number;
  };
};
