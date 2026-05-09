import { useThemeStore } from '@/store/theme-store';

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  return { theme, mode, toggleMode };
};
