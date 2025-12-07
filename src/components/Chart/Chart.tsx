import React from 'react';
import Svg from 'react-native-svg';
import { useTheme, useChartPoints } from '../../hooks';
import { useSegmentedLineAnim } from '../../hooks/animations';

import { GridLines } from './GridLines';
import { VerticalGrid } from './VerticalGrid';
import { WIDTH, HEIGHT, PADDING } from '../../utils/chartUtils';
import { type ChartProps } from './Chart.types';

export const Chart: React.FC<ChartProps> = ({ data, labels }) => {
  const { colors } = useTheme();

  const { points, niceMax, range, chartHeight } = useChartPoints(data);

  const { AnimatedSegments } = useSegmentedLineAnim(points, {
    lineColor: colors.base.blue,
    surfaceColor: colors.base.surfaceAlt,
  });

  return (
    <Svg width={WIDTH} height={HEIGHT} style={{ marginLeft: 15 }}>
      <GridLines
        padding={PADDING}
        chartHeight={chartHeight}
        width={WIDTH}
        niceMax={niceMax}
        range={range}
      />

      <VerticalGrid
        points={points}
        labels={labels}
        height={HEIGHT}
        padding={PADDING}
      />

      <AnimatedSegments />
    </Svg>
  );
};
