import React from 'react';
import { useSettings } from '../../contexts/SettingsProvider';
import useText from '../../hooks/useText';
import themeTexts from '../../texts/themeTexts';
import Selector from '../form/Selector';
import SelectorItem from '../form/SelectorItem';

const ThemeSelector = () => {
  const { theme, setTheme, setUsePreferredTheme } = useSettings();
  const t = useText({
    ...themeTexts,
    theme: {
      ko: '테마',
      en: 'Theme',
    },
  });

  const handleThemeChange = (themeValue: string) => {
    setUsePreferredTheme(false);
    if (themeValue === 'light' || themeValue === 'dark') setTheme(themeValue);
  };

  return (
    <Selector
      label={t('theme')}
      selectedValue={theme}
      selectValue={handleThemeChange}
    >
      <SelectorItem
        value="light"
        assetProps={{
          src: 'themes.png',
          width: '1rem',
          height: '1rem',
          spriteX: 10,
          spriteY: 2,
          offsetX: 3,
        }}
        selectedAssetProps={{
          offsetX: 4,
        }}
      >
        {t('light')}
      </SelectorItem>
      <SelectorItem
        value="dark"
        assetProps={{
          src: 'themes.png',
          width: '1rem',
          height: '1rem',
          spriteX: 10,
          spriteY: 2,
          offsetX: 8,
        }}
        selectedAssetProps={{
          offsetX: 9,
        }}
      >
        {t('dark')}
      </SelectorItem>
    </Selector>
  );
};

export default ThemeSelector;
