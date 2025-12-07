import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks';

type BaseCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
  disableTouch?: boolean;
};

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  style,
  onPress,
  onLongPress,
  disableTouch,
}) => {
  const s = createStyles();
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const content = (
    <Animated.View style={[s.wrap, { transform: [{ scale }] }, style]}>
      {children}
    </Animated.View>
  );

  if (disableTouch) return content;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      style={style}
    >
      {content}
    </Pressable>
  );
};

const createStyles = () => {
  const { colors, typography } = useTheme();
  return StyleSheet.create({
    wrap: {
      flex: 1,
      backgroundColor: colors.base.surface,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.base.border,
      borderRadius: 15,
    },
    title: {
      ...(typography.h3 as TextStyle),
      color: colors.base.foreground,
    },
    subtitle: {
      ...(typography.p as TextStyle),
      color: colors.base.foregroundAlt,
    },
  });
};
