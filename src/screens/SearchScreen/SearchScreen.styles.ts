import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../hooks';

export const createStyles = () => {
  const { colors, typography } = useTheme();
  return StyleSheet.create({
    notFound: {
      ...(typography.p as TextStyle),
      color: colors.base.foreground,
      textAlign: 'center',
    },
    text: {
      ...(typography.h3 as TextStyle),
      color: colors.base.foregroundAlt,
    },
    recentWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
  });
};
