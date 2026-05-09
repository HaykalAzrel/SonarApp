import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { z } from 'zod';

import { AppButton } from '@/components/ui/app-button';
import { AppInput } from '@/components/ui/app-input';
import { AppText } from '@/components/ui/app-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Screen } from '@/components/ui/screen';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';

const schema = z.object({
  email: z.email('Enter valid email'),
  password: z.string().min(6, 'Password min 6 chars'),
});

type FormValues = z.infer<typeof schema>;

export default function LoginScreen() {
  const { theme } = useTheme();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  const submit = handleSubmit(async (values) => {
    await login(values.email, values.password);
    router.replace('/(tabs)');
  });

  return (
    <Screen>
      <View style={styles.head}>
        <ShieldCheck size={38} color={theme.colors.primary} />
        <AppText style={styles.title}>Welcome back</AppText>
        <AppText style={[styles.subtitle, { color: theme.colors.textMuted }]}>Secure access to your IoT control center</AppText>
      </View>

      <GlassCard>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <AppInput value={value} onChangeText={onChange} placeholder="Email" error={error?.message} />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <AppInput
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              secureTextEntry
              showToggle
              isVisible={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
              error={error?.message}
            />
          )}
        />

        <AppButton label="Login" loading={loading} onPress={submit} />
        <AppButton label="Continue with Google" secondary onPress={() => undefined} />
      </GlassCard>

      <AppText onPress={() => router.push('/register')} style={[styles.link, { color: theme.colors.primary }]}>
        No account? Register now
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { marginTop: 12, marginBottom: 22, gap: 6 },
  title: { fontSize: 30, fontWeight: '800' },
  subtitle: { fontSize: 14 },
  link: { marginTop: 14, fontWeight: '700', textAlign: 'center' },
});
