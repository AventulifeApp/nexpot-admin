import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '~/lib/firebase';
import { useForm } from 'react-hook-form';
import { Company } from '~/model/entity';
import { CompanyFormValue } from '~/types/common';
import { useUpdateCompany } from '~/model/repository/firestore/company/update';
import { useFetchCompany } from '~/model/repository/firestore/company/fetch';

export const useCompanyEditUseCase = () => {
  const router = useRouter();
  const methods = useForm<CompanyFormValue>();
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const updateCompany = useUpdateCompany();
  const fetchCompany = useFetchCompany();

  const {
    isReady,
    query: { companyId },
  } = router;

  useEffect(() => {
    if (isReady && companyId) {
      fetchCompany(companyId as string).then((company) => {
        setCompany(company);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = methods.handleSubmit(() => {
    setShowModal(true);
  });

  const handleModalClose = useCallback(async () => {
    setShowModal(false);
  }, []);

  const handleModalUpdate = useCallback(async () => {
    try {
      if (companyId) {
        const values = methods.getValues();
        const uid = auth.currentUser?.uid;
        await updateCompany({
          ...values,
          uid,
          companyId: companyId as string,
        });
        router.push('/company/list');
        setShowModal(false);
      }
    } catch (error) {
      alert('更新に失敗しました');
    }
  }, [companyId, methods, router, updateCompany]);

  return {
    methods,
    showModal,
    company,
    handleSubmit,
    handleModalClose,
    handleModalUpdate,
  };
};
