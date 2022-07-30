import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '~/lib/firebase';
import { useForm } from 'react-hook-form';
import { CompanyFormValue } from '~/types/common';
import { useCreateCompany } from '~/model/repository/firestore/company/create';

export const useCompanyCreateUseCase = () => {
  const methods = useForm<CompanyFormValue>();
  const [showModal, setShowModal] = useState(false);
  const createCompany = useCreateCompany();
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
      if (!uid) {
        router.push('/company/list');
        return;
      }
      await createCompany({ ...values, uid });

      router.push('/company/list');
      setShowModal(false);
    } catch (error) {
      alert('登録に失敗しました');
    }
  }, [createCompany, methods, router]);

  return {
    methods,
    showModal,
    handleSubmit,
    handleModalClose,
    handleModalCreate,
  };
};
