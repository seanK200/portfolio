import { ThemeName } from '../contexts/SettingsProvider';

type ThemeColor = {
  default: string;
  pressed?: string;
  disabled?: string;
  background?: string;
};

export interface ThemeInterface {
  color: {
    primary: ThemeColor;
    secondary: ThemeColor;
    dangerous: ThemeColor;
    gray: ThemeColor;
    background: string;
    hover: string;
  };
  textColor: {
    default: string;
    primary: ThemeColor;
    secondary: ThemeColor;
    dangerous: ThemeColor;
    gray: ThemeColor;
  };
}

const lightTheme: ThemeInterface = {
  color: {
    primary: {
      default: '#6117FF',
      pressed: '#7F43FF',
      disabled: '#E7E4ED',
      background: '#F4EFFF',
    },
    secondary: {
      default: '#E8DEF9',
      pressed: '#E1D4F7',
      disabled: '#F6F2FD',
      background: '#FFFFFF',
    },
    dangerous: {
      default: '#FF1049',
      pressed: '#FF4D62',
      disabled: '#FFD4DF',
      background: '#FFEFF3',
    },
    gray: {
      default: '#EBEBEB',
    },
    background: '#FCFBFF',
    hover: '#E7DBFF',
  },
  textColor: {
    default: '#353535',
    primary: {
      default: '#FFFFFF',
      pressed: '#FFFFFF',
      disabled: '#FFFFFF',
    },
    secondary: {
      default: '#6117FF',
      pressed: '#6117FF',
      disabled: '#E5D8FF',
    },
    dangerous: {
      default: '#FFFFFF',
      pressed: '#FFFFFF',
      disabled: '#FFFFFF',
    },
    gray: {
      default: '#A6A6A6',
    },
  },
};

const darkTheme: ThemeInterface = {
  color: {
    primary: {
      default: '#9462FF',
      pressed: '#7A3DFD',
      disabled: '#3E3059',
      background: '#484059',
    },
    secondary: {
      default: '#E4E1E9',
      pressed: '#F7F1FF',
      disabled: '#4C435D',
      background: '#231E2F',
    },
    dangerous: {
      default: '#FF1049',
      pressed: '#FF4D62',
      disabled: '#4C193C',
      background: '#594046',
    },
    gray: {
      default: '#2B2734',
    },
    background: '#0A021C',
    hover: '#463E56',
  },
  textColor: {
    default: '#F9EFF4',
    primary: {
      default: '#FFFFFF',
      pressed: '#FFFFFF',
      disabled: '#0A021C',
    },
    secondary: {
      default: '#0A021C',
      pressed: '#0A021C',
      disabled: '#0A021C',
    },
    dangerous: {
      default: '#FFFFFF',
      pressed: '#FFFFFF',
      disabled: '#0A021C',
    },
    gray: {
      default: '#716D79',
    },
  },
};

const themes: Record<ThemeName, ThemeInterface> = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;
