import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '~/lib/firebase';
import { Store } from '~/model/entity';
import { CRUDDomainType } from '~/types/common';

const ref = collection(db, 'stores');
export const useCreateStore = () => {
  return useCallback(async (values: CRUDDomainType<Store>) => {
    const now = serverTimestamp();
    return await addDoc(ref, {
      ...values,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }, []);
};
