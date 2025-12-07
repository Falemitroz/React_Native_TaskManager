import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../../hooks';

export const createCardStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    card: {
      padding: 20,
      borderWidth: 1,
      borderColor: colors.base.border,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: colors.base.surface,
    },
  });
};

export const createFrontStyles = () => {
  const { colors, typography } = useTheme();
  return StyleSheet.create({
    content: {
      marginLeft: 20,
    },
    title: {
      ...(typography.h3 as TextStyle),
      color: colors.base.foreground,
    },
    subtitle: {
      ...(typography.p as TextStyle),
      color: colors.base.foregroundAlt,
    },
    text: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 22,
    },
  });
};
