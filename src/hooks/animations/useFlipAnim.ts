import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useFlipAnim = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flip = () => {
    Animated.spring(animatedValue, {
      toValue: flipped ? 0 : 180,
      useNativeDriver: true,
      friction: 8,
      tension: 10,
    }).start();
    setFlipped(prev => !prev);
  };

  return { frontInterpolate, backInterpolate, flip };
};
