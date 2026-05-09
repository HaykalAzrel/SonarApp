import { Pressable, StyleSheet, Switch, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { AppText } from '@/components/ui/app-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Screen } from '@/components/ui/screen';
import { StatusBadge } from '@/components/ui/status-badge';
import { useTheme } from '@/hooks/use-theme';
import { useDevicesStore } from '@/store/devices-store';

const filters = ['all', 'online', 'offline', 'alert'] as const;

export default function DevicesScreen() {
  const { theme } = useTheme();
  const { devices, search, filter, setSearch, setFilter, getDeviceStatus, setMonitoring } = useDevicesStore();

  const filtered = devices.filter((device) => {
    const matchesSearch = `${device.name} ${device.id} ${device.room}`.toLowerCase().includes(search.toLowerCase());
    const status = getDeviceStatus(device);
    const matchesFilter = filter === 'all' ? true : status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Screen scrollable>
      <AppText style={styles.title}>Devices</AppText>
      <TextInput
        placeholder="Search by name, room, or ID"
        placeholderTextColor={theme.colors.textMuted}
        value={search}
        onChangeText={setSearch}
        style={[styles.search, { borderColor: theme.colors.border, color: theme.colors.text, backgroundColor: theme.colors.surface }]}
      />
      <View style={styles.chips}>
        {filters.map((item) => (
          <Pressable key={item} onPress={() => setFilter(item)} style={[styles.chip, { borderColor: theme.colors.border, backgroundColor: item === filter ? `${theme.colors.primary}20` : theme.colors.surface }]}> 
            <AppText style={{ color: item === filter ? theme.colors.primary : theme.colors.textMuted }}>{item.toUpperCase()}</AppText>
          </Pressable>
        ))}
      </View>

      {filtered.length === 0 ? (
        <GlassCard>
          <AppText style={styles.empty}>No devices found. Add your first IoT sensor to start monitoring.</AppText>
        </GlassCard>
      ) : (
        filtered.map((device) => (
          <Pressable key={device.id} onPress={() => router.push(`/device/${device.id}`)}>
            <GlassCard>
              <View style={styles.rowBetween}>
                <View>
                  <AppText style={styles.name}>{device.name}</AppText>
                  <AppText style={{ color: theme.colors.textMuted }}>{device.id} · {device.room}</AppText>
                </View>
                <StatusBadge status={getDeviceStatus(device)} />
              </View>
              <View style={styles.rowBetween}>
                <AppText style={{ color: theme.colors.textMuted }}>Monitoring</AppText>
                <Switch value={device.monitoring} onValueChange={(value) => setMonitoring(device.id, value)} trackColor={{ true: theme.colors.primary }} />
              </View>
            </GlassCard>
          </Pressable>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 27, fontWeight: '800' },
  search: {
    borderWidth: 1,
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 14,
  },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  empty: { textAlign: 'center', fontWeight: '600' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '700' },
});
