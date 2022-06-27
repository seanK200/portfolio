import React, { useState, useEffect, useContext } from 'react';
import { ThemeName } from './SettingsProvider';
import { MultiLangText } from '../hooks/useText';
import _ from 'lodash';

type WindowSizeType = {
  width: number;
  height: number;
};

type GlobalValues = {
  preferredTheme: ThemeName;
  headerHeight: number;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
  scrollY: number;
  isScrollingDown: boolean;
  documentTitle: MultiLangText[];
  setDocumentTitle: React.Dispatch<React.SetStateAction<MultiLangText[]>>;
  windowSize: WindowSizeType;
};

const GlobalContext = React.createContext<GlobalValues | null>(null);

export const useGlobals = () => {
  const globals = useContext(GlobalContext);
  if (!globals) throw new Error('GlobalProvider unavailable');
  return globals;
};

const GlobalProvider = ({ children }: { children?: React.ReactNode }) => {
  const [preferredTheme, setPreferredTheme] = useState<ThemeName>('light');
  const [headerHeight, setHeaderHeight] = useState<number>(0); // in px
  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);
  const [documentTitle, setDocumentTitle] = useState<MultiLangText[]>([
    { ko: '', en: '' },
  ]);
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    width: 0,
    height: 0,
  });

  // Detect OS preferred color scheme (light/dark mode)
  const getPreferredColorScheme = () => {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  };

  const throttledScrollHandler = _.throttle(() => {
    setScrollY((prevScrollY) => {
      const newScrollY = window.scrollY;
      setIsScrollingDown(newScrollY > prevScrollY);
      return newScrollY;
    });
  }, 500);

  const throttledWindowResizeHandler = _.throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 500);

  // componentDidMount
  useEffect(() => {
    // Detect changes in OS preferred color scheme (light/dark mode)
    setPreferredTheme(getPreferredColorScheme());
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        setPreferredTheme(getPreferredColorScheme());
      });

    // Scroll events
    setScrollY(window.scrollY);
    window.addEventListener('scroll', throttledScrollHandler);

    // window resize events
    window.addEventListener('resize', throttledWindowResizeHandler);
  }, []);

  const value: GlobalValues = {
    preferredTheme,
    headerHeight,
    setHeaderHeight,
    scrollY,
    isScrollingDown,
    documentTitle,
    setDocumentTitle,
    windowSize,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
