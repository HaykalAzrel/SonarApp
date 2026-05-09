import { Tabs } from 'expo-router';
import { Bell, ClipboardList, House, ScanLine, UserCircle2 } from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          marginHorizontal: 20,
          marginBottom: 20,
          borderRadius: 24,
          height: 64,
          backgroundColor: theme.colors.glass,
          borderTopWidth: 0,
          paddingTop: 8,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <House color={color} size={size} /> }} />
      <Tabs.Screen name="devices" options={{ title: 'Devices', tabBarIcon: ({ color, size }) => <ScanLine color={color} size={size} /> }} />
      <Tabs.Screen name="activity" options={{ title: 'Activity', tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} /> }} />
      <Tabs.Screen name="notifications" options={{ title: 'Alerts', tabBarIcon: ({ color, size }) => <Bell color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <UserCircle2 color={color} size={size} /> }} />
    </Tabs>
  );
}
