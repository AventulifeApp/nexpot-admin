import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '~/lib/firebase';
import { StoreFormValue } from '~/types/common';

const ref = collection(db, 'stores');
export const useCreateStore = () => {
  return useCallback(
    async (values: StoreFormValue & { uid?: string; companyId: string }) => {
      const now = serverTimestamp();
      return await addDoc(ref, {
        ...values,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });
    },
    []
  );
};
