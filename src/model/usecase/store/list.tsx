import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import styled from 'styled-components';
import { TableType } from '~/components';
import { Store } from '~/model/entity';
import { useRouter } from 'next/router';
import { PagingType } from '~/types/common';
import { useFetchAllStore } from '~/model/repository/firestore/store/fetchAll';
import { useRemoveStore } from '~/model/repository/firestore/store/remove';

const IconWrapper = styled.div`
  cursor: pointer;
`;

export const useStoreListUseCase = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deleteModalMessage, setDeleteModalMessage] = useState('');
  const [deleteStoreId, setDeleteStoreId] = useState<string | null>(null);
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [pageInfo, setPageInfo] = useState<PagingType>({
    startAt: 1,
    limit: 100,
    orderBy: 'desc',
    isNext: true,
  });
  const fetchAllStore = useFetchAllStore();
  const removeStore = useRemoveStore();
  const companyId = router.query.companyId;

  useEffect(() => {
    const startAt = pageInfo.isNext ? storeList.length - 1 : 0;
    if (companyId) {
      fetchAllStore({
        ...pageInfo,
        startDate: storeList?.[startAt]?.createdAt,
        companyId: companyId as string,
      }).then((storeList) => {
        if (storeList) {
          setStoreList(storeList);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo, companyId]);

  const tableData = useMemo<TableType['talbeData']>(() => {
    let workstoreList = storeList;
    if (pageInfo.limit < workstoreList.length) {
      workstoreList = workstoreList.slice(0, -1);
    }
    const list = workstoreList.map((store) => {
      return {
        key: store.id,
        data: [
          { align: 'center', content: store.name },
          { align: 'center', content: store.phone },
          { align: 'left', content: store.address },
          {
            align: 'right',
            content: (
              <Link href={`/store/edit?storeId=${store.id}`}>編集画面</Link>
            ),
          },
          {
            align: 'center',
            content: (
              <IconWrapper>
                <AiFillDelete
                  onClick={() => {
                    setDeleteStoreId(store.id);
                    setShowModal(true);
                    setDeleteModalMessage(
                      `会社名: ${store.companyName}、店舗名: ${store.name} の店舗情報（紐づくレンタサイクル置場情報）を削除します。`
                    );
                  }}
                />
              </IconWrapper>
            ),
          },
        ],
      };
    });

    return list as TableType['talbeData'];
  }, [storeList, pageInfo.limit]);

  const handleCloseRemove = useCallback(async () => {
    setShowModal(false);
  }, []);

  const handleModalRemove = useCallback(async () => {
    try {
      if (deleteStoreId) {
        await removeStore(deleteStoreId);
        setShowModal(false);
        setStoreList(storeList.filter(({ id }) => id !== deleteStoreId));
      } else {
        throw new Error();
      }
    } catch (error) {
      alert('削除IDが設定されていません');
    }
  }, [deleteStoreId, removeStore, storeList]);

  const handleClickButton = useCallback(() => {
    router.push(`/store/create?companyId=${companyId}`);
  }, [companyId, router]);

  const handleChangePage = useCallback((startAt: number, isNext: boolean) => {
    setPageInfo((value) => ({ ...value, startAt, isNext }));
  }, []);

  return {
    tableData,
    showModal,
    deleteModalMessage,
    length: storeList.length,
    pageInfo,
    handleClickButton,
    handleCloseRemove,
    handleModalRemove,
    handleChangePage,
  };
};
