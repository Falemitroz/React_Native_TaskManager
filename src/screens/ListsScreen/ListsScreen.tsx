// React
import React, { useEffect } from 'react';
import { Provider } from 'react-native-paper';

// Components
import { ScreenWrapper } from '../Layout';
import { FrontListCard } from '../../components/cards';
import { PlusButton } from '../../components/buttons';

// Hooks
import { useAppNavigation, useList, useTask } from '../../hooks';
import { dbGetLists } from '../../database/lists';
import { dbGetTasks } from '../../database/tasks';

// Component
export default function ListsScreen() {
  const { lists, loadLists } = useList();
  const { loadTasks } = useTask();
  const { toNewList, toTasks } = useAppNavigation();

  useEffect(() => {
    (async () => {
      try {
        const dbLists = await dbGetLists();
        console.log('DB lists:', dbLists);
        const dbTasks = await dbGetTasks();
        console.log('DB tasks:', dbTasks);

        loadLists(dbLists);
        loadTasks(dbTasks);
      } catch (e) {
        console.error('Error loading lists:', e);
      }
    })();
  }, []);

  return (
    <Provider>
      <PlusButton onPress={toNewList} />
      <ScreenWrapper screenName="Lists">
        {lists.map(list => {
          return (
            <FrontListCard
              key={list.id}
              list={list}
              onPress={() => toTasks(list)}
            />
          );
        })}
      </ScreenWrapper>
    </Provider>
  );
}
