import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { TableType } from '~/components';
import { useCompanyRepo, useStoreRepo } from '~/model/repository';
import { Company, Store } from '~/model/entity';
import { useRouter } from 'next/router';
import { PagingType } from '~/types/common';

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
  const [companyPageInfo, setCompanyPageInfo] =
    useState<PagingType>(defaultPageInfo);
  const [storePageInfo, setStorePageInfo] =
    useState<PagingType>(defaultPageInfo);
  const companyRepo = useCompanyRepo();
  const storeRepo = useStoreRepo();
  const menu = router.query.menu;

  useEffect(() => {
    setCompanyList([]);
    setStoreList([]);
    setCompanyPageInfo({ ...defaultPageInfo });
    setStorePageInfo({ ...defaultPageInfo });
  }, [menu]);

  useEffect(() => {
    const startAt = companyPageInfo.isNext ? companyList.length - 1 : 0;
    companyRepo
      .fetchAll({
        ...companyPageInfo,
        startDate: companyList?.[startAt]?.createdAt,
      })
      .then((companyList) => {
        console.log({ companyList });
        setCompanyList(companyList);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyPageInfo]);

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
                  const startAt = storePageInfo.isNext
                    ? storeList.length - 1
                    : 0;
                  if (company.id) {
                    storeRepo
                      .fetchAll({
                        ...storePageInfo,
                        startDate: storeList?.[startAt]?.createdAt,
                        companyId: company.id as string,
                      })
                      .then((storeList) => {
                        console.log({ storeList });

                        setStoreList(storeList);
                      });
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
  }, [companyList, companyPageInfo.limit, storeList, storePageInfo, storeRepo]);

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
