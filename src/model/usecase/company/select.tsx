import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TableType } from '~/components';
import { Company } from '~/model/entity';
import { useFetchAllCompany } from '~/model/repository/firestore/company/fetchAll';
import { PagingType } from '~/types/common';

export const useCompanySelectUseCase = () => {
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [pageInfo, setPageInfo] = useState<PagingType>({
    startAt: 1,
    limit: 100,
    orderBy: 'desc',
    isNext: true,
  });
  const fetchAllCompany = useFetchAllCompany();

  useEffect(() => {
    const startAt = pageInfo.isNext ? companyList.length - 1 : 0;
    fetchAllCompany({
      ...pageInfo,
      startDate: companyList?.[startAt]?.createdAt,
    }).then((companyList) => {
      if (!companyList) {
        alert('データの取得ができませんでした');
        return;
      }
      setCompanyList(companyList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo]);

  const tableData = useMemo<TableType['talbeData']>(() => {
    let workCompanyList = companyList;
    if (pageInfo.limit < workCompanyList.length) {
      workCompanyList = workCompanyList.slice(0, -1);
    }
    const list = workCompanyList.map((company, i) => {
      return {
        key: company.id,
        data: [
          { align: 'center', content: company.name },
          { align: 'center' },
          {
            align: 'center',
            content: (
              <Link
                href={`/store/list?companyId=${company.id}`}
                data-testid={`${company.id}${i}`}
              >
                店舗一覧画面
              </Link>
            ),
          },
        ],
      };
    });

    return list as TableType['talbeData'];
  }, [companyList, pageInfo.limit]);

  const handleChangePage = useCallback((startAt: number, isNext: boolean) => {
    setPageInfo((value) => ({ ...value, startAt, isNext }));
  }, []);

  return {
    tableData,
    length: companyList.length,
    pageInfo,
    handleChangePage,
  };
};
