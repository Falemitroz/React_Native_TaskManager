import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  card: {
    backfaceVisibility: 'hidden',
    zIndex: 1,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
});
