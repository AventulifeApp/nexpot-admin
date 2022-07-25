import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import styled from 'styled-components';
import { TableType } from '~/components';
import { Company } from '~/model/entity';
import { useRouter } from 'next/router';
import { PagingType } from '~/types/common';
import { useFetchAllCompany } from '~/model/repository/firestore/company/fetchAll';
import { useRemoveCompany } from '~/model/repository/firestore/company/remove';

const IconWrapper = styled.div`
  cursor: pointer;
`;

export const useCompanyListUseCase = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deleteCompanyId, setDeleteCompanyId] = useState<string | null>(null);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [pageInfo, setPageInfo] = useState<PagingType>({
    startAt: 1,
    limit: 100,
    orderBy: 'desc',
    isNext: true,
  });
  const fetchAllCompany = useFetchAllCompany();
  const removeCompany = useRemoveCompany();

  useEffect(() => {
    const startAt = pageInfo.isNext ? companyList.length - 1 : 0;
    fetchAllCompany({
      ...pageInfo,
      startDate: companyList?.[startAt]?.createdAt,
    }).then((companyList) => {
      setCompanyList(companyList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo]);

  const tableData = useMemo<TableType['talbeData']>(() => {
    let workCompanyList = companyList;
    if (pageInfo.limit < workCompanyList.length) {
      workCompanyList = workCompanyList.slice(0, -1);
    }
    const list = workCompanyList.map((company) => {
      return [
        { align: 'center', content: company.name },
        { align: 'center', content: company.phone },
        {
          align: 'right',
          content: (
            <Link href={`/company/edit?companyId=${company.id}`}>編集画面</Link>
          ),
        },
        {
          align: 'center',
          content: (
            <IconWrapper>
              <AiFillDelete
                onClick={() => {
                  setDeleteCompanyId(company.id);
                  setShowModal(true);
                }}
              />
            </IconWrapper>
          ),
        },
      ];
    });

    return list as TableType['talbeData'];
  }, [companyList, pageInfo.limit]);

  const handleCloseRemove = useCallback(async () => {
    setShowModal(false);
  }, []);

  const handleModalRemove = useCallback(async () => {
    try {
      if (deleteCompanyId) {
        await removeCompany(deleteCompanyId);
        setShowModal(false);
        setCompanyList(companyList.filter(({ id }) => id !== deleteCompanyId));
      } else {
        throw new Error();
      }
    } catch (error) {
      alert('削除IDが設定されていません');
    }
  }, [companyList, deleteCompanyId, removeCompany]);

  const handleClickButton = useCallback(() => {
    router.push('/company/create');
  }, [router]);

  const handleChangePage = useCallback((startAt: number, isNext: boolean) => {
    setPageInfo((value) => ({ ...value, startAt, isNext }));
  }, []);

  return {
    tableData,
    showModal,
    length: companyList.length,
    pageInfo,
    handleClickButton,
    handleCloseRemove,
    handleModalRemove,
    handleChangePage,
  };
};
