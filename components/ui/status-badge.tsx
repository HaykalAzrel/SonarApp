import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { useTheme } from '@/hooks/use-theme';

type Props = { status: 'online' | 'offline' | 'alert' | 'active'; label?: string };

export function StatusBadge({ status, label }: Props) {
  const { theme } = useTheme();
  const color =
    status === 'alert'
      ? theme.colors.danger
      : status === 'offline'
        ? theme.colors.offline
        : status === 'active'
          ? theme.colors.primary
          : theme.colors.success;

  return (
    <View style={[styles.badge, { borderColor: color, backgroundColor: `${color}22` }]}>
      <AppText style={[styles.text, { color }]}>{label || status.toUpperCase()}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  text: { fontSize: 11, fontWeight: '700' },
});
