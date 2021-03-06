import React from 'react';
import FullSection from '../components/home/FullSection';
import IntroSection from '../components/home/IntroSection';
import Container from '../styles/Container';

const HomeView = (): JSX.Element => {
  return (
    <Container style={{ paddingBottom: 0 }}>
      <IntroSection />
      <FullSection id="portfolio">Portfolio Overview</FullSection>
    </Container>
  );
};

export default HomeView;
