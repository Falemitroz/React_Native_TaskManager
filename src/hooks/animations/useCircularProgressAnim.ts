import { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useCircularProgressAnim = (toValue = 1, circumference = 360) => {
  const circularAnim = useRef(new Animated.Value(1)).current;

  const start = useCallback(() => {
    Animated.timing(circularAnim, {
      toValue,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, [toValue]);

  const strokeDashoffset = Animated.multiply(
    Animated.subtract(1, circularAnim),
    circumference,
  );

  useEffect(() => {
    start();
  }, [start]);

  return { start, circularAnim, strokeDashoffset };
};
