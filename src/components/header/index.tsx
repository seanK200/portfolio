import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useText from '../../hooks/useText';
import navTexts from '../../texts/navTexts';
import Asset from '../utilities/Asset';

type PropTypes = {
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
};

const Header = ({ setHeaderHeight }: PropTypes): JSX.Element => {
  const t = useText(navTexts);
  const activeClassName = 'active';
  const headerRef = useRef<HTMLElement>(null);

  // Report header height to parent
  useEffect(() => {
    if (headerRef.current) {
      const { height } = headerRef.current.getBoundingClientRect();
      setHeaderHeight(height);
    }
  }, []);

  return (
    <SHeader ref={headerRef}>
      <Link to="/">
        <Asset
          src="logo.png"
          width="20px"
          height="25px"
          spriteX={1}
          spriteY={2}
        />
      </Link>
      <Navigation>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          {t('home')}
        </NavLink>
        <NavLink
          to="/portfolio"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          {t('portfolio')}
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          {t('blog')}
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          {t('about')}
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
