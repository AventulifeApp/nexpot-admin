import {
  orderBy,
  query,
  collection,
  startAt,
  endAt,
  getDocs,
  limit,
  limitToLast,
  where,
} from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '~/lib/firebase';
import { Store } from '~/model/entity';
import { PagingType } from '~/types/common';

const ref = collection(db, 'stores');
export const useFetchAllStore = () => {
  return useCallback(
    async (param: PagingType & { startDate?: Date; companyId: string }) => {
      try {
        let q = null;
        if (param.startDate) {
          q = query(
            ref,
            where('deletedAt', '==', null),
            where('companyId', '==', param.companyId),
            orderBy('createdAt', param.orderBy),
            param.isNext ? startAt(param.startDate) : endAt(param.startDate),
            param.isNext ? limit(param.limit + 1) : limitToLast(param.limit + 1)
          );
        } else {
          q = query(
            ref,
            where('deletedAt', '==', null),
            where('companyId', '==', param.companyId),
            orderBy('createdAt', param.orderBy),
            limit(param.limit + 1)
          );
        }

        const res = await getDocs(q);

        return res.docs.map<Store>((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as Store;
        });
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );
};
