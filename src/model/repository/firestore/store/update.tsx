import {
  updateDoc,
  doc,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '~/lib/firebase';
import { Store } from '~/model/entity';

export const useUpdateStore = () => {
  return useCallback(async (values: Store) => {
    try {
      await runTransaction(db, async (transaction) => {
        await transaction.update(doc(db, 'stores', values.id), {
          ...values,
          updatedAt: serverTimestamp(),
          deletedAt: null,
        });

        // TODO: update RentalCyclePlace storeName
      });
      console.log('Transaction successfully committed!');
    } catch (e) {
      console.log('Transaction failed: ', e);
    }
  }, []);
};
