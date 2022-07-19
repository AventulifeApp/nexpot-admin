import { useCallback, useEffect, useState } from 'react';
import { useCompanyRepo } from '~/model/repository';
import { useRouter } from 'next/router';
import { auth } from '~/lib/firebase';
import { useForm } from 'react-hook-form';
import { FormValue } from '~/pages/company/create';
import { Company } from '~/model/entity';

export const useCompanyEditUseCase = () => {
  const router = useRouter();
  const methods = useForm<FormValue>();
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const companyRepo = useCompanyRepo();

  const {
    isReady,
    query: { companyId },
  } = router;

  useEffect(() => {
    if (isReady && companyId) {
      companyRepo.fetch(companyId as string).then((company) => {
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
        await companyRepo.update({
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
  }, [companyId, companyRepo, methods, router]);

  return {
    methods,
    showModal,
    company,
    handleSubmit,
    handleModalClose,
    handleModalUpdate,
  };
};
