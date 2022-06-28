import React, { useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useGlobals } from './GlobalProvider';

// Props
type PropTypes = {
  children?: React.ReactNode;
};

// States
export type ThemeName = 'light' | 'dark';
export type LanguageName = 'ko' | 'en';

// Settings
interface Settings {
  theme: ThemeName;
  language: LanguageName;
  usePreferredTheme: boolean;
  usePreferredLanguage: boolean;
}

const initialSettings: Settings = {
  theme: 'light',
  language: 'en',
  usePreferredTheme: true,
  usePreferredLanguage: true,
};

// Context value
interface SettingValues extends Settings {
  setTheme: (value: ThemeName) => void;
  setLanguage: (value: LanguageName) => void;
  setUsePreferredTheme: (value: boolean) => void;
  setUsePreferredLanguage: (value: boolean) => void;
}

const SettingsContext = React.createContext<SettingValues | null>(null);

export const useSettings = () => {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error('SettingsProvider unavailable');
  return settings;
};

const SettingsProvider = ({ children }: PropTypes) => {
  const { preferredTheme, preferredLanguages } = useGlobals();

  const [settings, setSettings] = useLocalStorage<Settings>(
    'settings',
    initialSettings
  );

  const { theme, usePreferredTheme, language, usePreferredLanguage } = settings;

  const setTheme = (value: ThemeName): void => {
    setSettings((prev) => ({ ...prev, theme: value }));
  };

  const setUsePreferredTheme = (value: boolean): void => {
    setSettings((prev) => ({ ...prev, usePreferredTheme: value }));
  };

  const setLanguage = (value: LanguageName): void => {
    setSettings((prev) => ({ ...prev, language: value }));
  };

  const setUsePreferredLanguage = (value: boolean): void => {
    setSettings((prev) => ({ ...prev, usePreferredLanguage: value }));
  };

  // Set the language to the browser's language
  useEffect(() => {
    if (usePreferredLanguage) {
      let lang: LanguageName = 'en'; // fallback to English
      for (let i = 0; i < preferredLanguages.length; i++) {
        if (
          preferredLanguages[i] === 'ko' ||
          preferredLanguages[i] === 'ko-KR'
        ) {
          lang = 'ko';
          break;
        } else if (
          preferredLanguages[i] === 'en' ||
          preferredLanguages[i] === 'en-US'
        ) {
          lang = 'en';
          break;
        }
      }
      setLanguage(lang);
    }
  }, [preferredLanguages, usePreferredLanguage]);

  // Set the theme to OS preferred color scheme on change
  useEffect(() => {
    if (usePreferredTheme) {
      setTheme(preferredTheme);
    }
  }, [preferredTheme, usePreferredTheme]);

  // Change the html tag's lang attribute to the correct language
  useEffect(() => {
    document.querySelector('html')?.setAttribute('lang', language);
  }, [language]);

  const value: SettingValues = {
    theme,
    setTheme,
    language,
    setLanguage,
    usePreferredTheme,
    setUsePreferredTheme,
    usePreferredLanguage,
    setUsePreferredLanguage,
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
