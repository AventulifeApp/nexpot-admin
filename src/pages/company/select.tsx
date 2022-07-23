import type { NextPage } from 'next';
import styled from 'styled-components';
import { Pagination, Table, TableType } from '~/components';
import { useCompanySelectUseCase } from '~/model/usecase';

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
  { title: '契約会社名', align: 'center', width: '200px' },
  { title: '' },
  { title: '', width: '200px' },
];

const CompanyList: NextPage = () => {
  const { tableData, length, pageInfo, handleChangePage } =
    useCompanySelectUseCase();

  return (
    <Div>
      <PageTitle>契約会社選択画面</PageTitle>
      <TableInfoContainer>
        <span>
          件数: {(pageInfo.startAt - 1) * pageInfo.limit + 1} -{' '}
          {pageInfo.startAt * pageInfo.limit}件目
        </span>
      </TableInfoContainer>
      <Table talbeData={tableData} tableHeadData={tableHeadData} />
      <Pagination
        margin='24px 0 0 0'
        pageInfo={pageInfo}
        length={length}
        onChangePage={handleChangePage}
      />
    </Div>
  );
};

export default CompanyList;
