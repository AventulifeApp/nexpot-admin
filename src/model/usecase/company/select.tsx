import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TableType } from '~/components';
import { useCompanyRepo } from '~/model/repository';
import { Company } from '~/model/entity';
import { PagingType } from '~/types/common';

export const useCompanySelectUseCase = () => {
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [pageInfo, setPageInfo] = useState<PagingType>({
    startAt: 1,
    limit: 100,
    orderBy: 'desc',
    isNext: true,
  });

  const companyRepo = useCompanyRepo();

  useEffect(() => {
    const startAt = pageInfo.isNext ? companyList.length - 1 : 0;
    companyRepo
      .fetchAll({
        ...pageInfo,
        startDate: companyList?.[startAt]?.createdAt,
      })
      .then((companyList) => {
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
        { align: 'center' },
        {
          align: 'center',
          content: (
            <Link href={`/store/list?companyId=${company.id}`}>
              店舗一覧画面
            </Link>
          ),
        },
      ];
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
