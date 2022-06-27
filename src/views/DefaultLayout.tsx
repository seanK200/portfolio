import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobals } from '../contexts/GlobalProvider';
import breakpoints from '../styles/breakpoints';

const DefaultLayout = () => {
  const { setHeaderHeight } = useGlobals();

  return (
    <React.Fragment>
      <Header setHeaderHeight={setHeaderHeight} />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </React.Fragment>
  );
};

const Main = styled.main`
  margin: auto;
  width: 100%;
  max-width: min(1120px, 100vw);
  min-height: 100vh;
  padding: 0 48px;
  overflow-x: hidden;
  @media screen and (max-width: ${breakpoints.mobile}px) {
    padding: 0 36px;
  }
`;

export default DefaultLayout;
