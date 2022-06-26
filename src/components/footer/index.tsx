import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import LangSelector from './LangSelector';
import ThemeSelector from './ThemeSelector';

type PropTypes = {
  setFooterHeight?: React.Dispatch<React.SetStateAction<number>>;
};

const Footer = ({ setFooterHeight }: PropTypes) => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      const { height } = footerRef.current.getBoundingClientRect();
      typeof setFooterHeight === 'function' && setFooterHeight(height);
    }
  }, []);

  return (
    <SFooter ref={footerRef}>
      <FooterSection>
        <span className="highlight">Youngwoo Kim</span>
      </FooterSection>
      <FooterSection>
        <ThemeSelector />
        <LangSelector />
      </FooterSection>
    </SFooter>
  );
};

const SFooter = styled.footer`
  width: 100%;
  padding: 24px 48px;
  color: ${({ theme }) =>
    theme.textColor.primary
      ? theme.textColor.primary.default
      : theme.textColor.default};
  background-color: ${({ theme }) => theme.color.primary.default};
  display: flex;
  justify-content: space-between;
  & span.highlight {
    font-family: Righteous;
  }
`;

const FooterSection = styled.section`
  position: relative;
`;

export default Footer;
