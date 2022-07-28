import { useCallback } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '~/lib/firebase';
import { Company } from '~/model/entity';

export const useFetchCompany = () => {
  return useCallback(async (companyId: string) => {
    const res = await getDoc(doc(db, 'companies', companyId));

    if (!res.exists() || res.data().deletedAt) {
      return null;
    }

    return {
      id: res.id,
      ...res.data(),
    } as Company;
  }, []);
};
