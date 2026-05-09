import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export function PulseDot({ color }: { color: string }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.8, { duration: 1300, easing: Easing.out(Easing.cubic) }), -1, false);
    opacity.value = withRepeat(withTiming(0.2, { duration: 1300, easing: Easing.inOut(Easing.cubic) }), -1, true);
  }, [opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.outer, { borderColor: color }, animatedStyle]}>
      <Animated.View style={[styles.inner, { backgroundColor: color }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 16,
    height: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  inner: { width: 8, height: 8, borderRadius: 100 },
});
