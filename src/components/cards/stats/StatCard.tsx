import React from 'react';
import { createStyles } from './StatCard.styles';
import { BaseCard } from '../BaseCard';
import { List } from '../../../types/listTypes';
import { Text, View } from 'react-native';
import { listProgress } from '../../../utils/taskOperations';
import { ProgressBar } from 'react-native-paper';
import { useTask } from '../../../hooks';

export const StatCard: React.FC<{ list: List }> = ({ list }) => {
  const { tasks } = useTask();
  const { totalCount, progress } = listProgress(
    tasks.filter(t => t.listId === list.id),
  );

  const styles = createStyles();

  return (
    <BaseCard key={list.id}>
      <View style={styles.statCardRow}>
        <View
          style={[
            styles.statCardColoredPoint,
            { backgroundColor: list.iconBgColor },
          ]}
        />
        <Text style={styles.statCardTaskType}>{list.title}</Text>
        <Text style={styles.statCardTaskCompleted}>
          {totalCount > 0 ? `${Math.round(progress * 100)}%` : 'Empty list'}
        </Text>
      </View>
      <ProgressBar
        progress={progress}
        color={list.iconBgColor}
        style={styles.statCardProgressbar}
      />
    </BaseCard>
  );
};
