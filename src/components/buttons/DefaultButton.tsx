import React from 'react';
import {
  TouchableOpacity,
  Text,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks';

type Mode = 'contained' | 'outlined' | 'text';

interface DefaultButtonProps {
  mode?: Mode;
  text?: string;
  textColor?: string;
  textSize?: number;
  destructive?: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  mode = 'contained',
  text,
  textColor,
  textSize,
  destructive,
  onPress,
  disabled,
  style,
}) => {
  const { colors, typography } = useTheme();

  const variants: Record<Mode, { container?: ViewStyle; text?: TextStyle }> = {
    contained: {
      container: {
        backgroundColor: destructive
          ? colors.components.button.destructive
          : disabled
          ? colors.components.button.disabledBgColor
          : colors.components.button.default,
      },
      text: {
        color: textColor
          ? textColor
          : disabled
          ? colors.components.button.disabledColor
          : colors.components.button.foreground,
      },
    },
    outlined: {
      container: {
        borderWidth: 2,
        borderColor: destructive
          ? colors.components.button.destructive
          : colors.components.button.default,
      },
      text: {
        color: textColor
          ? textColor
          : destructive
          ? colors.components.button.destructive
          : colors.components.button.default,
      },
    },
    text: {
      text: {
        color: textColor
          ? textColor
          : destructive
          ? colors.components.button.destructive
          : colors.components.button.default,
      },
    },
  };

  const baseContainer: ViewStyle = {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const baseText: TextStyle = {
    ...(typography.button as TextStyle),
    fontSize: textSize || typography.button.fontSize,
  };

  const variant = variants[mode];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[baseContainer, variant.container, style]}
    >
      <Text style={[baseText, variant.text]}>{text}</Text>
    </TouchableOpacity>
  );
};
