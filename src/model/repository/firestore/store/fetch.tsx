import { useCallback } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '~/lib/firebase';
import { Store } from '~/model/entity';

export const useFetchStore = () => {
  return useCallback(async (storeId: string) => {
    const res = await getDoc(doc(db, 'stores', storeId));

    if (!res.exists() || res.data().deletedAt) {
      return null;
    }
    return {
      id: res.id,
      ...res.data(),
    } as Store;
  }, []);
};
