import { StyleSheet, Switch, View } from 'react-native';
import { router } from 'expo-router';

import { AppButton } from '@/components/ui/app-button';
import { AppText } from '@/components/ui/app-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Screen } from '@/components/ui/screen';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';
import { useNotificationsStore } from '@/store/notifications-store';

export default function ProfileScreen() {
  const { mode, toggleMode, theme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const notificationsEnabled = useNotificationsStore((state) => state.enabled);
  const toggleNotifications = useNotificationsStore((state) => state.toggleEnabled);

  return (
    <Screen scrollable>
      <AppText style={styles.title}>Profile</AppText>

      <GlassCard>
        <AppText style={styles.name}>{user?.fullName || 'Security Operator'}</AppText>
        <AppText style={{ color: theme.colors.textMuted }}>{user?.email || 'operator@securesense.app'}</AppText>
      </GlassCard>

      <GlassCard>
        <View style={styles.rowBetween}>
          <AppText>Theme ({mode})</AppText>
          <Switch value={mode === 'dark'} onValueChange={toggleMode} trackColor={{ true: theme.colors.primary }} />
        </View>
        <View style={styles.rowBetween}>
          <AppText>Notifications</AppText>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} trackColor={{ true: theme.colors.success }} />
        </View>
      </GlassCard>

      <AppButton
        label="Logout"
        secondary
        onPress={async () => {
          await logout();
          router.replace('/login');
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 27, fontWeight: '800' },
  name: { fontSize: 20, fontWeight: '800' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
