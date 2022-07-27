import { useCallback } from 'react';
import { collection, doc, getDoc } from '@firebase/firestore';
import { db } from '~/lib/firebase';
import { Company } from '~/model/entity';

const ref = collection(db, 'companies');
export const useFetchCompany = () => {
  return useCallback(async (companyId: string) => {
    const res = await getDoc(doc(db, 'companies', companyId));
    return {
      id: res.id,
      ...res.data(),
    } as Company;
  }, []);
};
