// useSegmentedLineAnim.tsx
import React, { useMemo, useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { Path } from 'react-native-svg';

type Opts = { lineColor?: string; surfaceColor?: string; duration?: number };

export const useSegmentedLineAnim = (
  points: { x: number; y: number }[],
  opts: Opts = {},
) => {
  const { lineColor = '#2B6CB0', duration = 700 } = opts;

  // costruisci path string
  const path = useMemo(() => {
    if (!points || points.length === 0) return '';
    return points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');
  }, [points]);

  // calcola lunghezza reale path (somma distanze euclidee)
  const pathLength = useMemo(() => {
    if (!points || points.length < 2) return 0;
    let len = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      len += Math.hypot(dx, dy);
    }
    // fallback minimo
    return len || 0;
  }, [points]);

  // Animated value per dash offset
  const anim = useRef(new Animated.Value(pathLength || 1)).current;

  useEffect(() => {
    // se pathLength è zero non animare
    if (!pathLength) {
      anim.setValue(0);
      return;
    }

    anim.setValue(pathLength);
    Animated.timing(anim, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [pathLength, anim, duration]);

  // componente che rende il Path animato
  const AnimatedPath = (props: any) => {
    // Animated.createAnimatedComponent(Path) se necessario
    const AnimatedSvgPath = Animated.createAnimatedComponent(Path);
    return (
      <AnimatedSvgPath
        d={path}
        stroke={lineColor}
        strokeWidth={2}
        fill="none"
        strokeDasharray={`${pathLength} ${pathLength}`}
        strokeDashoffset={anim}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
    );
  };

  return { AnimatedSegments: AnimatedPath, pathLength, path };
};
