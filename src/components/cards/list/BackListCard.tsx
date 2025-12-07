import { View } from 'react-native';
import { PressableIcon } from '../../buttons';
import { BaseCard } from '../BaseCard';
import { type ListCardProps } from './types';
import { Input } from '../../Input/Input';
import { useAppNavigation, useList, useTask } from '../../../hooks';
import { useState } from 'react';
import { dbDeleteTask } from '../../../database/tasks';

export const BackListCard: React.FC<ListCardProps> = ({ list, onPress }) => {
  const { editList, deleteList } = useList();
  const { tasks } = useTask();
  const { toLists } = useAppNavigation();

  const [input, setInput] = useState(list.title);

  const handleSubmit = () => {
    if (input !== list.title) editList(list.id, { title: input });
  };

  const handleDelete = () => {
    toLists();
    const listTasks = tasks.filter(t => t.listId === list.id);
    listTasks.forEach(task => dbDeleteTask(task.id));
    deleteList(list.id);
  };

  return (
    <BaseCard
      style={{ flexDirection: 'row' }}
      onPress={() => {}}
      disableTouch={true}
    >
      <PressableIcon
        name={list.icon}
        bgColor={list.iconBgColor}
        onPress={onPress}
      />
      <View style={{ width: '60%', marginHorizontal: 'auto' }}>
        <Input
          value={input}
          onChangeText={text => setInput(text)}
          onSubmitEditing={handleSubmit}
          onBlur={handleSubmit}
        />
      </View>
      <PressableIcon size={40} name="trash-2" onPress={handleDelete} />
    </BaseCard>
  );
};
