import React, { useContext, useState } from 'react';

// Props
type PropTypes = {
  children: React.ReactNode;
};

// States
type ThemeModeType = 'light' | 'dark';
type LanguageType = 'ko-KR' | 'en-US';

// Context value
type SettingValues = {
  themeMode: ThemeModeType;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeModeType>>;
  language: LanguageType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
};

const SettingsContext = React.createContext<SettingValues | null>(null);

export const useSettings = () => {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error('SettingsProvider unavailable');
  return settings;
};

const SettingsProvider = (props: PropTypes) => {
  const { children } = props;
  const [themeMode, setThemeMode] = useState<ThemeModeType>('light');
  const [language, setLanguage] = useState<LanguageType>('en-US');

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
