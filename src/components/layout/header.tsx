import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { NextProps } from '~/types/common';

type HeaderProps = {};

const HeaderContainer = styled.header`
  min-width: 100vw;
  height: ${(props) => props.theme.headerHeight};
  background-color: ${(props) => props.theme.gray800};
  display: flex;
  padding: 12px;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  color: ${(props) => props.theme.gray200};
  margin: 0;
  cursor: pointer;
`;

const Header: NextProps<HeaderProps> = ({}) => {
  const router = useRouter();
  return (
    <HeaderContainer>
      <HeaderTitle onClick={() => router.push('/top')}>Nexpot</HeaderTitle>
    </HeaderContainer>
  );
};

export default React.memo<NextProps<HeaderProps>>(Header);
