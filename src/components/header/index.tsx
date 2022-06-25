import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ThemedAsset from '../utilities/ThemedAsset';
import useText, { MultiLangTexts } from '../../hooks/useText';

const headerTexts: MultiLangTexts = {
  'nav/home': {
    ko: '홈',
    en: 'Home',
  },
  'nav/portfolio': {
    ko: '포트폴리오',
    en: 'Portfolio',
  },
  'nav/blog': {
    ko: '블로그',
    en: 'Blog',
  },
  'nav/about': {
    ko: '연락하기',
    en: 'About me',
  },
};

type PropTypes = {
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
};

const Header = ({ setHeaderHeight }: PropTypes): JSX.Element => {
  const t = useText(headerTexts);
  const activeClassName = 'active';
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const { height } = headerRef.current.getBoundingClientRect();
      setHeaderHeight(height);
    }
  }, []);

  return (
    <SHeader ref={headerRef}>
      <Link to="/">
        <ThemedAsset
          src="logo.png"
          alt="1"
          width="20px"
          height="25px"
          hoverable={true}
        />
      </Link>
      <Navigation>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          {t('nav/home')}
        </NavLink>
        <NavLink
          to="/portfolio"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          {t('nav/portfolio')}
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          {t('nav/blog')}
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          {t('nav/about')}
        </NavLink>
      </Navigation>
    </SHeader>
  );
};

const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
`;

const Navigation = styled.nav`
  & a {
    padding-left: 48px;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor.default};
  }
  & a.active {
    color: ${({ theme }) => theme.color.primary.default};
  }
`;

export default Header;
