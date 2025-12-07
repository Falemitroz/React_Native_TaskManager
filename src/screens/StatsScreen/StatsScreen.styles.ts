import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export const createStyles = () => {
  const { colors, typography } = useTheme();
  return StyleSheet.create({
    /* ===== GENERAL TEXT ===== */
    separatorText: {
      ...(typography.h2 as TextStyle),
      color: colors.base.foreground,
      marginTop: 20,
      marginBottom: 10,
    },
  });
};
