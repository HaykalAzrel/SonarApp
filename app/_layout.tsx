import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useTheme } from '@/hooks/use-theme';

export default function RootLayout() {
  const { mode } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="splash">
        <Stack.Screen name="splash" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add-device" options={{ presentation: 'modal' }} />
        <Stack.Screen name="device/[id]" />
      </Stack>
    </GestureHandlerRootView>
  );
}
