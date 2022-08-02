import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '~/lib/firebase';
import { useForm } from 'react-hook-form';
import { StoreFormValue } from '~/types/common';
import { Company } from '~/model/entity';
import { useFetchCompany } from '~/model/repository/firestore/company/fetch';
import { useCreateStore } from '~/model/repository/firestore/store/create';
import geohash from 'ngeohash';
import { useFetchGeocode } from '~/model/repository/google/map/geocode';

export const useStoreCreateUseCase = () => {
  const methods = useForm<StoreFormValue>();
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [company, setCompany] = useState<Company | null>(null);
  const [responseLocation, setResponseLocation] = useState<any>(null);
  const fetchCompany = useFetchCompany();
  const createStore = useCreateStore();
  const router = useRouter();
  const fetchGeocode = useFetchGeocode();
  const companyId = router.query.companyId;

  useEffect(() => {
    if (companyId) {
      (async () => {
        const company = await fetchCompany(companyId as string);
        if (!company) {
          router.push('/company/select');
          return;
        }
        setCompany(company);
      })();
    }
  }, [companyId, fetchCompany, router]);

  const handleSubmit = methods.handleSubmit(async (values) => {
    try {
      const address = `${values.postCode} ${values.prefecture} ${values.municipality} ${values.block} ${values.buildingName}`;
      const results = await fetchGeocode(address);
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

  const handleModalCreate = useCallback(async () => {
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
        !companyId ||
        !responseLocation ||
        !latitude ||
        !longitude ||
        !company?.name
      ) {
        throw Error('エラーが発生しました');
      }

      await createStore({
        ...values,
        uid,
        companyId: companyId as string,
        companyName: company.name as string,
        position: {
          geohash: geohash.encode(latitude, longitude),
          geopoint: {
            latitude,
            longitude,
          },
        },
        address,
      });
      router.push(`/store/list?companyId=${companyId}`);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert('登録に失敗しました');
    }
  }, [
    company?.name,
    companyId,
    createStore,
    methods,
    responseLocation,
    router,
  ]);

  return {
    methods,
    showModal,
    errorMessage,
    company,
    handleSubmit,
    handleModalClose,
    handleModalCreate,
  };
};
