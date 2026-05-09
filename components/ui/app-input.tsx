import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

import { AppText } from '@/components/ui/app-text';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  isVisible?: boolean;
  onToggle?: () => void;
  error?: string;
};

export function AppInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  showToggle,
  isVisible,
  onToggle,
  error,
}: Props) {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputWrap, { backgroundColor: theme.colors.surface, borderColor: error ? theme.colors.danger : theme.colors.border }]}> 
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry={secureTextEntry && !isVisible}
          style={[styles.input, { color: theme.colors.text }]}
        />
        {showToggle && (
          <Pressable onPress={onToggle}>
            {isVisible ? <Eye size={18} color={theme.colors.textMuted} /> : <EyeOff size={18} color={theme.colors.textMuted} />}
          </Pressable>
        )}
      </View>
      {!!error && <AppText style={[styles.error, { color: theme.colors.danger }]}>{error}</AppText>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  inputWrap: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: { flex: 1, fontSize: 15 },
  error: { fontSize: 12 },
});
