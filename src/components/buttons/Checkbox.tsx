import React from 'react';
import { useTheme } from '../../hooks';
import { PressableIcon } from './PressableIcon';

type CheckBoxProps = {
  size?: number;
  status?: boolean;
  changeStatus: () => void;
};

export const Checkbox: React.FC<CheckBoxProps> = ({
  size = 20,
  status,
  changeStatus,
}) => {
  const { colors } = useTheme();
  return (
    <PressableIcon
      name={status ? 'check-circle' : 'circle'}
      color={status ? colors.base.blue : colors.base.border}
      size={size}
      onPress={changeStatus}
    />
  );
};
