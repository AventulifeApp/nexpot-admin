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
} from '@firebase/firestore';
import { db } from '~/lib/firebase';
import { Company } from '~/model/entity';
import { FormValue } from '~/pages/company/create';
import { endAt, limitToLast, updateDoc } from 'firebase/firestore';
import { PagingType } from '~/types/common';

const ref = collection(db, 'companies');
export const useCompanyRepo = () => {
  const fetch = useCallback(async (companyId: string) => {
    const res = await getDoc(doc(db, 'companies', companyId));
    return {
      id: res.id,
      ...res.data(),
    } as Company;
  }, []);

  const fetchAll = useCallback(
    async (param: PagingType & { startDate?: Date }) => {
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
      // const res = { docs: [] as any[] };
      return res.docs.map<Company>((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Company;
      });
    },
    []
  );

  const create = useCallback(async (values: FormValue & { uid?: string }) => {
    const now = new Date();
    return await addDoc(ref, {
      ...values,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }, []);

  const remove = useCallback(async (companyId: string) => {
    const userDocumentRef = doc(db, 'companies', companyId);
    return deleteDoc(userDocumentRef);
  }, []);

  const update = useCallback(
    async (values: FormValue & { uid?: string; companyId: string }) => {
      const now = new Date();
      return await updateDoc(doc(db, 'companies', values.companyId), {
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
