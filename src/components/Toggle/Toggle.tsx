import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks';
import React from 'react';

export const Toggle: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const styles = createStyles();
  return (
    <Pressable style={styles.track} onPress={onPress}>
      <View style={styles.thumb} />
    </Pressable>
  );
};

const createStyles = () => {
  const { theme, colors } = useTheme();

  const isDark = theme === 'dark';

  return StyleSheet.create({
    track: {
      marginLeft: 'auto',
      padding: 2,
      backgroundColor: colors.base.foreground,
      borderRadius: 50,
      width: 40,
      height: 25,
    },
    thumb: {
      flex: 1,
      borderRadius: 50,
      backgroundColor: colors.base.background,
      width: 20,
      height: 20,
      marginLeft: isDark ? 'auto' : 0,
    },
  });
};
