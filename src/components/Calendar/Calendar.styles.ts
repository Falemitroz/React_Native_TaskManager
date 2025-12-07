import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks';

export const createStyles = (size: number) => {
  const { colors } = useTheme();
  const cellSize = size / 7; // 7 colonne

  return StyleSheet.create({
    container: {
      borderRadius: 10,
      padding: cellSize,
      alignItems: 'center',
      marginBottom: 30,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: size,
      marginBottom: cellSize * 0.3,
    },

    title: {
      fontSize: cellSize * 0.5,
      fontWeight: '900',
      color: colors.base.foreground,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: size,
      height: cellSize * 5, // 5 righe
      justifyContent: 'flex-start',
    },
    dayCell: {
      width: cellSize,
      height: cellSize,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: cellSize / 2,
    },
    weekDayText: {
      fontSize: cellSize * 0.4,
      color: colors.base.foreground,
      fontWeight: 'bold',
    },
    dayText: { fontSize: cellSize * 0.4, color: colors.base.foregroundAlt },
  });
};
