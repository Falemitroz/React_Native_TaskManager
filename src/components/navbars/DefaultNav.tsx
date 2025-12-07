import React from 'react';
import { Text, TextStyle } from 'react-native';
import { NavWrap } from './NavWrap';
import { PressableIcon } from '../buttons';
import { useAppNavigation, useTheme } from '../../hooks';

export const DefaultNav: React.FC<{ label: string }> = ({ label }) => {
  const main = label === 'Lists';

  return (
    <NavWrap>
      {!main && <NavIconButton />}
      <NavLabel label={label} />
      {main && <NavIconButton main />}
    </NavWrap>
  );
};

export const NavIconButton: React.FC<{ main?: boolean }> = ({ main }) => {
  const { goBack, toSettings } = useAppNavigation();
  const { colors } = useTheme();

  return (
    <PressableIcon
      name={main ? 'settings' : 'arrow-left'}
      size={40}
      color={colors.base.foreground}
      bgColor={colors.base.surface}
      style={{ borderRadius: '50%' }}
      onPress={main ? toSettings : goBack}
    />
  );
};

export const NavLabel: React.FC<{ label: string }> = ({ label }) => {
  const { colors, typography } = useTheme();

  return (
    <Text
      style={{
        ...(typography.h2 as TextStyle),
        color: colors.base.foreground,
        marginRight: 'auto',
      }}
    >
      {label}
    </Text>
  );
};
