import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const DefaultLayout = () => {
  return (
    <React.Fragment>
      <Header />
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
  max-width: 1024px;
`;

export default DefaultLayout;
