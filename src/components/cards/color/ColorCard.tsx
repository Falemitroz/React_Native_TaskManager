import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../hooks';
import React from 'react';

type ColorCardProps = {
  size?: number;
  color: string;
  selected: boolean;
  onPress: () => void;
};

export const ColorCard: React.FC<ColorCardProps> = ({
  size = 60,
  color,
  selected,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        width: size,
        height: size,
        borderRadius: size / 3,
        borderWidth: selected ? 4 : 0,
        borderColor: colors.base.foreground,
        padding: 2,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: color,
          borderRadius: size / 4,
        }}
      />
    </TouchableOpacity>
  );
};
