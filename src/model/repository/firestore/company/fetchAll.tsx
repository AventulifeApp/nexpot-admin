import {
  orderBy,
  query,
  collection,
  startAt,
  endAt,
  getDocs,
  limit,
  limitToLast,
} from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '~/lib/firebase';
import { Company } from '~/model/entity';
import { PagingType } from '~/types/common';

const ref = collection(db, 'companies');
export const useFetchAllCompany = () => {
  return useCallback(async (param: PagingType & { startDate?: Date }) => {
    try {
      let q = null;
      if (param.startDate) {
        q = query(
          ref,
          orderBy('createdAt', param.orderBy),
          param.isNext ? startAt(param.startDate) : endAt(param.startDate),
          param.isNext ? limit(param.limit + 1) : limitToLast(param.limit + 1)
        );
      } else {
        q = query(
          ref,
          orderBy('createdAt', param.orderBy),
          limit(param.limit + 1)
        );
      }

      const res = await getDocs(q);
      return res.docs.map<Company>((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Company;
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);
};
