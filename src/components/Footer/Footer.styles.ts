import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks';

export const createStyles = (active?: boolean) => {
  const { colors } = useTheme();

  return StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 2,
      borderTopColor: colors.base.border,
      padding: 30,
    },
    iconButton: {
      color: active ? colors.base.blue : colors.base.foreground,
    },
  });
};
