import { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Screen } from '@/components/ui/screen';
import { useTheme } from '@/hooks/use-theme';
import { useMonitoringStore } from '@/store/monitoring-store';
import { formatReadableDate } from '@/utils/time';

export default function ActivityScreen() {
  const { theme } = useTheme();
  const logs = useMonitoringStore((state) => state.logs);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'alert'>('all');

  const visibleLogs = useMemo(
    () =>
      logs.filter((log) => {
        const inQuery = `${log.message} ${log.deviceId}`.toLowerCase().includes(query.toLowerCase());
        const inFilter = filter === 'all' ? true : log.severity === filter;
        return inQuery && inFilter;
      }),
    [filter, logs, query],
  );

  return (
    <Screen scrollable>
      <AppText style={styles.title}>Activity Timeline</AppText>
      <TextInput
        placeholder="Search events"
        placeholderTextColor={theme.colors.textMuted}
        value={query}
        onChangeText={setQuery}
        style={[styles.search, { borderColor: theme.colors.border, color: theme.colors.text, backgroundColor: theme.colors.surface }]}
      />
      <View style={styles.filterRow}>
        {(['all', 'info', 'warning', 'alert'] as const).map((item) => (
          <AppText key={item} style={{ color: item === filter ? theme.colors.primary : theme.colors.textMuted, fontWeight: '700' }} onPress={() => setFilter(item)}>
            {item.toUpperCase()}
          </AppText>
        ))}
      </View>

      {visibleLogs.map((log) => {
        const color = log.severity === 'alert' ? theme.colors.danger : log.severity === 'warning' ? theme.colors.warning : theme.colors.primary;
        return (
          <GlassCard key={log.id}>
            <AppText style={{ color, fontWeight: '700' }}>{log.severity.toUpperCase()}</AppText>
            <AppText>{log.message}</AppText>
            <AppText style={{ color: theme.colors.textMuted }}>{log.deviceId} · {formatReadableDate(log.createdAt)}</AppText>
          </GlassCard>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 27, fontWeight: '800' },
  search: { borderWidth: 1, borderRadius: 14, height: 48, paddingHorizontal: 14 },
  filterRow: { flexDirection: 'row', gap: 14 },
});
