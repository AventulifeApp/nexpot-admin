import { updateDoc, doc } from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '~/lib/firebase';
import { CompanyFormValue } from '~/types/common';

export const useUpdateCompany = () => {
  return useCallback(
    async (values: CompanyFormValue & { uid?: string; companyId: string }) => {
      const now = new Date();
      return await updateDoc(doc(db, 'companies', values.companyId), {
        ...values,
        updatedAt: now,
        deletedAt: null,
      });
    },
    []
  );
};
