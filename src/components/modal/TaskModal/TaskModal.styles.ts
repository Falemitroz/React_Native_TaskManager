import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../../hooks';
import { shadows } from '../../../utils/shadows';

export const createStyles = () => {
  const { colors, typography } = useTheme();

  return StyleSheet.create({
    header: {
      ...(typography.h1 as TextStyle),
      textAlign: 'center',
      color: colors.base.foreground,
    },
    closeIcon: {
      marginLeft: 'auto',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowEnd: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
    text: {
      ...(typography.h3 as TextStyle),
      color: colors.base.foregroundAlt,
    },
    input: {
      backgroundColor: colors.base.surfaceAlt,
      borderRadius: 30,
      color: colors.base.foregroundAlt,
      ...shadows,
    },
  });
};
