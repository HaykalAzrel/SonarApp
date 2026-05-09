import { Text, type TextProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export function AppText({ style, ...rest }: TextProps) {
  const { theme } = useTheme();
  return <Text {...rest} style={[{ color: theme.colors.text }, style]} />;
}
