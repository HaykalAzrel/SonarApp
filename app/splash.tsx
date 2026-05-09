import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Shield } from 'lucide-react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { useTheme } from '@/hooks/use-theme';

export default function SplashScreen() {
  const { theme } = useTheme();
  const scale = useSharedValue(0.9);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.08, { duration: 1400, easing: Easing.inOut(Easing.ease) }), -1, true);
    const id = setTimeout(() => router.replace('/'), 1600);
    return () => clearTimeout(id);
  }, [scale]);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Animated.View style={[styles.logoWrap, { borderColor: theme.colors.primary }, animStyle]}>
        <Shield size={44} color={theme.colors.primary} />
      </Animated.View>
      <AppText style={styles.title}>SecureSense</AppText>
      <AppText style={[styles.subtitle, { color: theme.colors.textMuted }]}>IoT Security Monitoring</AppText>
      <ActivityIndicator color={theme.colors.primary} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoWrap: {
    width: 110,
    height: 110,
    borderRadius: 30,
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: { fontSize: 31, fontWeight: '800' },
  subtitle: { fontSize: 14, marginTop: 8 },
  loader: { marginTop: 24 },
});
