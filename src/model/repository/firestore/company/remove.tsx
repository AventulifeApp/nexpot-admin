import { deleteDoc, doc } from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '~/lib/firebase';

export const useRemoveCompany = () => {
  return useCallback(async (companyId: string) => {
    const userDocumentRef = doc(db, 'companies', companyId);
    return deleteDoc(userDocumentRef);
  }, []);
};
