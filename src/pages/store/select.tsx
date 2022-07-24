import type { NextPage } from 'next';
import styled from 'styled-components';
import { Pagination, Table, TableType } from '~/components';
import { useStoreSelectUseCase } from '~/model/usecase';

const Div = styled.div``;

const PageTitle = styled.h2`
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;

  div + div {
    margin-left: 20px;
  }
`;

const TableInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
`;

const TableTitle = styled.h3`
  margin: 0 auto;
`;

const TableInfo = styled.p`
  margin: 0;
  margin-top: 20px;
`;

const companyTableHeadData: TableType['tableHeadData'] = [
  { title: '契約会社名', align: 'center', width: '100px' },
  { title: '', width: '80px' },
];

const storeTableHeadData: TableType['tableHeadData'] = [
  { title: '店舗名', align: 'center', width: '100px' },
  { title: '', width: '80px' },
];

const StoreList: NextPage = () => {
  const {
    companyTableData,
    storeTableData,
    companyLength,
    storeLength,
    companyPageInfo,
    storePageInfo,
    handleCompanyChangePage,
    handleStoreChangePage,
  } = useStoreSelectUseCase();

  return (
    <Div>
      <PageTitle>店舗選択画面</PageTitle>
      <Container>
        <TableInfoContainer>
          <TableTitle>契約会社選択</TableTitle>
          <TableInfo>
            <span>
              件数: {(companyPageInfo.startAt - 1) * companyPageInfo.limit + 1}{' '}
              - {companyPageInfo.startAt * companyPageInfo.limit}件目
            </span>
          </TableInfo>
          <Table
            margin='24px 0 0 0'
            talbeData={companyTableData}
            tableHeadData={companyTableHeadData}
          />
          <Pagination
            margin='24px auto 0'
            pageInfo={companyPageInfo}
            length={companyLength}
            onChangePage={handleCompanyChangePage}
          />
        </TableInfoContainer>
        <TableInfoContainer>
          <TableTitle>店舗選択</TableTitle>
          {!!storeLength && (
            <>
              <TableInfo>
                <span>
                  件数: {(storePageInfo.startAt - 1) * storePageInfo.limit + 1}{' '}
                  - {storePageInfo.startAt * storePageInfo.limit}件目
                </span>
              </TableInfo>
              <Table
                margin='24px 0 0 0'
                talbeData={storeTableData}
                tableHeadData={storeTableHeadData}
              />
              <Pagination
                margin='24px auto 0'
                pageInfo={storePageInfo}
                length={storeLength}
                onChangePage={handleStoreChangePage}
              />
            </>
          )}
        </TableInfoContainer>
      </Container>
    </Div>
  );
};

export default StoreList;
