import React from 'react';
import AppRouter from './routers';
import { ThemeProvider } from 'styled-components';
import themes from './styles/theme';
import { useSettings } from './contexts/SettingsProvider';

export default function App() {
  const { themeMode } = useSettings();

  return (
    <ThemeProvider theme={themes[themeMode]}>
      <AppRouter />
    </ThemeProvider>
  );
}
