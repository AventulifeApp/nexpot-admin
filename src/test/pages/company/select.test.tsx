import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import { Company } from '~/model/entity';
import CompanySelect from '~/pages/company/select';

jest.mock('~/model/repository/firestore/company/fetchAll', () => ({
  useFetchAllCompany: () => () =>
    Promise.resolve([
      {
        id: '1',
        name: 'あああ',
        phone: '0801111111',
        uid: 'fjhlhkFC743',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ] as Company[]),
}));
jest.mock('~/model/repository/firestore/company/remove', () => ({
  useRemoveCompany: () => {},
}));

describe('src/pages/company/select.tsx', () => {
  it('契約会社名にcompaniesコレクションから取得したnameが表示されていること', async () => {
    let data: RenderResult;
    act(() => {
      data = render(<CompanySelect />);
    });

    waitFor(() => {
      const tableRow = data.getByTestId('10');
      console.log(tableRow.textContent);
    });
    // fireEvent.click(screen.getByTestId('10'));
  });
  // it('店舗一覧画面を押下すると/store/list?companyId=xxxに遷移する', () => {
  //   let isEvent = false;
  //   render(
  //     <Pagination
  //       length={10}
  //       pageInfo={{ isNext: true, limit: 10, orderBy: 'asc', startAt: 1 }}
  //       onChangePage={() => {
  //         isEvent = true;
  //       }}
  //     />
  //   );
  //   fireEvent.click(screen.getByTestId('pagination-left-button'));
  //   act(() => {
  //     expect(isEvent).toBeFalsy();
  //   });
  // });
  // it('店舗一覧画面を押下するとクエリパラメータとして紐づいたcompanyIdが付与されている', () => {
  //   let isEvent = false;
  //   render(
  //     <Pagination
  //       length={10}
  //       pageInfo={{ isNext: true, limit: 10, orderBy: 'asc', startAt: 1 }}
  //       onChangePage={() => {
  //         isEvent = true;
  //       }}
  //     />
  //   );
  //   fireEvent.click(screen.getByTestId('pagination-left-button'));
  //   act(() => {
  //     expect(isEvent).toBeFalsy();
  //   });
  // });
});
