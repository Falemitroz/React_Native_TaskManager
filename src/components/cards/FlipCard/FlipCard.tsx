import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Animated } from 'react-native';
import { FlipCardProps } from './FlipCard.types';
import { useFlipAnim } from '../../../hooks/animations';
import { styles } from './FlipCard.styles';

// =======================
// COMPONENT
// =======================
export function FlipCard<
  FProps extends Record<string, any>,
  BProps extends Record<string, any>,
>({
  Front,
  Back,
  frontProps,
  backProps,
  style,
}: FlipCardProps<FProps, BProps>) {
  const { frontInterpolate, backInterpolate, flip } = useFlipAnim();

  const [isFront, setIsFront] = useState(true);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        flip();
        setIsFront(!isFront);
      }}
    >
      <View style={[styles.container, style]}>
        <Animated.View
          style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}
          pointerEvents={isFront ? 'auto' : 'none'}
        >
          <Front {...(frontProps as FProps)} />
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            { transform: [{ rotateY: backInterpolate }] },
          ]}
          pointerEvents={isFront ? 'none' : 'auto'}
        >
          <Back {...(backProps as BProps)} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
