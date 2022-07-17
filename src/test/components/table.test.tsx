import { render, screen } from '@testing-library/react';
import { Table } from '~/components';

describe('src/components/table.tsx', () => {
  it('3件データを渡した場合、3行表示される', () => {
    render(
      <Table
        talbeData={[
          [
            { align: 'center', content: <>aaaa</> },
            { align: 'left', content: 'fjlsdfjsdlkf' },
            { align: 'right', content: <a href=''>編集画面</a> },
            { align: 'center', content: <input type={'checkbox'} /> },
          ],
          [
            { align: 'left', content: <></> },
            { align: 'left', content: 'fjlsdfjsdlkf' },
            { align: 'right', content: <a href=''>編集画面</a> },
            { align: 'center', content: <input type={'checkbox'} /> },
          ],
          [
            { align: 'left', content: <></> },
            { align: 'left', content: 'fjlsdfjsdlkf' },
            { align: 'right', content: <a href=''>編集画面</a> },
            { align: 'center', content: <input type={'checkbox'} /> },
          ],
        ]}
        tableHeadData={[
          { title: '契約会社名', align: 'left', width: '100px' },
          { title: '電話番号', align: 'left', width: '200px' },
          { title: '' },
          { title: '削除', align: 'center' },
        ]}
      />
    );

    expect(screen.queryAllByTestId('body-tr').length).toBe(3);
  });

  it('0件データを渡した場合、0行表示される', () => {
    render(
      <Table
        talbeData={[]}
        tableHeadData={[
          { title: '契約会社名', align: 'left', width: '100px' },
          { title: '電話番号', align: 'left', width: '200px' },
          { title: '' },
          { title: '削除', align: 'center' },
        ]}
      />
    );

    expect(screen.queryAllByTestId('body-tr').length).toBe(0);
  });
});
