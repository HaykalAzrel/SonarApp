import { Redirect } from 'expo-router';

import { useAuthStore } from '@/store/auth-store';

export default function Index() {
  const user = useAuthStore((state) => state.user);
  const onboardingDone = useAuthStore((state) => state.onboardingDone);

  if (!onboardingDone) return <Redirect href="/onboarding" />;
  if (!user) return <Redirect href="/login" />;
  return <Redirect href="/(tabs)" />;
}
