import { useSettings, LanguageName } from '../contexts/SettingsProvider';

export type MultiLangText = Record<LanguageName, string>;
export type MultiLangTexts = Record<string, MultiLangText>;
type CapitalizationType = 'upper' | 'upperfirst' | 'lower' | 'none';
type GetTextOptions = {
  caps?: CapitalizationType;
  lang?: LanguageName | null;
};

const useText = (texts: MultiLangTexts, fallback: LanguageName = 'ko') => {
  const { language } = useSettings();

  const getText = (key: keyof MultiLangTexts, options: GetTextOptions = {}) => {
    const { lang, caps } = options;
    if (key in texts) {
      let text: string | undefined = '';
      if (lang) {
        text = lang in texts[key] ? texts[key][lang] : texts[key][fallback];
      } else {
        text =
          language in texts[key] ? texts[key][language] : texts[key][fallback];
      }
      if (text && caps !== 'none') {
        switch (caps) {
          case 'upper':
            text = text.toUpperCase();
            break;
          case 'upperfirst':
            text = text
              .split(' ')
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(' ');
            break;
          case 'lower':
            text = text.toLowerCase();
            break;
        }
      }

      return text;
    }
    throw new Error(`Key '${key}' not found in text.`);
  };

  return getText;
};

export default useText;
