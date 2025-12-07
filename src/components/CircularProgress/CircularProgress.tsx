import React from 'react';
import { View, Text, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../hooks';
import { useCircularProgressAnim, useGrow } from '../../hooks/animations';

type CircularProgressProps = {
  progress: number;
  size?: number;
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 100,
}) => {
  const { colors } = useTheme();

  const strokeWidth = size / 10;
  const color = colors.base.blue;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  if (isNaN(progress)) progress = 0;
  const { strokeDashoffset } = useCircularProgressAnim(progress, circumference);
  const { scaleGrow } = useGrow(2500);

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Svg width={size} height={size}>
        <Circle
          stroke={colors.base.surfaceAlt}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Numero centrato */}
      <Animated.View
        style={{ position: 'absolute', transform: [{ scale: scaleGrow }] }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: size / 5,
            color: color,
          }}
        >
          {Math.round(progress * 100)}%
        </Text>
      </Animated.View>
    </View>
  );
};
