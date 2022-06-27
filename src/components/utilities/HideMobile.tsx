import React from 'react';
import { useGlobals } from '../../contexts/GlobalProvider';
import breakpoints from '../../styles/breakpoints';

type Props = {
  children?: React.ReactNode;
};

const HideMobile = (props: Props) => {
  const { windowSize } = useGlobals();

  // Only render children when not on mobile screens
  if (windowSize.width > breakpoints.mobile)
    return props.children as React.ReactElement;
  return null;
};

export default HideMobile;
