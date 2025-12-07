import React from 'react';
import { Text } from 'react-native';
import { Line } from 'react-native-svg';
import { useTheme } from '../../hooks';
import { type GridLinesProps } from './Chart.types';
import { GRID_LINES } from '../../utils/chartUtils';

export const GridLines: React.FC<GridLinesProps> = ({
  padding,
  chartHeight,
  width,
  niceMax,
  range,
}) => {
  const { colors } = useTheme();
  return (
    <>
      {Array.from({ length: GRID_LINES + 1 }).map((_, i) => {
        const y = padding + (chartHeight / GRID_LINES) * i;
        const value = Math.round(niceMax - (range / GRID_LINES) * i);

        return (
          <React.Fragment key={`h-${i}`}>
            <Line
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke={colors.base.border}
              strokeWidth={1}
            />
            <Text
              style={{
                position: 'absolute',
                fontSize: 12,
                color: colors.base.foreground,
                left: padding - 26,
                top: y - 8,
              }}
            >
              {value}
            </Text>
          </React.Fragment>
        );
      })}
    </>
  );
};
