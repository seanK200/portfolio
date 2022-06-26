import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsProvider';

const DefaultLayout = () => {
  const { headerHeight, setHeaderHeight } = useSettings();

  return (
    <React.Fragment>
      <Header setHeaderHeight={setHeaderHeight} />
      <Main
        style={{
          minHeight: `calc(100vh - ${Math.ceil(headerHeight)}px)`,
        }}
      >
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
