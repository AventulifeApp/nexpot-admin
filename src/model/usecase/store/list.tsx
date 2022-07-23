import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import styled from 'styled-components';
import { TableType } from '~/components';
import { useStoreRepo } from '~/model/repository';
import { Store } from '~/model/entity';
import { useRouter } from 'next/router';
import { PagingType } from '~/types/common';

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

  const storeRepo = useStoreRepo();

  useEffect(() => {
    const startAt = pageInfo.isNext ? storeList.length - 1 : 0;
    storeRepo
      .fetchAll({
        ...pageInfo,
        startDate: storeList?.[startAt]?.createdAt,
      })
      .then((storeList) => {
        setStoreList(storeList);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo]);

  const tableData = useMemo<TableType['talbeData']>(() => {
    let workstoreList = storeList;
    if (pageInfo.limit < workstoreList.length) {
      workstoreList = workstoreList.slice(0, -1);
    }
    const list = workstoreList.map((store) => {
      return [
        { align: 'center', content: store.name },
        { align: 'center', content: store.phone },
        { align: 'center', content: store.address },
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
      ];
    });

    return list as TableType['talbeData'];
  }, [storeList, pageInfo.limit]);

  const handleCloseRemove = useCallback(async () => {
    setShowModal(false);
  }, []);

  const handleModalRemove = useCallback(async () => {
    try {
      if (deleteStoreId) {
        await storeRepo.remove(deleteStoreId);
        setShowModal(false);
        setStoreList(storeList.filter(({ id }) => id !== deleteStoreId));
      } else {
        throw new Error();
      }
    } catch (error) {
      alert('削除IDが設定されていません');
    }
  }, [storeList, storeRepo, deleteStoreId]);

  const handleClickButton = useCallback(() => {
    router.push('/store/create');
  }, [router]);

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
