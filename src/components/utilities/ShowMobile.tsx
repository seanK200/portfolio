import React from 'react';
import { useGlobals } from '../../contexts/GlobalProvider';
import breakpoints from '../../styles/breakpoints';

type Props = { children?: React.ReactNode };

const ShowMobile = (props: Props) => {
  const { windowSize } = useGlobals();

  // Only render children on mobile screens
  if (windowSize.width <= breakpoints.mobile) {
    if (props.children) return props.children as React.ReactElement;
  }
  return null;
};

export default ShowMobile;
