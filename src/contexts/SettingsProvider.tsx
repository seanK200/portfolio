import React, { useContext, useEffect, useState } from 'react';
import { useGlobals } from './GlobalProvider';

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
};

const SettingsContext = React.createContext<SettingValues | null>(null);

export const useSettings = () => {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error('SettingsProvider unavailable');
  return settings;
};

const SettingsProvider = ({ children }: PropTypes) => {
  const { preferredTheme } = useGlobals();

  // Themes
  const [theme, setTheme] = useState<ThemeName>('light');
  const [usePreferredTheme, setUsePreferredTheme] = useState<boolean>(true);

  // Language
  const [language, setLanguage] = useState<LanguageName>('en');

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
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
