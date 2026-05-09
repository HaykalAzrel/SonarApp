import Slider from '@react-native-community/slider';
import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Trash2 } from 'lucide-react-native';

import { AppText } from '@/components/ui/app-text';
import { GlassCard } from '@/components/ui/glass-card';
import { MiniWaveChart } from '@/components/ui/mini-wave-chart';
import { Screen } from '@/components/ui/screen';
import { StatusBadge } from '@/components/ui/status-badge';
import { useTheme } from '@/hooks/use-theme';
import { useDevicesStore } from '@/store/devices-store';
import { formatReadableDate } from '@/utils/time';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DeviceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const [notify, setNotify] = useState(true);
  const [silent, setSilent] = useState(false);
  const [onTime, setOnTime] = useState('08:00');
  const [offTime, setOffTime] = useState('22:00');
  const [repeat, setRepeat] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);

  const device = useDevicesStore((state) => state.devices.find((d) => d.id === id));
  const setMonitoring = useDevicesStore((state) => state.setMonitoring);
  const setThreshold = useDevicesStore((state) => state.setThreshold);
  const getDeviceStatus = useDevicesStore((state) => state.getDeviceStatus);

  const samples = useMemo(() => [120, 110, 94, 102, 89, 78, device?.distance ?? 74], [device?.distance]);

  if (!device) {
    return (
      <Screen>
        <AppText>Device not found.</AppText>
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <View style={styles.rowBetween}>
        <View>
          <AppText style={styles.title}>{device.name}</AppText>
          <AppText style={{ color: theme.colors.textMuted }}>{device.id}</AppText>
        </View>
        <StatusBadge status={getDeviceStatus(device)} />
      </View>

      <GlassCard>
        <AppText style={styles.sectionTitle}>Live Distance Monitoring</AppText>
        <AppText style={styles.distance}>{device.distance} cm</AppText>
        <MiniWaveChart width={300} height={120} points={samples} />
      </GlassCard>

      <GlassCard>
        <View style={styles.rowBetween}>
          <AppText>Monitoring</AppText>
          <Switch value={device.monitoring} onValueChange={(value) => setMonitoring(device.id, value)} trackColor={{ true: theme.colors.primary }} />
        </View>
        <AppText style={{ color: theme.colors.textMuted }}>Threshold: {Math.round(device.threshold)} cm</AppText>
        <Slider
          minimumValue={30}
          maximumValue={180}
          value={device.threshold}
          onValueChange={(value) => setThreshold(device.id, value)}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.border}
          thumbTintColor={theme.colors.primary}
        />
        <View style={styles.rowBetween}>
          <AppText>Notifications</AppText>
          <Switch value={notify} onValueChange={setNotify} trackColor={{ true: theme.colors.success }} />
        </View>
        <View style={styles.rowBetween}>
          <AppText>Silent mode</AppText>
          <Switch value={silent} onValueChange={setSilent} trackColor={{ true: theme.colors.warning }} />
        </View>
      </GlassCard>

      <GlassCard>
        <AppText style={styles.sectionTitle}>Schedule Automation</AppText>
        <View style={styles.rowBetween}>
          <AppText style={{ color: theme.colors.textMuted }}>ON Time</AppText>
          <Pressable onPress={() => setOnTime(onTime === '08:00' ? '07:30' : '08:00')}>
            <AppText style={{ color: theme.colors.primary, fontWeight: '700' }}>{onTime}</AppText>
          </Pressable>
        </View>
        <View style={styles.rowBetween}>
          <AppText style={{ color: theme.colors.textMuted }}>OFF Time</AppText>
          <Pressable onPress={() => setOffTime(offTime === '22:00' ? '23:00' : '22:00')}>
            <AppText style={{ color: theme.colors.primary, fontWeight: '700' }}>{offTime}</AppText>
          </Pressable>
        </View>
        <View style={styles.days}>
          {days.map((day) => {
            const selected = repeat.includes(day);
            return (
              <Pressable
                key={day}
                onPress={() =>
                  setRepeat((prev) => (selected ? prev.filter((item) => item !== day) : [...prev, day]))
                }
                style={[styles.dayChip, { borderColor: theme.colors.border, backgroundColor: selected ? `${theme.colors.primary}24` : theme.colors.surface }]}> 
                <AppText style={{ color: selected ? theme.colors.primary : theme.colors.textMuted }}>{day}</AppText>
              </Pressable>
            );
          })}
        </View>
      </GlassCard>

      <GlassCard>
        <AppText style={styles.sectionTitle}>Device Information</AppText>
        <AppText style={{ color: theme.colors.textMuted }}>Room: {device.room}</AppText>
        <AppText style={{ color: theme.colors.textMuted }}>Battery: {Math.round(device.battery)}%</AppText>
        <AppText style={{ color: theme.colors.textMuted }}>Last update: {formatReadableDate(device.lastUpdate)}</AppText>
      </GlassCard>

      <Pressable
        onPress={() =>
          Alert.alert('Remove device?', 'This action cannot be undone.', [
            { text: 'Cancel' },
            {
              text: 'Remove',
              style: 'destructive',
              onPress: () => router.replace('/(tabs)/devices'),
            },
          ])
        }
        style={[styles.delete, { borderColor: theme.colors.danger }]}> 
        <Trash2 color={theme.colors.danger} size={16} />
        <AppText style={{ color: theme.colors.danger, fontWeight: '700' }}>Delete device</AppText>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '800' },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  distance: { fontSize: 34, fontWeight: '800' },
  days: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  dayChip: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7 },
  delete: {
    borderWidth: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
