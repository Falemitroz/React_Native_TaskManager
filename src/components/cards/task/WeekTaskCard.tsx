import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { useList, useTheme } from '../../../hooks';
import { Task } from '../../../types/taskTypes';

export const WeekTaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const { lists } = useList();

  const list = lists.find(l => l.id === task.listId);
  const styles = createStyles(task.checked);

  return (
    <View style={[styles.wrapper, { borderColor: list?.iconBgColor }]}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.subtitle}>{list?.title}</Text>
    </View>
  );
};

const createStyles = (checked?: boolean) => {
  const { colors, typography } = useTheme();

  return StyleSheet.create({
    wrapper: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderLeftWidth: 10,
      paddingLeft: 15,
      marginVertical: 10,
    },
    title: {
      ...(typography.h3 as TextStyle),
      color: checked ? colors.base.foregroundAlt : colors.base.foreground,
      textDecorationLine: checked ? 'line-through' : 'none',
    },
    subtitle: {
      ...(typography.h3 as TextStyle),
      color: colors.base.foregroundAlt,
    },
  });
};
