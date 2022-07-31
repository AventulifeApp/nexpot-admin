import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { TableType } from '~/components';
import { Company, Store } from '~/model/entity';
import { useRouter } from 'next/router';
import { PagingType } from '~/types/common';
import { useFetchAllCompany } from '~/model/repository/firestore/company/fetchAll';
import { useFetchAllStore } from '~/model/repository/firestore/store/fetchAll';

const CompanyButton = styled.button`
  color: #0000ff;
  text-decoration: underline;
  border: none;
  outline: none;
  background-color: inherit;
  cursor: pointer;
  font-size: 16px;

  &:visited {
    color: #000080;
  }
  &:hover {
    color: #ff0000;
  }
  &:active {
    color: #ff8000;
  }
`;

const defaultPageInfo: PagingType = {
  startAt: 1,
  limit: 100,
  orderBy: 'desc',
  isNext: true,
};

export const useStoreSelectUseCase = () => {
  const router = useRouter();
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState<string>('');
  const [companyPageInfo, setCompanyPageInfo] =
    useState<PagingType>(defaultPageInfo);
  const [storePageInfo, setStorePageInfo] =
    useState<PagingType>(defaultPageInfo);
  const fetchAllCompany = useFetchAllCompany();
  const fetchAllStore = useFetchAllStore();
  const menu = router.query.menu;

  useEffect(() => {
    setCompanyList([]);
    setStoreList([]);
    setCompanyPageInfo({ ...defaultPageInfo });
    setStorePageInfo({ ...defaultPageInfo });
  }, [menu]);

  useEffect(() => {
    const startAt = companyPageInfo.isNext ? companyList.length - 1 : 0;
    fetchAllCompany({
      ...companyPageInfo,
      startDate: companyList?.[startAt]?.createdAt,
    }).then((companyList) => {
      if (companyList) {
        setCompanyList(companyList);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyPageInfo]);

  useEffect(() => {
    let startAt = storePageInfo.isNext ? storeList.length - 1 : 0;

    if (companyId) {
      fetchAllStore({
        ...storePageInfo,
        startDate: storeList?.[startAt]?.createdAt,
        companyId: companyId,
      }).then((storeList) => {
        console.log({ storeList });

        if (storeList) {
          setStoreList(storeList);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, storePageInfo]);

  const companyTableData = useMemo<TableType['talbeData']>(() => {
    let workCompanyList = companyList;
    if (companyPageInfo.limit < workCompanyList.length) {
      workCompanyList = workCompanyList.slice(0, -1);
    }
    const list = workCompanyList.map((company) => {
      return {
        key: company.id,
        data: [
          { align: 'center', content: company.name },
          {
            align: 'right',
            content: (
              <CompanyButton
                onClick={() => {
                  if (companyId !== company.id) {
                    setCompanyId(company.id);
                    setStoreList([]);
                  }
                }}
              >
                店舗を選択する
              </CompanyButton>
            ),
          },
        ],
      };
    });

    return list as TableType['talbeData'];
  }, [companyId, companyList, companyPageInfo.limit]);

  const storeTableData = useMemo<TableType['talbeData']>(() => {
    let workStoreList = storeList;
    if (companyPageInfo.limit < workStoreList.length) {
      workStoreList = workStoreList.slice(0, -1);
    }
    const list = workStoreList.map((store) => {
      return {
        key: store.id,
        data: [
          { align: 'center', content: store.name },
          {
            align: 'right',
            content: (
              <Link href={`/${menu}/list?storeId=${store.id}`}>
                次の画面へ進む
              </Link>
            ),
          },
        ],
      };
    });

    return list as TableType['talbeData'];
  }, [storeList, companyPageInfo.limit, menu]);

  const handleCompanyChangePage = useCallback(
    (startAt: number, isNext: boolean) => {
      setCompanyPageInfo((value) => ({ ...value, startAt, isNext }));
    },
    []
  );

  const handleStoreChangePage = useCallback(
    (startAt: number, isNext: boolean) => {
      setStorePageInfo((value) => ({ ...value, startAt, isNext }));
    },
    []
  );

  return {
    companyTableData,
    storeTableData,
    companyLength: companyList.length,
    storeLength: storeList.length,
    companyPageInfo,
    storePageInfo,
    handleCompanyChangePage,
    handleStoreChangePage,
  };
};
