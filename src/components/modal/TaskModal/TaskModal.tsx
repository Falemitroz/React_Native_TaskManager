import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Task } from '../../../types/taskTypes';
import { useTask, useTheme } from '../../../hooks';
import { DefaultButton, ModalActions, PressableIcon } from '../../buttons';
import { Input } from '../../Input/Input';
import { Calendar } from '../../Calendar';
import { createStyles } from './TaskModal.styles';
import { BaseModal } from '../BaseModal';
import { getFormattedTaskDueDate } from '../../../utils/taskOperations';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  task?: Task;
  listId?: number;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onClose,
  task,
  listId,
}) => {
  const { createTask, editTask, deleteTask } = useTask();
  const { colors } = useTheme();
  const s = createStyles();

  const [taskState, setTaskState] = useState({
    title: '',
    priority: false,
    dueDate: null as Task['dueDate'] | null,
  });

  const [showCalendar, setShowCalendar] = useState(false);

  // Sync state on modal open
  useEffect(() => {
    setTaskState({
      title: task?.title || '',
      priority: task?.priority || false,
      dueDate: task?.dueDate ?? null,
    });
    setShowCalendar(false);
  }, [task, visible]);

  const updateField = <K extends keyof typeof taskState>(
    key: K,
    value: (typeof taskState)[K],
  ) => {
    setTaskState(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      if (task) {
        const trimmed = taskState.title.trim();
        const updates: Partial<Task> = {};

        if (trimmed !== task.title.trim()) updates.title = trimmed;

        if (taskState.priority !== task.priority)
          updates.priority = taskState.priority;

        updates.dueDate = taskState.dueDate;

        if (Object.keys(updates).length > 0) {
          await editTask(task.id, updates);
        }
      } else {
        const trimmedTitle = taskState.title.trim();
        if (!trimmedTitle || !listId) return onClose();

        await createTask({
          listId,
          title: trimmedTitle,
          checked: false,
          priority: taskState.priority,
          dueDate: taskState.dueDate ?? null,
        });
      }

      onClose();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  const handleDelete = () => {
    if (task) deleteTask(task.id);
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <Text style={s.header}>{task ? 'Task details' : 'New Task'}</Text>

      <Text style={s.text}>Task Title</Text>
      <Input
        placeholder="Enter Task Title..."
        value={taskState.title}
        onChangeText={text => updateField('title', text)}
      />

      <View style={s.row}>
        <Text style={s.text}>
          Priority: {taskState.priority ? 'Active' : 'Inactive'}
        </Text>

        <DefaultButton
          text="Priority"
          mode={taskState.priority ? 'contained' : 'outlined'}
          onPress={() => updateField('priority', !taskState.priority)}
          disabled={task?.checked}
        />
      </View>

      <View style={s.row}>
        <Text style={s.text}>
          Due date:{' '}
          {taskState.dueDate
            ? getFormattedTaskDueDate(taskState.dueDate)
            : 'No due date'}
        </Text>
        <PressableIcon
          name="edit-2"
          color={colors.base.blue}
          size={40}
          onPress={() => setShowCalendar(true)}
        />
      </View>

      <ModalActions
        onDelete={task ? handleDelete : undefined}
        onCancel={onClose}
        onSave={handleSave}
      />

      {/* Calendar Modal */}
      <BaseModal visible={showCalendar} onClose={() => setShowCalendar(false)}>
        <Calendar
          taskDueDate={taskState.dueDate ?? undefined}
          onChangeDate={date => updateField('dueDate', date ?? null)}
        />
        <ModalActions
          onDelete={() => {
            updateField('dueDate', null);
            setShowCalendar(false);
          }}
          onSave={() => setShowCalendar(false)}
        />
      </BaseModal>
    </BaseModal>
  );
};
