import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export const styles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    activeLabel: {
      color: colors.base.foreground,
      fontSize: 14,
      fontWeight: '600',
      borderBottomWidth: 2,
      borderBottomColor: colors.base.foreground,
      paddingBottom: 2,
    },
    disabledLabel: {
      color: colors.base.foregroundAlt,
      fontSize: 14,
    },
  });
};
