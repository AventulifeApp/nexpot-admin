import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { Pagination } from '~/components';
import { PagingType } from '~/model/repository/use-company';

describe('src/components/pagination.tsx', () => {
  it('2ページ目の場合、prev page eventが発火すること', () => {
    let isEvent = false;

    render(
      <Pagination
        length={11}
        pageInfo={{ isNext: true, limit: 10, orderBy: 'asc', startAt: 2 }}
        onChangePage={() => {
          isEvent = true;
        }}
      />
    );

    fireEvent.click(screen.getByTestId('pagination-left-button'));

    act(() => {
      expect(isEvent).toBeTruthy();
    });
  });

  it('1ページ目の場合、prev page eventが発火すること', () => {
    let isEvent = false;

    render(
      <Pagination
        length={10}
        pageInfo={{ isNext: true, limit: 10, orderBy: 'asc', startAt: 1 }}
        onChangePage={() => {
          isEvent = true;
        }}
      />
    );

    fireEvent.click(screen.getByTestId('pagination-left-button'));

    act(() => {
      expect(isEvent).toBeFalsy();
    });
  });

  it('取得件数 > limitの場合、next page eventが発火すること', () => {
    let isEvent = false;

    render(
      <Pagination
        length={11}
        pageInfo={{ isNext: true, limit: 10, orderBy: 'asc', startAt: 1 }}
        onChangePage={() => {
          isEvent = true;
        }}
      />
    );

    fireEvent.click(screen.getByTestId('pagination-right-button'));

    act(() => {
      expect(isEvent).toBeTruthy();
    });
  });

  it('取得件数 <= limitの場合、next page eventが発火しないこと', () => {
    let isEvent = false;

    render(
      <Pagination
        length={10}
        pageInfo={{ isNext: true, limit: 10, orderBy: 'asc', startAt: 1 }}
        onChangePage={() => {
          isEvent = true;
        }}
      />
    );

    fireEvent.click(screen.getByTestId('pagination-right-button'));

    act(() => {
      expect(isEvent).toBeFalsy();
    });
  });
});
