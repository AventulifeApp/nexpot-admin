import { useCallback, useState } from 'react';
import { useCompanyRepo } from '~/model/repository';
import { useRouter } from 'next/router';
import { auth } from '~/lib/firebase';
import { useForm } from 'react-hook-form';
import { FormValue } from '~/pages/company/create';

export const useCompanyCreateUseCase = () => {
  const methods = useForm<FormValue>();
  const [showModal, setShowModal] = useState(false);
  const companyRepo = useCompanyRepo();
  const router = useRouter();

  const handleSubmit = methods.handleSubmit(() => {
    setShowModal(true);
  });

  const handleModalClose = useCallback(async () => {
    setShowModal(false);
  }, []);

  const handleModalCreate = useCallback(async () => {
    try {
      const values = methods.getValues();
      const uid = auth.currentUser?.uid;
      await companyRepo.create({ ...values, uid });
      router.push('/company/list');
      setShowModal(false);
    } catch (error) {
      alert('登録に失敗しました');
    }
  }, [companyRepo, methods, router]);

  return {
    methods,
    showModal,
    handleSubmit,
    handleModalClose,
    handleModalCreate,
  };
};
