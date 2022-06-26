import React, { useContext, useEffect, useState } from 'react';

// Props
type PropTypes = {
  children: React.ReactNode;
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
};

const SettingsContext = React.createContext<SettingValues | null>(null);

export const useSettings = () => {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error('SettingsProvider unavailable');
  return settings;
};

const SettingsProvider = (props: PropTypes) => {
  const { children } = props;
  const [theme, setTheme] = useState<ThemeName>('light');
  const [preferredTheme, setPreferredTheme] = useState<ThemeName>('light');
  const [usePreferredTheme, setUsePreferredTheme] = useState<boolean>(true);
  const [language, setLanguage] = useState<LanguageName>('en');

  const [headerHeight, setHeaderHeight] = useState<number>(0); // in px

  const getPreferredColorScheme = () => {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  };

  // Detect OS preferred color scheme (light/dark mode)
  useEffect(() => {
    setPreferredTheme(getPreferredColorScheme());
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        setPreferredTheme(getPreferredColorScheme());
      });
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
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
