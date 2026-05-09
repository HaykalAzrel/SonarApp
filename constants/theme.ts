export type ThemeMode = 'dark' | 'light';

export type AppTheme = {
  mode: ThemeMode;
  colors: {
    background: string;
    surface: string;
    elevated: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    offline: string;
    shadow: string;
    glass: string;
  };
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#070B14',
    surface: '#0F1628',
    elevated: '#131D33',
    text: '#EAF0FF',
    textMuted: '#8FA1C0',
    border: '#1B2A49',
    primary: '#4F7CFF',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    offline: '#6B7280',
    shadow: 'rgba(8, 15, 32, 0.45)',
    glass: 'rgba(19, 29, 51, 0.72)',
  },
};

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    background: '#F7F9FC',
    surface: '#FFFFFF',
    elevated: '#F2F5FB',
    text: '#182230',
    textMuted: '#607087',
    border: '#E6EAF2',
    primary: '#4F7CFF',
    success: '#16A34A',
    warning: '#D97706',
    danger: '#DC2626',
    offline: '#94A3B8',
    shadow: 'rgba(44, 63, 104, 0.10)',
    glass: 'rgba(255, 255, 255, 0.86)',
  },
};
