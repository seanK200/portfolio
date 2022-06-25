import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const DefaultLayout = () => {
  const [headerHeight, setHeaderHeight] = useState<number>(0); // px
  const [footerHeight, setFooterHeight] = useState<number>(0); // px

  return (
    <React.Fragment>
      <Header setHeaderHeight={setHeaderHeight} />
      <Main
        style={{
          minHeight: `calc(100vh - ${headerHeight + footerHeight}px)`,
        }}
      >
        <Outlet />
      </Main>
      <Footer setFooterHeight={setFooterHeight} />
    </React.Fragment>
  );
};

const Main = styled.main`
  margin: auto;
  width: 100%;
  max-width: 1024px;
`;

export default DefaultLayout;
