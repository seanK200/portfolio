import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

type PropTypes = {
  setFooterHeight: React.Dispatch<React.SetStateAction<number>>;
};

const Footer = ({ setFooterHeight }: PropTypes) => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      const { height } = footerRef.current.getBoundingClientRect();
      setFooterHeight(height);
    }
  }, []);

  return <SFooter ref={footerRef}>Footer</SFooter>;
};

const SFooter = styled.footer`
  width: 100%;
  padding: 24px 48px;
  background-color: ${({ theme }) => theme.color.primary.background};
`;

export default Footer;
