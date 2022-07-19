import React from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import styled from 'styled-components';
import { PagingType } from '~/model/repository/use-company';
import { NextProps } from '~/types/common';

type PaginationProps = {
  length: number;
  pageInfo: PagingType;
  onChangePage: (startAt: number, isNext: boolean) => void;
  margin?: string;
};

const PaginationContainer = styled.div<{ margin?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: ${(props) => props.theme.gray700};
  ${(props) => props.margin && 'margin: ' + props.margin};

  > span {
    margin: 0 20px;
  }
`;

const IconContainer = styled.div<{ isDisable: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props) => props.isDisable && 'color: ' + props.theme.gray300};
  :hover {
    ${(props) => !props.isDisable && 'color: ' + props.theme.gray800};
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  length,
  pageInfo,
  onChangePage,
  margin,
}) => {
  const isDisablePrev = pageInfo.startAt < 2;
  const isDisableNext = length <= pageInfo.limit && pageInfo.isNext;
  return (
    <PaginationContainer margin={margin}>
      <IconContainer
        data-testid='pagination-left-button'
        isDisable={isDisablePrev}
        onClick={() => {
          if (!isDisablePrev) {
            onChangePage(pageInfo.startAt - 1, false);
          }
        }}
      >
        <BsFillArrowLeftCircleFill />
      </IconContainer>
      <span>{pageInfo.startAt}</span>
      <IconContainer
        data-testid='pagination-right-button'
        isDisable={isDisableNext}
        onClick={() => {
          if (!isDisableNext) {
            onChangePage(pageInfo.startAt + 1, true);
          }
        }}
      >
        <BsFillArrowRightCircleFill />
      </IconContainer>
    </PaginationContainer>
  );
};

export default React.memo<NextProps<PaginationProps>>(Pagination);
