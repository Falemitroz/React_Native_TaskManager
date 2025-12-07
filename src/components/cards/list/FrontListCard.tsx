import React from 'react';
import { View, Text } from 'react-native';
import { useTask, useTheme } from '../../../hooks';
import { CircularProgress } from '../../CircularProgress';
import { createFrontStyles } from './styles';
import { PressableIcon } from '../../buttons';
import { BaseCard } from '../BaseCard';
import { ListCardProps } from './types';
import { listProgress } from '../../../utils/taskOperations';

export const FrontListCard: React.FC<ListCardProps> = ({
  list,
  onPress,
  disabledTouch,
}) => {
  const { tasks } = useTask();
  const taskList = tasks.filter(t => t.listId === list.id);
  const { doneCount, totalCount, progress } = listProgress(taskList || []);
  const { colors } = useTheme();
  const styles = createFrontStyles();

  return (
    <BaseCard
      style={{ flexDirection: 'row' }}
      onPress={() => onPress && onPress(list)}
      disableTouch={disabledTouch}
    >
      <PressableIcon
        name={list.icon}
        color={colors.base.iconColor}
        bgColor={list.iconBgColor}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{list.title || 'List Name'}</Text>
        <Text style={styles.subtitle}>
          {doneCount} of {totalCount} tasks
        </Text>
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <CircularProgress progress={progress} size={60} />
      </View>
    </BaseCard>
  );
};
