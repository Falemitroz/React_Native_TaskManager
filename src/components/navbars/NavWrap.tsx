import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks';

type NavWrapProps = { children: ReactNode; style?: StyleProp<ViewStyle> };

export const NavWrap: React.FC<NavWrapProps> = ({ children, style }) => {
  return (
    <View style={[createStyles().container, { ...style }]}>{children}</View>
  );
};

const createStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 20,
      paddingHorizontal: 20,
      gap: 20,
      borderBottomWidth: 2,
      borderColor: colors.base.border,
      backgroundColor: colors.base.background,
    },
  });
};
