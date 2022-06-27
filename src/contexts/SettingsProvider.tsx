import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';

// Props
type PropTypes = {
  children?: React.ReactNode;
};

// States
export type ThemeName = 'light' | 'dark';
export type LanguageName = 'ko' | 'en';

// Context value
type SettingValues = {
  theme: ThemeName;
  setTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
  language: LanguageName;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageName>>;
  usePreferredTheme: boolean;
  setUsePreferredTheme: React.Dispatch<React.SetStateAction<boolean>>;
  headerHeight: number;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
  scrollY: number;
  isScrollingDown: boolean;
};

const SettingsContext = React.createContext<SettingValues | null>(null);

export const useSettings = () => {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error('SettingsProvider unavailable');
  return settings;
};

const SettingsProvider = ({ children }: PropTypes) => {
  const [theme, setTheme] = useState<ThemeName>('light');
  const [preferredTheme, setPreferredTheme] = useState<ThemeName>('light');
  const [usePreferredTheme, setUsePreferredTheme] = useState<boolean>(true);

  const [language, setLanguage] = useState<LanguageName>('en');

  const [headerHeight, setHeaderHeight] = useState<number>(0); // in px

  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);

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
  }, []);

  // Set the theme to OS preferred color scheme on change
  useEffect(() => {
    if (usePreferredTheme) {
      setTheme(preferredTheme);
    }
  }, [preferredTheme, usePreferredTheme]);

  const value: SettingValues = {
    theme,
    setTheme,
    language,
    setLanguage,
    usePreferredTheme,
    setUsePreferredTheme,
    headerHeight,
    setHeaderHeight,
    scrollY,
    isScrollingDown,
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
