import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { QrCode, ScanLine } from 'lucide-react-native';
import { z } from 'zod';

import { AppButton } from '@/components/ui/app-button';
import { AppInput } from '@/components/ui/app-input';
import { AppText } from '@/components/ui/app-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Screen } from '@/components/ui/screen';
import { useTheme } from '@/hooks/use-theme';
import { useDevicesStore } from '@/store/devices-store';

const schema = z.object({
  id: z.string().min(4, 'Device ID required').regex(/^[A-Za-z0-9-]+$/, 'Only alphanumeric + dash'),
  name: z.string().min(3, 'Device name required'),
  room: z.string().min(2, 'Room required'),
});

type FormValue = z.infer<typeof schema>;

export default function AddDeviceScreen() {
  const { theme } = useTheme();
  const [state, setState] = useState<'idle' | 'success'>('idle');
  const addDevice = useDevicesStore((s) => s.addDevice);

  const { control, handleSubmit } = useForm<FormValue>({
    resolver: zodResolver(schema),
    defaultValues: { id: '', name: '', room: '' },
  });

  const submit = handleSubmit((values) => {
    addDevice(values);
    setState('success');
    setTimeout(() => router.replace('/(tabs)/devices'), 900);
  });

  return (
    <Screen scrollable>
      <AppText style={styles.title}>Add Device</AppText>
      <GlassCard>
        <View style={[styles.qr, { borderColor: theme.colors.border, backgroundColor: `${theme.colors.primary}12` }]}>
          <QrCode size={34} color={theme.colors.primary} />
          <AppText style={{ color: theme.colors.textMuted }}>QR scan placeholder</AppText>
        </View>

        {(['id', 'name', 'room'] as const).map((name) => (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AppInput value={value} onChangeText={onChange} placeholder={name === 'id' ? 'Device ID' : name === 'name' ? 'Device Name' : 'Room'} error={error?.message} />
            )}
          />
        ))}

        <AppButton label={state === 'success' ? 'Device Connected ✓' : 'Pair Device'} onPress={submit} />
      </GlassCard>

      <View style={styles.rowCenter}>
        <ScanLine size={18} color={theme.colors.primary} />
        <AppText style={{ color: theme.colors.textMuted }}>Validation includes format + duplicate prevention integration point</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 27, fontWeight: '800' },
  qr: {
    borderWidth: 1,
    height: 144,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
