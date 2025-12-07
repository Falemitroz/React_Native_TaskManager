import React from 'react';
import { Animated } from 'react-native';
import { Portal } from 'react-native-paper';
import { PressableIcon } from '../buttons';
import { colors } from '../../theme/theme';
import { useGrow } from '../../hooks/animations';

export const PlusButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const { scaleGrow } = useGrow();

  return (
    <Portal>
      <Animated.View
        style={{
          transform: [{ scale: scaleGrow }],
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      >
        <PressableIcon
          name="plus"
          color={colors.base.iconColor}
          bgColor={colors.base.blue}
          size={70}
          onPress={onPress}
          style={{ borderRadius: '50%' }}
        />
      </Animated.View>
    </Portal>
  );
};
