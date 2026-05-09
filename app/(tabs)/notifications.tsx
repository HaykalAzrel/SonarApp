import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Screen } from '@/components/ui/screen';
import { useTheme } from '@/hooks/use-theme';
import { useNotificationsStore } from '@/store/notifications-store';
import { formatReadableDate } from '@/utils/time';

export default function NotificationCenterScreen() {
  const { theme } = useTheme();
  const { notifications, markRead } = useNotificationsStore();

  return (
    <Screen scrollable>
      <AppText style={styles.title}>Notification Center</AppText>
      {notifications.map((item) => {
        const color = item.type === 'alert' ? theme.colors.danger : item.type === 'warning' ? theme.colors.warning : theme.colors.primary;
        return (
          <Pressable key={item.id} onPress={() => markRead(item.id)}>
            <GlassCard>
              <View style={styles.rowBetween}>
                <AppText style={{ color, fontWeight: '700' }}>{item.type.toUpperCase()}</AppText>
                {!item.read && <View style={[styles.unread, { backgroundColor: theme.colors.primary }]} />}
              </View>
              <AppText style={styles.itemTitle}>{item.title}</AppText>
              <AppText style={{ color: theme.colors.textMuted }}>{item.body}</AppText>
              <AppText style={{ color: theme.colors.textMuted }}>{formatReadableDate(item.createdAt)}</AppText>
            </GlassCard>
          </Pressable>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 27, fontWeight: '800' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  unread: { width: 10, height: 10, borderRadius: 20 },
  itemTitle: { fontSize: 16, fontWeight: '700' },
});
