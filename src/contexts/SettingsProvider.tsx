import React, { useContext, useState } from 'react';

// Props
type PropTypes = {
  children: React.ReactNode;
};

// States
export type ThemeName = 'light' | 'dark';
export type LanguageName = 'ko' | 'en';

// Context value
type SettingValues = {
  themeMode: ThemeName;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeName>>;
  language: LanguageName;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageName>>;
};

const SettingsContext = React.createContext<SettingValues | null>(null);

export const useSettings = () => {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error('SettingsProvider unavailable');
  return settings;
};

const SettingsProvider = (props: PropTypes) => {
  const { children } = props;
  const [themeMode, setThemeMode] = useState<ThemeName>('light');
  const [language, setLanguage] = useState<LanguageName>('en');

  const value: SettingValues = {
    themeMode,
    setThemeMode,
    language,
    setLanguage,
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
