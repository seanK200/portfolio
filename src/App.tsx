import React, { useEffect } from 'react';
import AppRouter from './routers';
import { ThemeProvider } from 'styled-components';
import themes from './styles/theme';
import { useSettings } from './contexts/SettingsProvider';
import { useLocation } from 'react-router-dom';
import DocumentTitle from './components/utilities/DocumentTitle';
import GlobalStyles from './styles/GlobalStyles';

export default function App() {
  const { theme } = useSettings();
  const location = useLocation();

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
      <GlobalStyles />
      <DocumentTitle />
      <AppRouter />
    </ThemeProvider>
  );
}
