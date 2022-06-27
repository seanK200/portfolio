import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsProvider';

const DefaultLayout = () => {
  const { setHeaderHeight } = useSettings();

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
  max-width: 1120px;
  min-height: 100vh;
  padding: 0 48px;
`;

export default DefaultLayout;
