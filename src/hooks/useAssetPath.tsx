import { useSettings } from '../contexts/SettingsProvider';

const useAssetPath = (pathstring: string): string => {
  const { themeMode } = useSettings();

  return `${process.env.PUBLIC_URL}/${themeMode}/${pathstring}`;
};

export default useAssetPath;
