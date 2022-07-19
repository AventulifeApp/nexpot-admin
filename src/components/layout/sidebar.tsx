import { useRouter } from 'next/router';
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

  cursor: pointer;
  color: ${(props) => props.theme.gray200};
  padding: 12px;
  :hover {
    background-color: ${(props) => props.theme.gray400};
  }
`;

const sideBarDatas = [
  { title: '契約会社', link: '/company/list' },
  { title: '店舗', link: '/company/select' },
  { title: 'レンタサイクル置場', link: '/store/select?menu=rentalCycle' },
  { title: '店舗権限ユーザー', link: '/store/select?menu=storeUser' },
  {
    title: '観光ルート',
    link: '/store/select?menu=sightseeingRoute',
    roleUrl: '/sightseeingRoute/list',
  },
];

const SiderBar: NextProps<SiderBarProps> = ({}) => {
  const router = useRouter();
  return (
    <SideBarContainer>
      <Contents>
        {sideBarDatas.map((data) => {
          // TODO: 観光ルートの場合、権限によって遷移先を変更
          return (
            <Content key={data.link} onClick={() => router.push(data.link)}>
              {data.title}
            </Content>
          );
        })}
      </Contents>
    </SideBarContainer>
  );
};

export default React.memo<NextProps<SiderBarProps>>(SiderBar);
