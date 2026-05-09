import { ActivityIndicator, Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  secondary?: boolean;
  style?: ViewStyle;
};

export function AppButton({ label, onPress, loading, secondary, style }: Props) {
  const { theme } = useTheme();

  return (
    <Pressable
      disabled={loading}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: secondary ? theme.colors.elevated : theme.colors.primary,
          borderColor: theme.colors.border,
        },
        style,
      ]}>
      {loading ? <ActivityIndicator color={secondary ? theme.colors.text : '#FFF'} /> : <AppText style={[styles.label, { color: secondary ? theme.colors.text : '#FFF' }]}>{label}</AppText>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  label: { fontSize: 15, fontWeight: '700' },
});
