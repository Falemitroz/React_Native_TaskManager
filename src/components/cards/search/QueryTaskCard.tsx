import React from 'react';
import { Text, TextStyle, View } from 'react-native';
import { TaskCard } from '../task';
import { Task } from '../../../types/taskTypes';
import { useList, useTheme } from '../../../hooks';
import { List } from '../../../types/listTypes';
import { BaseCard } from '../BaseCard';
import { PressableIcon } from '../../buttons';

type QueryTaskCardProps = {
  task: Task;
  action: () => void;
};

export const QueryTaskCard: React.FC<QueryTaskCardProps> = ({
  task,
  action,
}) => {
  const { getList } = useList();
  const { colors, typography } = useTheme();
  const list: List | undefined = getList(task.listId);
  return (
    <BaseCard>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <PressableIcon
          name={list?.icon || ''}
          bgColor={list?.iconBgColor}
          size={30}
        />
        <Text
          style={{
            ...(typography.p as TextStyle),
            color: colors.base.foreground,
          }}
        >
          {list?.title}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: colors.base.surfaceAlt,
          marginTop: 20,
          borderRadius: 10,
        }}
      >
        <TaskCard key={task.id} task={task} setShowModal={action} />
      </View>
    </BaseCard>
  );
};
