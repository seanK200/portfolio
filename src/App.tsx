import React, { useEffect } from 'react';
import AppRouter from './routers';
import { ThemeProvider } from 'styled-components';
import themes from './styles/theme';
import { useSettings } from './contexts/SettingsProvider';
import { useLocation } from 'react-router-dom';
import DocumentTitle from './components/utilities/DocumentTitle';

export default function App() {
  const { theme } = useSettings();
  const location = useLocation();

  // Set body background color according to theme
  useEffect(() => {
    if (theme) {
      document.body.style.backgroundColor = themes[theme].color.background;
      document.body.style.color = themes[theme].textColor.default;
    }
  }, [theme]);

  // Routing: Scroll to url fragment if location hash exists
  useEffect(() => {
    if (location.hash && location.hash.length) {
      const elem = document.querySelector(location.hash) as HTMLElement | null;
      if (elem) {
        window.scrollTo({
          top: elem.offsetTop,
          behavior: 'auto',
        });
      }
    }
  }, [location]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <DocumentTitle />
      <AppRouter />
    </ThemeProvider>
  );
}
