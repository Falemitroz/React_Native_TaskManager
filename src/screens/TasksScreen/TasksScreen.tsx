import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Portal, Provider } from 'react-native-paper';

import { ScreenWrapper } from '../Layout';
import { Task } from '../../types/taskTypes';
import { useList, useTask } from '../../hooks';
import { PlusButton } from '../../components/buttons';
import { TaskModal, IconModal } from '../../components/modal';
import { FlipListCard, TabSelector, TaskCard } from '../../components';
import { filterTasks } from '../../utils/taskOperations';
import { List } from '../../types/listTypes';
import { dbGetListTasks } from '../../database/tasks';

export default function TasksScreen() {
  const { list: paramlist } = useRoute().params;
  const { lists } = useList();
  const { getListTasks, loadTasks } = useTask();

  const [modals, setModals] = useState({
    task: { visible: false, taskId: undefined as number | undefined },
    icon: { visible: false },
  });

  const openModal = (name: 'task' | 'icon', payload?: number | {}) =>
    setModals(m => ({
      ...m,
      [name]: { visible: true, ...(payload ?? {}) },
    }));

  const closeModal = (name: 'task' | 'icon') =>
    setModals(m => ({
      ...m,
      [name]: { visible: false },
    }));

  const list: List = lists.find(l => l.id === paramlist.id) || ({} as List);

  const taskList = getListTasks(list.id);

  const filtered = filterTasks(taskList);

  const filters = ['All', 'Pending', 'Done', 'Priority'];

  useEffect(() => {
    (async () => {
      try {
        const dbListTasks = await dbGetListTasks(list.id);
        console.log('DB list tasks:', dbListTasks);

        loadTasks(dbListTasks);
      } catch (e) {
        console.error('Error loading lists:', e);
      }
    })();
  }, [list.id]);

  const renderTasks = (tasks: Task[]) =>
    tasks.map((t, i) => (
      <TaskCard
        key={t.id}
        task={t}
        even={i % 2 === 0}
        setShowModal={() => openModal('task', { taskId: t.id })}
      />
    ));

  const tabContents = [
    renderTasks(taskList),
    renderTasks(filtered.pendingTasks),
    renderTasks(filtered.doneTasks),
    renderTasks(filtered.priorityTasks),
  ];

  return (
    <Provider>
      <PlusButton onPress={() => openModal('task')} />

      <ScreenWrapper screenName="Tasks">
        <FlipListCard list={list} onPress={() => openModal('icon')} />

        <TabSelector labels={filters} contents={tabContents} />
      </ScreenWrapper>

      <Portal>
        <TaskModal
          visible={modals.task.visible}
          onClose={() => closeModal('task')}
          task={taskList.find(t => t.id === modals.task.taskId)}
          listId={list.id}
        />

        <IconModal
          visible={modals.icon.visible}
          onClose={() => closeModal('icon')}
          list={list}
        />
      </Portal>
    </Provider>
  );
}
