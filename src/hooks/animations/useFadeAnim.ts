import { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const useFadeAnim = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(15)).current;

  const start = useCallback(() => {
    fadeAnim.setValue(0);
    translateY.setValue(15);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    fadeAnim.setValue(0);
    translateY.setValue(15);
    start();
  }, []);

  return { start, fadeAnim, translateY };
};
