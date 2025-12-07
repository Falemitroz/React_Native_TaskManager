import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../../hooks';

export const createStyles = ({
  even,
  checked,
  priority,
}: {
  even?: boolean;
  checked?: boolean;
  priority?: boolean;
}) => {
  const { colors, typography } = useTheme();
  return StyleSheet.create({
    cardWrapper: {
      borderWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 0,
      backgroundColor: even && colors.base.surface,
    },
    title: {
      ...(typography.h3 as TextStyle),
      color: priority
        ? colors.base.destructiveText
        : checked
        ? colors.base.foregroundAlt
        : colors.base.foreground,
      textDecorationLine: checked ? 'line-through' : 'none',
    },
  });
};
