import { MONTHS, DAYS } from './date';

export const WIDTH = 300;
export const HEIGHT = 200;
export const PADDING = 30;
export const GRID_LINES = 4;

export const TAB_LABELS = ['Week', 'Month', 'Year'];

export type Period = (typeof TAB_LABELS)[number];

export const CONTENTS: { period: Period; labels: string[] }[] = [
  { period: 'Week', labels: DAYS.map(d => d[0]) },
  { period: 'Month', labels: ['1', '2', '3', '4'] },
  { period: 'Year', labels: MONTHS.map(m => m[0]) },
];
