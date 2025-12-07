/*
============================================================================
 Easing comuni  
============================================================================
 Nome                          | Descrizione
----------------------------------------------------------------------------
Easing.linear                 | movimento uniforme e costante
Easing.in(Easing.ease)        | inizio lento, fine veloce
Easing.out(Easing.ease)       | inizio veloce, fine lenta
Easing.inOut(Easing.ease)     | accellera e poi decellera
Easing.bounce                 | effetto "elastic bounce" (rimbalzo)
Easing.elastic(1.2)           | elastico controllato (rimbalzo morbido)
----------------------------------------------------------------------------

============================================================================
 Valori principali  
============================================================================
 Nome           | Descrizione
----------------------------------------------------------------------------
translateX     | In px (positivo: dx, negativo: sx)
translateY     | in px (positivo: giù, negativo: su)
opacity        | 0 = invisibile, 1 = visibile
scale          | Dimensione originale: 1, più piccolo: <1, più grande: >1
rotate         | Angolo in radianti o gradi ('45deg', ecc)
height / width | dimensione iniziale in pixel
----------------------------------------------------------------------------

*/

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { useAppNavigation } from './useAppNavigation';
import { Circle, Path } from 'react-native-svg';

export const useFadeIn = (duration = 300) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [duration, opacity]);

  return opacity;
};

export const useTaskFadeAnim = () => {
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

export function useSegmentedLineAnim(
  points: { x: number; y: number }[],
  { lineColor = '#007AFF', surfaceColor = '#FFF' } = {},
) {
  const progress = useRef(new Animated.Value(0)).current;
  const totalSegments = points.length - 1;
  const durationByLength = totalSegments > 7 ? 10 : 200;

  useEffect(() => {
    Animated.sequence(
      Array.from({ length: totalSegments }, (_, i) =>
        Animated.timing(progress, {
          toValue: i + 1,
          duration: durationByLength,
          useNativeDriver: false,
        }),
      ),
    ).start();
  }, [totalSegments]);

  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const AnimatedSegments = () => {
    const segmentCount = points.length - 1;
    const segments = [];

    for (let i = 0; i < segmentCount; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      const path = `M${p1.x},${p1.y} L${p2.x},${p2.y}`;
      const current = i + 1;

      segments.push(
        <AnimatedPath
          key={`seg-${i}`}
          d={path}
          stroke={lineColor}
          strokeWidth={3}
          strokeDasharray={[100, 100]}
          strokeDashoffset={progress.interpolate({
            inputRange: [i, current],
            outputRange: [100, 0],
            extrapolate: 'clamp',
          })}
        />,
      );

      segments.push(
        <AnimatedCircle
          key={`point-${i + 1}`}
          cx={p2.x}
          cy={p2.y}
          r={4}
          fill={lineColor}
          stroke={surfaceColor}
          strokeWidth={2}
          opacity={progress.interpolate({
            inputRange: [i, current - 0.5, current],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
          })}
        />,
      );
    }

    // Primo punto visibile subito
    segments.unshift(
      <Circle
        key="point-0"
        cx={points[0].x}
        cy={points[0].y}
        r={4}
        fill={lineColor}
        stroke={surfaceColor}
        strokeWidth={2}
      />,
    );

    return <>{segments}</>;
  };

  return { AnimatedSegments };
}

export const useSlideIn = (duration = 500, y = 200) => {
  const translateY = useRef(new Animated.Value(y)).current;
  const scale = useRef(new Animated.Value(0.3)).current;

  const start = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    start();
  }, [start]);

  return { translateY, scale, start };
};

export const useFooterCircleAnim = (x = -50) => {
  const { active } = useAppNavigation();
  const translateX = useRef(new Animated.Value(x)).current;

  const start = useCallback(() => {
    translateX.setValue(x);
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    start();
  }, [active]);

  return { translateX, start };
};

export const useFlipAnimation = () => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    const toValue = flipped ? 0 : 180;
    setFlipped(!flipped);

    Animated.spring(flipAnim, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 10,
    }).start();
  };

  return {
    frontInterpolate,
    backInterpolate,
    flipCard,
    flipped,
  };
};
