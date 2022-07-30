import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '~/lib/firebase';
import { Company } from '~/model/entity';
import { CRUDDomainType } from '~/types/common';

const ref = collection(db, 'companies');
export const useCreateCompany = () => {
  return useCallback(async (values: CRUDDomainType<Company>) => {
    const now = serverTimestamp();
    return addDoc(ref, {
      ...values,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }, []);
};
