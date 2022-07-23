import { useCallback } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
  startAt,
  limit,
  where,
} from '@firebase/firestore';
import { db } from '~/lib/firebase';
import { Store } from '~/model/entity';
import { FormValue } from '~/pages/store/create';
import { endAt, limitToLast, updateDoc } from 'firebase/firestore';
import { PagingType } from '~/types/common';

const ref = collection(db, 'stores');
export const useStoreRepo = () => {
  const fetch = useCallback(async (storeId: string) => {
    const res = await getDoc(doc(db, 'companies', storeId));
    return {
      id: res.id,
      ...res.data(),
    } as Store;
  }, []);

  const fetchAll = useCallback(
    async (param: PagingType & { startDate?: Date; companyId: string }) => {
      let q = null;
      if (param.startDate) {
        q = query(
          ref,
          where('companyId', '==', param.companyId),
          orderBy('createdAt', param.orderBy),
          param.isNext ? startAt(param.startDate) : endAt(param.startDate),
          param.isNext ? limit(param.limit + 1) : limitToLast(param.limit + 1)
        );
      } else {
        q = query(
          ref,
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
    },
    []
  );

  const create = useCallback(
    async (
      values: Omit<Store, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    ) => {
      const now = new Date();
      return await addDoc(ref, {
        ...values,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });
    },
    []
  );

  const remove = useCallback(async (storeId: string) => {
    const userDocumentRef = doc(db, 'stores', storeId);
    return deleteDoc(userDocumentRef);
  }, []);

  const update = useCallback(
    async (values: FormValue & { uid?: string; storeId: string }) => {
      const now = new Date();
      return await updateDoc(doc(db, 'stores', values.storeId), {
        ...values,
        updatedAt: now,
        deletedAt: null,
      });
    },
    []
  );

  const select = useCallback(() => {}, []);

  return {
    fetch,
    fetchAll,
    create,
    remove,
    update,
    select,
  };
};
