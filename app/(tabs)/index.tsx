import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Bell, Plus } from 'lucide-react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppText } from '@/components/ui/app-text';
import { GlassCard } from '@/components/ui/glass-card';
import { MiniWaveChart } from '@/components/ui/mini-wave-chart';
import { PulseDot } from '@/components/ui/pulse-dot';
import { Screen } from '@/components/ui/screen';
import { StatusBadge } from '@/components/ui/status-badge';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';
import { useDevicesStore } from '@/store/devices-store';
import { useNotificationsStore } from '@/store/notifications-store';
import { formatClock, formatReadableDate } from '@/utils/time';

export default function HomeScreen() {
  const { theme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const devices = useDevicesStore((state) => state.devices);
  const tickRealtime = useDevicesStore((state) => state.tickRealtime);
  const getDeviceStatus = useDevicesStore((state) => state.getDeviceStatus);
  const unread = useNotificationsStore((state) => state.unreadCount());
  const [clock, setClock] = useState(formatClock(new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      tickRealtime();
      setClock(formatClock(new Date()));
    }, 2000);
    return () => clearInterval(id);
  }, [tickRealtime]);

  const status = useMemo(() => {
    if (devices.some((d) => getDeviceStatus(d) === 'alert')) return 'alert';
    if (devices.every((d) => !d.online)) return 'offline';
    return 'active';
  }, [devices, getDeviceStatus]);

  return (
    <Screen scrollable>
      <View style={styles.rowBetween}>
        <View>
          <AppText style={styles.greet}>Hello, {user?.fullName || 'Operator'}</AppText>
          <AppText style={{ color: theme.colors.textMuted }}>{clock}</AppText>
        </View>
        <Pressable onPress={() => router.push('/(tabs)/notifications')} style={[styles.iconBtn, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}> 
          <Bell color={theme.colors.text} size={20} />
          {unread > 0 && <View style={[styles.badgeDot, { backgroundColor: theme.colors.danger }]} />}
        </Pressable>
      </View>

      <GlassCard>
        <View style={styles.rowBetween}>
          <AppText style={styles.cardTitle}>System Status</AppText>
          <StatusBadge status={status} />
        </View>
        <View style={styles.rowCenter}>
          <PulseDot color={status === 'alert' ? theme.colors.danger : status === 'offline' ? theme.colors.offline : theme.colors.success} />
          <AppText style={{ color: theme.colors.textMuted }}>Monitoring all zones in realtime</AppText>
        </View>
      </GlassCard>

      <View style={styles.statsGrid}>
        {[
          { label: 'Devices', value: `${devices.length}` },
          { label: 'Online', value: `${devices.filter((d) => d.online).length}` },
          { label: 'Alerts', value: `${devices.filter((d) => getDeviceStatus(d) === 'alert').length}` },
        ].map((stat) => (
          <GlassCard key={stat.label}>
            <AppText style={[styles.statValue, { color: theme.colors.primary }]}>{stat.value}</AppText>
            <AppText style={{ color: theme.colors.textMuted }}>{stat.label}</AppText>
          </GlassCard>
        ))}
      </View>

      {devices.slice(0, 2).map((device) => (
        <Pressable key={device.id} onPress={() => router.push(`/device/${device.id}`)}>
          <GlassCard>
            <View style={styles.rowBetween}>
              <View>
                <AppText style={styles.deviceTitle}>{device.name}</AppText>
                <AppText style={{ color: theme.colors.textMuted }}>{device.room}</AppText>
              </View>
              <StatusBadge status={getDeviceStatus(device)} />
            </View>
            <AppText style={{ color: theme.colors.textMuted }}>Distance: {device.distance} cm · Updated {formatReadableDate(device.lastUpdate)}</AppText>
            <MiniWaveChart points={[80, 75, 90, 70, 98, device.distance, device.distance - 8]} />
          </GlassCard>
        </Pressable>
      ))}

      <View style={styles.actions}>
        <AppButton label="Add Device" onPress={() => router.push('/add-device')} style={{ flex: 1 }} />
        <AppButton label="View Devices" secondary onPress={() => router.push('/(tabs)/devices')} style={{ flex: 1 }} />
      </View>
      <AppButton label="Open Activity Timeline" secondary onPress={() => router.push('/(tabs)/activity')} />

      <Pressable onPress={() => router.push('/add-device')} style={[styles.fab, { backgroundColor: theme.colors.primary }]}> 
        <Plus color="#FFF" size={22} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  greet: { fontSize: 24, fontWeight: '800' },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDot: {
    width: 9,
    height: 9,
    borderRadius: 20,
    position: 'absolute',
    right: 9,
    top: 9,
  },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  statsGrid: { flexDirection: 'row', gap: 10 },
  statValue: { fontSize: 24, fontWeight: '800' },
  deviceTitle: { fontSize: 17, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 10 },
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 104,
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
