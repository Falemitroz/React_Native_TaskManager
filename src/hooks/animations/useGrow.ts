import { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useGrow = (duration = 500, bounce = false) => {
  const scaleGrow = useRef(new Animated.Value(0)).current;

  const start = useCallback(() => {
    Animated.timing(scaleGrow, {
      toValue: 1,
      duration,
      easing: bounce ? Easing.bounce : Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [duration]);

  useEffect(() => {
    start();
  }, [start]);

  return { scaleGrow, start };
};
