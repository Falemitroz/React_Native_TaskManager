import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export const createStyles = () => {
  const { colors, typography } = useTheme();

  return StyleSheet.create({
    label: {
      ...(typography.p as TextStyle),
      color: colors.base.foreground,
    },
    input: {
      backgroundColor: colors.base.background,
    },
    inputOutline: {
      borderRadius: 50,
    },
    rowWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'flex-start',
    },
  });
};
