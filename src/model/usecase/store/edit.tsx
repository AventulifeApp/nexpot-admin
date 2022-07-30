import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { auth } from '~/lib/firebase';
import { useForm } from 'react-hook-form';
import { GEOCODE_ENDPOINT } from '~/constants/constants';
import { StoreFormValue } from '~/types/common';
import { Store } from '~/model/entity';
import { useFetchStore } from '~/model/repository/firestore/store/fetch';
import { useUpdateStore } from '~/model/repository/firestore/store/update';
import geohash from 'ngeohash';

export const useStoreEditUseCase = () => {
  const methods = useForm<StoreFormValue>();
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [store, setStore] = useState<Store | null>(null);
  const [responseLocation, setResponseLocation] = useState<any>(null);
  const fetchStore = useFetchStore();
  const updateStore = useUpdateStore();

  const router = useRouter();
  const storeId = router.query.storeId;

  useEffect(() => {
    if (storeId) {
      (async () => {
        const store = await fetchStore(storeId as string);

        if (!store) {
          router.push('/company/select');
          return;
        }
        setStore(store);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  const handleSubmit = methods.handleSubmit(async (values) => {
    try {
      const address = `${values.postCode} ${values.prefecture} ${values.municipality} ${values.block} ${values.buildingName}`;
      const results = await axios.get(GEOCODE_ENDPOINT, {
        params: {
          address,
          key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
          region: 'JP',
          language: 'ja',
        },
      });
      const data = results.data;
      const result = data.results[0];

      if (data.status === 'OK' && result) {
        setResponseLocation(result);
        setShowModal(true);
      } else {
        setErrorMessage(
          '住所情報に誤りが存在します。入力内容を確認してください。'
        );
      }
    } catch (error) {
      alert('登録に失敗しました');
    }
  });

  const handleModalClose = useCallback(async () => {
    setShowModal(false);
  }, []);

  const handleModalUpdate = useCallback(async () => {
    try {
      const values = methods.getValues();
      const uid = auth.currentUser?.uid;
      const latitude = responseLocation?.geometry?.location.lat;
      const longitude = responseLocation?.geometry?.location.lng;
      const address = `${values.postCode} ${values.prefecture} ${values.municipality} ${values.block} ${values.buildingName}`;

      if (
        !address ||
        !uid ||
        !values ||
        !storeId ||
        !responseLocation ||
        !latitude ||
        !longitude ||
        !store
      ) {
        throw Error('エラーが発生しました');
      }

      await updateStore({
        ...store,
        ...values,
        uid,
        position: {
          geohash: geohash.encode(latitude, longitude),
          geopoint: {
            longitude,
            latitude,
          },
        },
        address,
      });
      router.push(`/store/list?companyId=${store.companyId}`);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert('登録に失敗しました');
    }
  }, [methods, responseLocation, router, store, storeId, updateStore]);

  return {
    methods,
    showModal,
    errorMessage,
    store,
    handleSubmit,
    handleModalClose,
    handleModalUpdate,
  };
};
