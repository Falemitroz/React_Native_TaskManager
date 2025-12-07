import React from 'react';
import { Text } from 'react-native';
import { BaseCard } from '../BaseCard';
import { createStyles } from './TaskCard.styles';
import { useTask, useTheme } from '../../../hooks';
import { type Task } from '../../../types/taskTypes';
import { Checkbox, PressableIcon } from '../../buttons';

// =======================
// TYPES
// =======================
type TaskCardProps = {
  task: Task;
  even?: boolean;
  setShowModal: () => void;
};

// =======================
// COMPONENT
// =======================
export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  even,
  setShowModal,
}) => {
  const { editTask } = useTask();
  const { colors } = useTheme();

  const style = createStyles({
    even,
    checked: task.checked,
    priority: task.priority,
  });

  const changeStatus = () => {
    const updates: Partial<Task> = {
      checked: !task.checked,
      completedAt: !task.checked ? Date.now() : undefined,
    };
    editTask(task.id, updates);
  };

  return (
    <BaseCard style={style.cardWrapper} onPress={changeStatus}>
      <Checkbox size={40} status={task.checked} changeStatus={changeStatus} />
      <Text style={style.title}>{task.title}</Text>
      <PressableIcon
        name="edit-2"
        size={50}
        color={colors.base.blue}
        onPress={setShowModal}
        style={{ marginLeft: 'auto' }}
      />
    </BaseCard>
  );
};
