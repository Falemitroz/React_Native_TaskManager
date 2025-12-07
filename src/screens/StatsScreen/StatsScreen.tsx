import React from 'react';
import { Text } from 'react-native';
import { ScreenWrapper } from '../Layout';
import { createStyles } from './StatsScreen.styles';
import { BaseCard, Chart, StatCard, TabSelector } from '../../components';
import { useList, useTaskCounts } from '../../hooks';
import { TAB_LABELS, CONTENTS, Period } from '../../utils/chartUtils';

export default function StatsScreen() {
  const { lists } = useList();

  const styles = createStyles();

  const { weekCounts, monthCounts, yearCounts } = useTaskCounts();

  const chartsData: { period: Period; data: number[]; labels: string[] }[] = [
    { period: 'Week', data: weekCounts, labels: CONTENTS[0].labels },
    { period: 'Month', data: monthCounts, labels: CONTENTS[1].labels },
    { period: 'Year', data: yearCounts, labels: CONTENTS[2].labels },
  ];

  const renderCharts = () =>
    chartsData.map(c => (
      <Chart key={c.period} data={c.data} labels={c.labels} />
    ));

  return (
    <ScreenWrapper screenName="Stats">
      <Text style={styles.separatorText}>Tasks Completed</Text>
      {/* CHART */}
      <BaseCard>
        {/* TAB NAVIGATOR */}
        <TabSelector labels={TAB_LABELS} contents={renderCharts()} />
      </BaseCard>
      {/* TEXT DIVIDER */}
      <Text style={styles.separatorText}>Completion by List</Text>
      {/* COMPLETION BY LIST */}
      {lists.map(list => (
        <StatCard key={list.id} list={list} />
      ))}
    </ScreenWrapper>
  );
}
