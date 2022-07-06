import React from 'react';
import { useGlobals } from '../../contexts/GlobalProvider';
import breakpoints, { Breakpoint } from '../../styles/breakpoints';

type Props = {
  breakpoint?: keyof Breakpoint;
  children?: React.ReactNode;
};

const HideMobile = ({ breakpoint = 'mobile', children }: Props) => {
  const { windowSize } = useGlobals();

  // Only render children when not on mobile screens
  if (windowSize.width > breakpoints[breakpoint])
    return children as React.ReactElement;
  return null;
};

export default HideMobile;
