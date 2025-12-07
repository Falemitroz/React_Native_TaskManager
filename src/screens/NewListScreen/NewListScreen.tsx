import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScreenWrapper } from '../Layout';
import { useAppNavigation, useList, useTheme } from '../../hooks';
import { List } from '../../types/listTypes';
import { createStyles } from './NewListScreen.styles';

import { Input } from '../../components';
import { PressableIcon } from '../../components/buttons';
import { ColorCard, FrontListCard } from '../../components/cards';

import { bgColors, icons } from '../../utils/constants';

export default function NewListScreen() {
  const { colors } = useTheme();
  const { toLists } = useAppNavigation();
  const { createList } = useList();

  const [input, changeInput] = useState('');
  const [list, setList] = useState<List>({
    id: 0,
    title: '',
    icon: 'briefcase',
    iconBgColor: colors.components.list.work,
  });

  const styles = createStyles();

  const updateList = (
    key: 'title' | 'icon' | 'iconBgColor',
    updates: string,
  ) => {
    setList(prev => ({ ...prev, [key]: updates }));
  };

  const handleCreate = async () => {
    await createList(list);
    changeInput('');
    toLists();
  };

  return (
    <ScreenWrapper
      screenName="New List"
      navProps={{
        disabled: list.title === '',
        onPress: handleCreate,
      }}
    >
      {/* CARD */}
      <FrontListCard list={list} />

      {/* INPUT */}
      <Text style={styles.label}>List Name</Text>
      <Input
        placeholder="Enter list name..."
        value={input}
        onChangeText={text => {
          changeInput(text);
          updateList('title', text);
        }}
        onBlur={() => changeInput('')}
      />

      {/* ICONS */}
      <Text style={styles.label}>Icon</Text>
      <View style={styles.rowWrap}>
        {icons.map(icon => (
          <PressableIcon
            key={icon}
            name={icon}
            bgColor={icon === list.icon ? list.iconBgColor : 'transparent'}
            onPress={() => updateList('icon', icon)}
          />
        ))}
      </View>

      {/* COLORS */}
      <Text style={styles.label}>Color</Text>
      <View style={styles.rowWrap}>
        {bgColors.map(color => (
          <ColorCard
            key={color}
            color={color}
            selected={color === list.iconBgColor}
            onPress={() => updateList('iconBgColor', color)}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
}
