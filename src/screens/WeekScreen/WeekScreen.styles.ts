import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../hooks';

export const createStyles = () => {
  const { colors, typography } = useTheme();
  return StyleSheet.create({
    title: {
      ...(typography.h2 as TextStyle),
      color: colors.base.foreground,
      textAlign: 'center',
    },
    progressSection: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    text: {
      ...(typography.h4 as TextStyle),
      color: colors.base.foregroundAlt,
      textAlign: 'center',
    },
  });
};
