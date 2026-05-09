import { type PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';

export function Screen({ children, scrollable = false }: PropsWithChildren<{ scrollable?: boolean }>) {
  const { theme } = useTheme();

  if (scrollable) {
    return (
      <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.background }]}>
        <ScrollView style={styles.root} contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, padding: 18 },
  scrollContent: { padding: 18, gap: 12, paddingBottom: 28 },
});
