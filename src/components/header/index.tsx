import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useGlobals } from '../../contexts/GlobalProvider';
import { useSettings } from '../../contexts/SettingsProvider';
import useOverlay from '../../hooks/useOverlay';
import useText from '../../hooks/useText';
import breakpoints from '../../styles/breakpoints';
import SContainer from '../../styles/Container';
import Highlight from '../../styles/Highlight';
import themes from '../../styles/theme';
import navTexts from '../../texts/navTexts';
import Hamburger from '../Hamburger';
import Asset from '../utilities/Asset';
import ShowMobile from '../utilities/ShowMobile';

type PropTypes = {
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
};

const Header = ({ setHeaderHeight }: PropTypes): JSX.Element => {
  const { headerHeight, isScrollingDown, windowSize } = useGlobals();
  const { theme, language } = useSettings();
  const headerRef = useRef<HTMLElement>(null);
  const t = useText(navTexts);
  const activeClassName = 'active';
  const location = useLocation();

  // Mobile
  const isMobile = windowSize.width <= breakpoints.mobile;
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const handleNavOpenClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsNavOpen((prev) => !prev);
  };

  // Report header height to parent
  useEffect(() => {
    if (headerRef.current) {
      const { height } = headerRef.current.getBoundingClientRect();
      setHeaderHeight(height);
    }
  }, []);

  // Mobile: Prevent body scroll when Nav is open
  useOverlay(isMobile && isNavOpen);

  // Mobile: Close Nav when window becomes larger than mobile size
  useEffect(() => {
    if (!isMobile && isNavOpen) setIsNavOpen(false);
  }, [isMobile, isNavOpen]);

  // Mobile: Close Nav when moving to another page (when user clicks on link)
  useEffect(() => {
    if (isMobile && isNavOpen) setIsNavOpen(false);
  }, [location]);

  return (
    <SHeader
      ref={headerRef}
      headerHeight={headerHeight}
      isScrollingDown={isScrollingDown}
      isNavOpen={isNavOpen}
    >
      <Container>
        <Link to="/">
          <Asset
            src="logo.png"
            width="20px"
            height="25px"
            spriteX={1}
            spriteY={2}
            hoverable={true}
          />
        </Link>
        <Navigation headerHeight={headerHeight} isNavOpen={isNavOpen}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                {t('home')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                {t('portfolio')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                {t('blog')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                {t('about')}
              </NavLink>
            </li>
          </ul>
          <ShowMobile>
            <Highlight
              lang={language}
              style={{
                color: themes[theme].color.secondary.default,
                fontSize: '1.25rem',
              }}
            >
              Youngwoo Kim
            </Highlight>
          </ShowMobile>
        </Navigation>
        <ShowMobile>
          <Hamburger
            pressed={isNavOpen}
            onClick={handleNavOpenClick}
            width="1.25rem"
          />
        </ShowMobile>
      </Container>
    </SHeader>
  );
};

const SHeader = styled.header<{
  headerHeight: number;
  isScrollingDown: boolean;
  isNavOpen: boolean;
}>`
  position: fixed;
  top: ${({ headerHeight, isScrollingDown, isNavOpen }) =>
    !isNavOpen && isScrollingDown ? `-${headerHeight}px` : 0};
  left: 0;
  right: 0;
  z-index: 1;
  padding: 24px 0;
  background-color: ${({ theme }) => theme.color.background};
  transition: top 0.5s ease-out;
  box-shadow: 2px 2px 4px
    ${({ isScrollingDown }) =>
      window.scrollY < 20 || isScrollingDown ? '#00000000' : '#00000019'};
`;

const Container = styled(SContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0px;
`;

const Navigation = styled.nav<{ headerHeight: number; isNavOpen: boolean }>`
  display: flex;
  & ul {
    display: flex;
    width: 100%;
  }
  & li {
    padding-left: 48px;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor.default};
  }
  & a.active {
    color: ${({ theme }) => theme.color.primary.default};
  }

  @media screen and (max-width: ${breakpoints.mobile}px) {
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 100%;
    right: -100%;
    bottom: 0;
    padding: ${({ headerHeight }) => headerHeight}px 48px;
    background-color: ${({ theme }) => theme.color.background};
    transition: transform 0.5s ease-in-out;
    transform: translateX(${({ isNavOpen }) => (isNavOpen ? '-100%' : '0')});
    & ul {
      flex-direction: column;
    }
    & li {
      width: 100%;
      padding-left: 0;
      margin-bottom: 32px;
      font-size: 1.25rem;
    }
    & a {
      display: block;
      width: 100%;
    }
  }
`;

export default Header;
