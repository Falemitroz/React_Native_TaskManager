import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/theme';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, color }) => {
  return (
    <Feather name={name} size={size} color={color || colors.base.iconColor} />
  );
};
