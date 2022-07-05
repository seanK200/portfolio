import { useSettings, LanguageName } from '../contexts/SettingsProvider';

export type MultiLangText = Record<LanguageName, string>;
export type MultiLangTexts = Record<string, MultiLangText>;

type stringformatargs = { [key: string]: string | number };
type stringformatter = (args: stringformatargs) => string;
export type MultiLangTextDef = Record<LanguageName, string | stringformatter>;
export type MultiLangTextsDef = Record<string, MultiLangTextDef>;

type CapitalizationType = 'upper' | 'upperfirst' | 'lower' | 'none';
type GetTextOptions = {
  caps?: CapitalizationType;
  lang?: LanguageName | null;
  args?: stringformatargs;
};

const useText = (texts: MultiLangTextsDef) => {
  const { language } = useSettings();

  const getText = (
    key: keyof MultiLangTextsDef,
    options: GetTextOptions = {}
  ): string => {
    // Check if key exists
    if (!(key in texts)) throw new Error(`Key '${key}' not found in text.`);

    // Get the correct string
    const { lang, caps } = options;
    let text: string | stringformatter = '';
    if (lang) {
      text = lang in texts[key] ? texts[key][lang] : texts[key][language];
    } else {
      text = texts[key][language];
    }

    // If formatted text, run formatter with arguments
    if (typeof text === 'function') {
      if (options.args) text = text(options.args);
    }

    // Apply capitalization changes if needed
    if (typeof text === 'string' && caps !== 'none') {
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

    return typeof text === 'string' ? text : '';
  };

  return getText;
};

export default useText;
