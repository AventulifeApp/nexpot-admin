import React from 'react';
import styled from 'styled-components';
import { NextProps } from '~/types/common';
import { Header, Sidebar } from '~/components';

type LayoutProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  margin-top: ${(props) => props.theme.headerHeight};
  margin-left: ${(props) => props.theme.sidebarWidth};
  position: relative;
  min-height: 10000px;
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 1000;
`;

const SideBarContainer = styled.div`
  position: fixed;
  top: ${(props) => props.theme.headerHeight};
  left: 0;
  z-index: 1000;
`;

const MainContainer = styled.main`
  padding: 12px;
`;

const Layout: NextProps<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <SideBarContainer>
        <Sidebar />
      </SideBarContainer>
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

export default React.memo<NextProps<LayoutProps>>(Layout);
