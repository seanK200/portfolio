import React, { useEffect } from 'react';
import AppRouter from './routers';
import { ThemeProvider } from 'styled-components';
import themes from './styles/theme';
import { useSettings } from './contexts/SettingsProvider';

export default function App() {
  const { themeMode } = useSettings();

  useEffect(() => {
    if (themeMode) {
      document.body.style.backgroundColor = themes[themeMode].color.background;
    }
  }, [themeMode]);

  return (
    <ThemeProvider theme={themes[themeMode]}>
      <AppRouter />
    </ThemeProvider>
  );
}
