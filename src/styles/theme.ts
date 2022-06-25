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
    background: string;
  };
  textColor: {
    default: string;
    primary?: ThemeColor;
    secondary?: ThemeColor;
    dangerous?: ThemeColor;
  };
}

const lightTheme: ThemeInterface = {
  color: {
    primary: {
      default: '#6117FF',
      pressed: '#7F43FF',
      disabled: '#E5D8FF',
      background: '#F4EFFF',
    },
    secondary: {
      default: '#E8DEF9',
      pressed: '#E1D4F7',
      disabled: '#F6F2FD',
    },
    dangerous: {
      default: '#FF1049',
      pressed: '#FF4D62',
      disabled: '#FFD4DF',
    },
    background: '#FFFFFF',
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
  },
};

const darkTheme: ThemeInterface = {
  color: {
    primary: {
      default: '#6117FF',
      pressed: '#7A3DFD',
      disabled: '#3E3059',
      background: '#373144',
    },
    secondary: {
      default: '#E4E1E9',
      pressed: '#F7F1FF',
      disabled: '#4C435D',
    },
    dangerous: {
      default: '#FF1049',
      pressed: '#FF4D62',
      disabled: '#4C193C',
    },
    background: '#0A021C',
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
  },
};

const themes: Record<ThemeName, ThemeInterface> = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;
