import React from 'react';
import { Text } from 'react-native';
import { Line } from 'react-native-svg';
import { type VerticalGridProps } from './Chart.types';
import { useTheme } from '../../hooks';

export const VerticalGrid: React.FC<VerticalGridProps> = ({
  points,
  labels,
  height,
  padding,
}) => {
  const { colors } = useTheme();
  return (
    <>
      {points.map((p, i) => (
        <React.Fragment key={`v-${i}`}>
          <Line
            x1={p.x}
            y1={padding}
            x2={p.x}
            y2={height - padding}
            stroke={colors.base.border}
            strokeWidth={1}
          />
          <Text
            style={{
              position: 'absolute',
              fontSize: 12,
              color: colors.base.foreground,
              left: p.x - 6,
              top: height - padding + 5,
            }}
          >
            {labels?.[i] ?? i + 1}
          </Text>
        </React.Fragment>
      ))}
    </>
  );
};
