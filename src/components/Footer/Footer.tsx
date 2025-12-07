import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppNavigation } from '../../hooks';
import Octicons from 'react-native-vector-icons/Octicons';
import { IconProps } from './Footer.types';
import { createStyles } from './Footer.styles';

export const Footer = () => {
  const { toLists, toStats, toSearch, toToday, active, setActive } =
    useAppNavigation();

  const icons: IconProps[] = [
    { label: 'Lists', name: 'home', route: toLists },
    { label: 'Week', name: 'calendar', route: toToday },
    { label: 'Search', name: 'search', route: toSearch },
    { label: 'Stats', name: 'graph', route: toStats },
  ];

  const activeScreenColor = (label: string) =>
    createStyles(label === active).iconButton;

  return (
    <View style={createStyles().wrapper}>
      {icons.map(icon => {
        const handlePress = () => {
          setActive(icon.label);
          icon.route();
        };

        return (
          <Pressable
            key={icon.label}
            onPress={handlePress}
            style={{ alignItems: 'center' }}
          >
            <Octicons
              name={icon.name}
              size={24}
              style={activeScreenColor(icon.label)}
            />
            <Text style={activeScreenColor(icon.label)}>{icon.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};
