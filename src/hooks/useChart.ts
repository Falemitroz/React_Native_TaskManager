import { useMemo } from 'react';
import { WIDTH, HEIGHT, PADDING } from '../utils/chartUtils';
import { useTask } from './useCRUD';

export const useChartPoints = (data: number[]) => {
  // assicurati array numerico e minimo due punti (evita divisione per zero)
  const validData =
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(v => typeof v === 'number')
      ? data
      : [0];

  const inputData =
    validData.length === 1 ? [validData[0], validData[0]] : validData;

  const maxValue = Math.max(...inputData, 0);
  const minValue = 0;
  const niceMax = Math.max(Math.ceil(maxValue / 4) * 4, 4); // almeno 1

  const range = niceMax - minValue || 1; // fallback a 1 per evitare divisioni per zero

  const chartWidth = WIDTH - PADDING * 2;
  const chartHeight = HEIGHT - PADDING * 2;

  const stepX = chartWidth / (inputData.length - 1 || 1);

  const points = inputData.map((value, i) => {
    const x = PADDING + stepX * i;
    const y =
      PADDING +
      chartHeight -
      (Number.isFinite(value) ? (value / range) * chartHeight : 0);
    return { x, y };
  });

  return {
    points,
    range,
    niceMax,
    chartWidth,
    chartHeight,
  };
};

export const useTaskCounts = () => {
  const { tasks } = useTask();
  const today = new Date();

  // Settimana
  const weekCounts = useMemo(() => {
    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + diff);

    const counts: number[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);

      counts.push(
        tasks.filter(t => {
          if (!t.completedAt) return false;
          const completed = new Date(t.completedAt);
          return (
            completed.getDate() === d.getDate() &&
            completed.getMonth() === d.getMonth() &&
            completed.getFullYear() === d.getFullYear()
          );
        }).length,
      );
    }
    return counts;
  }, [tasks]);

  // Mese
  const monthCounts = useMemo(() => {
    const counts = [0, 0, 0, 0];
    const year = today.getFullYear();
    const month = today.getMonth();

    tasks.forEach(t => {
      if (!t.completedAt) return;
      const completed = new Date(t.completedAt);
      if (completed.getFullYear() === year && completed.getMonth() === month) {
        const weekIndex = Math.min(
          Math.floor((completed.getDate() - 1) / 7),
          3,
        );
        counts[weekIndex]++;
      }
    });
    return counts;
  }, [tasks]);

  // Anno
  const yearCounts = useMemo(() => {
    const counts = Array(12).fill(0);
    const year = today.getFullYear();

    tasks.forEach(t => {
      if (!t.completedAt) return;
      const completed = new Date(t.completedAt);
      if (completed.getFullYear() === year) counts[completed.getMonth()]++;
    });
    return counts;
  }, [tasks]);

  return { weekCounts, monthCounts, yearCounts };
};
