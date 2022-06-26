import React, { useEffect } from 'react';
import AppRouter from './routers';
import { ThemeProvider } from 'styled-components';
import themes from './styles/theme';
import { useSettings } from './contexts/SettingsProvider';

export default function App() {
  const { theme } = useSettings();

  // Set body background color according to theme
  useEffect(() => {
    if (theme) {
      document.body.style.backgroundColor = themes[theme].color.background;
      document.body.style.color = themes[theme].textColor.default;
    }
  }, [theme]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <AppRouter />
    </ThemeProvider>
  );
}
