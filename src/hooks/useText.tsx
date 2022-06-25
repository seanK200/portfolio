import { useSettings, LanguageName } from '../contexts/SettingsProvider';

type MultiLangText = Partial<Record<LanguageName, string>>;
export type MultiLangTexts = Record<string, MultiLangText>;

const useText = (texts: MultiLangTexts, fallback: LanguageName = 'ko') => {
  const { language } = useSettings();

  const getText = (
    key: keyof MultiLangTexts,
    lang: LanguageName | null = null
  ) => {
    if (key in texts) {
      if (lang) {
        return lang in texts[key] ? texts[key][lang] : texts[key][fallback];
      } else {
        return language in texts[key]
          ? texts[key][language]
          : texts[key][fallback];
      }
    }
    throw new Error(`Key '${key}' not found in text.`);
  };

  return getText;
};

export default useText;
