import { addDoc, collection } from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '~/lib/firebase';
import { CompanyFormValue } from '~/types/common';

const ref = collection(db, 'companies');
export const useCreateCompany = () => {
  return useCallback(async (values: CompanyFormValue & { uid?: string }) => {
    const now = new Date();
    return addDoc(ref, {
      ...values,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }, []);
};
