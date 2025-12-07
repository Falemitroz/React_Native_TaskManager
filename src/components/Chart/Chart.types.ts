export type ChartProps = {
  data: number[];
  labels?: string[];
};

export type GridLinesProps = {
  padding: number;
  chartHeight: number;
  width: number;
  niceMax: number;
  range: number;
};

export type VerticalGridProps = {
  points: { x: number; y: number }[];
  labels?: string[];
  height: number;
  padding: number;
};
