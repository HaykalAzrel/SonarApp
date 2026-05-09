import { Path, Svg } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';

export function MiniWaveChart({ width = 140, height = 44, points }: { width?: number; height?: number; points: number[] }) {
  const { theme } = useTheme();
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;

  const path = points
    .map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width;
      const y = height - ((point - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');

  return (
    <Svg width={width} height={height}>
      <Path d={path} stroke={theme.colors.primary} strokeWidth={2.5} fill="none" />
    </Svg>
  );
}
