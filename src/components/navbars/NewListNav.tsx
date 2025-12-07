import React from 'react';
import { DefaultButton } from '../buttons';
import { NavIconButton, NavLabel } from './DefaultNav';
import { NavWrap } from './NavWrap';

type NewListNavProps = {
  disabled?: boolean;
  onPress: () => void;
};

export const NewListNav: React.FC<NewListNavProps> = ({
  disabled = true,
  onPress,
}) => {
  return (
    <NavWrap>
      <NavIconButton />
      <NavLabel label="New List" />
      <DefaultButton
        text="Save"
        disabled={disabled}
        onPress={onPress}
        style={{ paddingHorizontal: 20 }}
      />
    </NavWrap>
  );
};
