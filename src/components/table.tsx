import React, { memo, ReactNode } from 'react';
import styled from 'styled-components';

import { NextProps } from '~/types/common';

type Align = 'left' | 'center' | 'right';

type TableType = {
  headTableData: { title: string; align?: Align; width?: string }[];
  talbeData: { align?: Align; content: ReactNode | string }[][];
};

const Table = styled.table<{ width?: string }>`
  border-collapse: collapse;
  width: ${(props) => props.width ?? '100%'};
`;
const THead = styled.thead`
  border: solid 1px;
  background-color: ${(props) => props.theme.gray500};
`;
const TBody = styled.tbody``;

const Tr = styled.tr<{ isOdd?: boolean }>`
  ${(props) => props.isOdd && 'background-color: ' + props.theme.gray200};
  height: 40px;
`;
const Th = styled.th<{ width?: string }>`
  ${(props) => props.width && 'width: ' + props.width};
  padding: 0 4px;
`;
const Td = styled.td<{ align?: Align }>`
  text-align: ${(props) => props.align ?? 'center'};
  padding: 0 4px;
`;

const BaseTable: NextProps<TableType> = ({
  headTableData = [],
  talbeData = [],
}) => {
  return (
    <Table>
      <THead>
        <Tr>
          {headTableData.map(({ title, ...attr }) => (
            <Th key={title} {...attr}>
              {title}
            </Th>
          ))}
        </Tr>
      </THead>
      <TBody>
        {talbeData.map((row, i) => (
          <Tr key={i} isOdd={i % 2 === 0}>
            {row.map(({ content, ...attr }, j) => {
              return (
                <Td key={j} {...attr}>
                  {content}
                </Td>
              );
            })}
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default memo<TableType>(BaseTable);