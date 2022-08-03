import {
  doc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '~/lib/firebase';

export const useRemoveStore = () => {
  return useCallback(async (storeId: string) => {
    try {
      await runTransaction(db, async (transaction) => {
        await transaction.update(doc(db, 'stores', storeId), {
          deletedAt: serverTimestamp(),
        });

        // TODO: remove RentalCyclePlace
        // TODO: remove user role
        // TODO: remove SightseeingSpot,SightseeingRoute,
      });
      console.log('Transaction successfully committed!');
    } catch (e) {
      console.log('Transaction failed: ', e);
    }
  }, []);
};
