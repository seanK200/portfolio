import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useGlobals } from '../contexts/GlobalProvider';

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
  min-height: 100vh;
`;

export default DefaultLayout;
