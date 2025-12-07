import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

export const createStyles = () => {
  const { colors, typography } = useTheme();
  return StyleSheet.create({
    /* ===== STAT CARD ===== */
    statCardRow: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    statCardColoredPoint: {
      borderRadius: 10,
      width: 15,
      height: 15,
    },
    statCardTaskType: {
      ...(typography.h3 as TextStyle),
      color: colors.base.foreground,
    },
    statCardTaskCompleted: {
      ...(typography.h3 as TextStyle),
      color: colors.base.foregroundAlt,
      marginLeft: 'auto',
    },
    statCardProgressbar: {
      backgroundColor: colors.base.progressbar,
      height: 8,
      borderRadius: 5,
      marginTop: 5,
    },
  });
};
