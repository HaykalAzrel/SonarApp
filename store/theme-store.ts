import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { darkTheme, lightTheme, type AppTheme, type ThemeMode } from '@/constants/theme';

type ThemeStore = {
  mode: ThemeMode;
  theme: AppTheme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const getTheme = (mode: ThemeMode) => (mode === 'dark' ? darkTheme : lightTheme);

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: 'dark',
      theme: darkTheme,
      setMode: (mode) => set({ mode, theme: getTheme(mode) }),
      toggleMode: () => {
        const nextMode: ThemeMode = get().mode === 'dark' ? 'light' : 'dark';
        set({ mode: nextMode, theme: getTheme(nextMode) });
      },
    }),
    {
      name: 'securesense-theme',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.theme = getTheme(state.mode);
        }
      },
    },
  ),
);
