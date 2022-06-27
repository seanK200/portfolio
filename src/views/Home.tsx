import React from 'react';
import FullSection from '../components/home/FullSection';
import IntroSection from '../components/home/IntroSection';

const HomeView = (): JSX.Element => {
  return (
    <React.Fragment>
      <IntroSection />
      <FullSection id="portfolio">Portfolio Overview</FullSection>
    </React.Fragment>
  );
};

export default HomeView;
