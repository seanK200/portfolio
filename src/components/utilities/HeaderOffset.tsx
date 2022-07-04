import React from 'react';
import { useGlobals } from '../../contexts/GlobalProvider';

// invisible div with height of header to prevent content being
// covered by the header

type HeaderOffsetProps = {
  marginBottom?: string; // additional margin bottom, if needed
};

const HeaderOffset = ({ marginBottom = '1rem' }: HeaderOffsetProps) => {
  const { headerHeight } = useGlobals();
  const headerOffsetStyle: React.CSSProperties = {
    height: `${headerHeight}px`,
    marginBottom: marginBottom ? marginBottom : undefined,
  };

  return <div style={headerOffsetStyle}></div>;
};

export default HeaderOffset;
