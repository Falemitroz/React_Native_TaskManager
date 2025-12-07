import React, { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { Provider, Portal } from 'react-native-paper';
import { Task } from '../../types/taskTypes';
import { createStyles } from './SearchScreen.styles';
import { ScreenWrapper } from '../Layout';
import { useTask, useTheme } from '../../hooks';
import { loadSearches, saveSearches } from '../../utils/storage';
import { Input, QueryTaskCard } from '../../components';
import { PressableIcon } from '../../components/buttons';
import { TaskModal } from '../../components/modal';

export default function SearchScreen() {
  const { colors } = useTheme();
  const { tasks } = useTask();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Task[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [selected, setSelected] = useState<Task>();
  const [modal, setModal] = useState(false);
  const [hideRecent, setHideRecent] = useState(false);
  const styles = createStyles();

  useEffect(() => {
    (async () => setRecent(await loadSearches()))();
  }, []);

  const updateRecent = async (q: string, removeIndex?: number) => {
    setRecent(prev => {
      const updated =
        removeIndex != null
          ? prev.filter((_, i) => i !== removeIndex)
          : prev.includes(q)
          ? prev
          : [q, ...prev].slice(0, 3);
      saveSearches(updated);
      return updated;
    });
  };

  const search = (q = query) => {
    if (!q.trim()) return;
    setResults(
      tasks.filter(t => t.title.toLowerCase().includes(q.toLowerCase())),
    );
    updateRecent(q);
    setHideRecent(true);
  };

  const renderResults = () => {
    return results.map(t => (
      <QueryTaskCard
        key={t.id}
        task={t}
        action={() => {
          setSelected(t);
          setModal(true);
        }}
      />
    ));
  };

  useEffect(() => search(), [tasks]);

  return (
    <Provider>
      <Portal>
        <TaskModal
          visible={modal}
          onClose={() => setModal(false)}
          task={selected}
        />
      </Portal>

      <ScreenWrapper screenName="Search">
        <Input
          placeholder="Search tasks..."
          value={query}
          onChangeText={setQuery}
          style={{ marginHorizontal: 'auto', width: '100%' }}
          onSubmitEditing={() => search(query)}
          onFocus={() => setHideRecent(false)}
          autofocus
        />
        {query.length > 0 && (
          <PressableIcon
            name="x"
            color={colors.base.foregroundAlt}
            onPress={() => setQuery('')}
            style={{ position: 'absolute', right: 10, top: 10 }}
            size={40}
          />
        )}

        {hideRecent ? (
          results.length ? (
            renderResults()
          ) : (
            <Text style={styles.notFound}>No task found.</Text>
          )
        ) : (
          <>
            <Text style={styles.text}>Recent searches</Text>
            {recent.length ? (
              recent.map((r, i) => (
                <Pressable
                  key={i}
                  style={styles.recentWrap}
                  onPress={() => search(r)}
                >
                  <Text style={styles.notFound}>{r}</Text>
                  <PressableIcon
                    name="x"
                    onPress={() => updateRecent(r, i)}
                    color={colors.base.foregroundAlt}
                    size={30}
                  />
                </Pressable>
              ))
            ) : (
              <Text style={styles.notFound}>No recent searches.</Text>
            )}
          </>
        )}
      </ScreenWrapper>
    </Provider>
  );
}
