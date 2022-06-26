import React from 'react';
import { useSettings } from '../../contexts/SettingsProvider';
import useText from '../../hooks/useText';
import langTexts from '../../texts/langTexts';
import Selector from '../form/Selector';
import SelectorItem from '../form/SelectorItem';

const LangSelector = () => {
  const { language, setLanguage } = useSettings();
  const t = useText({
    ...langTexts,
    language: {
      ko: '언어/Language',
      en: 'Language/언어',
    },
  });

  const handleLangChange = (langValue: string) => {
    if (langValue === 'ko' || langValue === 'en') setLanguage(langValue);
  };

  return (
    <Selector
      label={t('language')}
      selectedValue={language}
      selectValue={handleLangChange}
    >
      <SelectorItem
        value="ko"
        assetProps={{
          src: 'flags.png',
          spriteX: 2,
          spriteY: 1,
          width: '1.25rem',
          height: '1.25rem',
          offsetX: 0,
        }}
      >
        {t('KO')}
      </SelectorItem>
      <SelectorItem
        value="en"
        assetProps={{
          src: 'flags.png',
          spriteX: 2,
          spriteY: 1,
          width: '1.25rem',
          height: '1.25rem',
          offsetX: 1,
        }}
      >
        {t('EN')}
      </SelectorItem>
    </Selector>
  );
};

export default LangSelector;
