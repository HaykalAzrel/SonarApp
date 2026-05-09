import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BellRing, Radar, SlidersHorizontal } from 'lucide-react-native';
import { router } from 'expo-router';

import { AppButton } from '@/components/ui/app-button';
import { AppText } from '@/components/ui/app-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Screen } from '@/components/ui/screen';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';

const slides = [
  { key: 'monitoring', title: 'Realtime Monitoring', body: 'Track every connected sensor with live telemetry and safety status.', Icon: Radar },
  { key: 'alerts', title: 'Instant Alerts', body: 'Receive intrusion alerts instantly with priority-based severity.', Icon: BellRing },
  { key: 'control', title: 'Remote Control', body: 'Adjust threshold, silent mode, and schedules from anywhere.', Icon: SlidersHorizontal },
];

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const setOnboardingDone = useAuthStore((state) => state.setOnboardingDone);
  const slide = useMemo(() => slides[index], [index]);

  const complete = () => {
    setOnboardingDone();
    router.replace('/login');
  };

  return (
    <Screen>
      <View style={styles.headerRow}>
        <AppText style={styles.brand}>SecureSense</AppText>
        <AppText onPress={complete} style={[styles.skip, { color: theme.colors.primary }]}>Skip</AppText>
      </View>

      <GlassCard>
        <View style={[styles.iconWrap, { backgroundColor: `${theme.colors.primary}22` }]}>
          <slide.Icon size={58} color={theme.colors.primary} />
        </View>
        <AppText style={styles.title}>{slide.title}</AppText>
        <AppText style={[styles.body, { color: theme.colors.textMuted }]}>{slide.body}</AppText>
      </GlassCard>

      <View style={styles.dotsRow}>
        {slides.map((s, i) => (
          <View key={s.key} style={[styles.dot, { width: i === index ? 30 : 8, backgroundColor: i === index ? theme.colors.primary : theme.colors.border }]} />
        ))}
      </View>

      <View style={styles.footer}>
        {index < slides.length - 1 ? (
          <AppButton label="Next" onPress={() => setIndex((prev) => prev + 1)} />
        ) : (
          <AppButton label="Get Started" onPress={complete} />
        )}
        <AppButton label="Back" secondary onPress={() => (index === 0 ? complete() : setIndex((prev) => prev - 1))} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: 20, fontWeight: '800' },
  skip: { fontWeight: '700' },
  iconWrap: {
    width: 126,
    height: 126,
    borderRadius: 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  title: { textAlign: 'center', fontSize: 25, fontWeight: '800' },
  body: { textAlign: 'center', lineHeight: 22 },
  dotsRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginVertical: 22 },
  dot: { height: 8, borderRadius: 20 },
  footer: { gap: 10 },
});
