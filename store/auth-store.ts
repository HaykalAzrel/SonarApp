import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { authService } from '@/services/firebase-auth';
import { type UserProfile } from '@/types/models';

type AuthStore = {
  user: UserProfile | null;
  onboardingDone: boolean;
  loading: boolean;
  setOnboardingDone: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const fallbackUser = (email: string, fullName?: string): UserProfile => ({
  uid: `local-${email}`,
  email,
  fullName: fullName || email.split('@')[0],
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      onboardingDone: false,
      loading: false,
      setOnboardingDone: () => set({ onboardingDone: true }),
      login: async (email, password) => {
        set({ loading: true });
        try {
          const result = await authService.login(email, password);
          const nextUser = result
            ? {
                uid: result.user.uid,
                email: result.user.email || email,
                fullName: result.user.displayName || email.split('@')[0],
              }
            : fallbackUser(email);
          set({ user: nextUser });
        } finally {
          set({ loading: false });
        }
      },
      register: async (fullName, email, password) => {
        set({ loading: true });
        try {
          const result = await authService.register(fullName, email, password);
          const nextUser = result
            ? {
                uid: result.user.uid,
                email: result.user.email || email,
                fullName: result.user.displayName || fullName,
              }
            : fallbackUser(email, fullName);
          set({ user: nextUser });
        } finally {
          set({ loading: false });
        }
      },
      logout: async () => {
        await authService.logout();
        set({ user: null });
      },
    }),
    {
      name: 'securesense-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user, onboardingDone: state.onboardingDone }),
    },
  ),
);
