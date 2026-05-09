import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { z } from 'zod';

import { AppButton } from '@/components/ui/app-button';
import { AppInput } from '@/components/ui/app-input';
import { AppText } from '@/components/ui/app-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Screen } from '@/components/ui/screen';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';

const schema = z
  .object({
    fullName: z.string().min(2, 'Enter full name'),
    email: z.email('Enter valid email'),
    password: z.string().min(8, 'Min 8 characters'),
    confirmPassword: z.string().min(8, 'Min 8 characters'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterScreen() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' },
  });

  const submit = handleSubmit(async (value) => {
    await register(value.fullName, value.email, value.password);
    router.replace('/(tabs)');
  });

  return (
    <Screen scrollable>
      <AppText style={styles.title}>Create account</AppText>
      <AppText style={[styles.subtitle, { color: theme.colors.textMuted }]}>Set up SecureSense with dark + calm light themes</AppText>

      <GlassCard>
        {(['fullName', 'email', 'password', 'confirmPassword'] as const).map((name) => (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AppInput
                value={value}
                onChangeText={onChange}
                placeholder={
                  name === 'fullName'
                    ? 'Full name'
                    : name === 'email'
                      ? 'Email'
                      : name === 'password'
                        ? 'Password'
                        : 'Confirm password'
                }
                secureTextEntry={name.includes('password')}
                showToggle={name.includes('password')}
                isVisible={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
                error={error?.message}
              />
            )}
          />
        ))}
        <AppButton label="Register" loading={loading} onPress={submit} />
      </GlassCard>

      <AppText style={[styles.link, { color: theme.colors.primary }]} onPress={() => router.replace('/login')}>
        Already have an account? Login
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: '800', marginTop: 8 },
  subtitle: { marginBottom: 12 },
  link: { textAlign: 'center', fontWeight: '700' },
});
