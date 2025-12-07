import { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useSlideIn = (duration = 500, y = 200, delay = 0) => {
  const translateY = useRef(new Animated.Value(y)).current;
  const scale = useRef(new Animated.Value(0.3)).current;

  const start = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay]);

  useEffect(() => {
    start();
  }, [start]);

  return { translateY, scale, start };
};
