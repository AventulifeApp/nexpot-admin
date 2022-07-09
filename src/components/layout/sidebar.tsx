import React from 'react';
import styled from 'styled-components';

import { NextProps } from '~/types/common';

type SiderBarProps = {};

const SideBarContainer = styled.nav`
  min-width: ${(props) => props.theme.sidebarWidth};
  min-height: calc(100vh - 64px);
  background-color: ${(props) => props.theme.gray700};
`;

const Contents = styled.ul`
  margin: 0;
  padding: 12px 0 0 0;
`;

const Content = styled.li`
  list-style: none;
  color: ${(props) => props.theme.gray200};
  cursor: pointer;
  padding: 12px;
  :hover {
    background-color: ${(props) => props.theme.gray400};
  }
`;

const sideBarDatas = [
  { title: '契約会社', link: '' },
  { title: '店舗', link: '' },
  { title: 'レンタサイクル置場', link: '' },
  { title: '店舗権限ユーザー', link: '' },
  { title: '観光ルート', link: '' },
];

const SiderBar: NextProps<SiderBarProps> = ({}) => {
  return (
    <SideBarContainer>
      <Contents>
        {sideBarDatas.map((data) => {
          return <Content key={data.link}>{data.title}</Content>;
        })}
      </Contents>
    </SideBarContainer>
  );
};

export default React.memo<NextProps<SiderBarProps>>(SiderBar);
