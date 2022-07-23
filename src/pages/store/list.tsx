import type { NextPage } from 'next';
import styled from 'styled-components';
import {
  Button,
  ConfirmModal,
  Pagination,
  Table,
  TableType,
} from '~/components';
import { useStoreListUseCase } from '~/model/usecase';

const Div = styled.div`
  font-weight: bold;
`;

const PageTitle = styled.h2``;
const TableInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const tableHeadData: TableType['tableHeadData'] = [
  { title: '店舗名', align: 'center', width: '20%' },
  { title: '電話番号', align: 'center', width: '20%' },
  { title: '住所', align: 'center', width: '' },
  { title: '', width: '80px' },
  { title: '削除', align: 'center', width: '10%' },
];

const StoreList: NextPage = () => {
  const {
    tableData,
    showModal,
    length,
    deleteModalMessage,
    pageInfo,
    handleCloseRemove,
    handleModalRemove,
    handleClickButton,
    handleChangePage,
  } = useStoreListUseCase();

  return (
    <Div>
      <PageTitle>店舗一覧画面</PageTitle>
      <TableInfoContainer>
        <span>
          件数: {(pageInfo.startAt - 1) * pageInfo.limit + 1} -{' '}
          {pageInfo.startAt * pageInfo.limit}件目
        </span>
        <Button color='green' width='80px' onClick={handleClickButton}>
          新規登録
        </Button>
      </TableInfoContainer>
      <Table talbeData={tableData} tableHeadData={tableHeadData} />
      <Pagination
        margin='24px 0 0 0'
        pageInfo={pageInfo}
        length={length}
        onChangePage={handleChangePage}
      />
      <ConfirmModal
        showModal={showModal}
        title={'店舗情報削除'}
        content={deleteModalMessage}
        leftButton={{
          text: '閉じる',
          onClick: handleCloseRemove,
          color: 'clear',
        }}
        rightButton={{
          text: '削除',
          onClick: handleModalRemove,
          color: 'red',
        }}
      />
    </Div>
  );
};

export default StoreList;
