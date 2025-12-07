import { TextInput } from 'react-native-paper';
import { useTheme } from '../../hooks';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { shadows } from '../../utils/shadows';

type InputProps = {
  placeholder?: string;
  value: string;
  autofocus?: boolean;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  style?: StyleProp<TextStyle>;
};

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  autofocus,
  onChangeText,
  onFocus,
  onBlur,
  onSubmitEditing,
  style,
}) => {
  const styles = createStyles();

  return (
    <TextInput
      mode="outlined"
      placeholder={placeholder}
      placeholderTextColor={styles.input.color}
      textColor={styles.textColor}
      value={value}
      onChangeText={onChangeText}
      outlineStyle={styles.input}
      style={[styles.input, style]}
      theme={{
        colors: {
          primary: styles.primary, //  active label & border
          onSurfaceVariant: styles.input.color, // inactive label
        },
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      onSubmitEditing={onSubmitEditing}
      autoFocus={autofocus}
    />
  );
};

const createStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    input: {
      borderRadius: 30,
      backgroundColor: 'transparent',
      color: colors.base.foregroundAlt,
      ...shadows,
    },
    textColor: colors.base.foreground,
    primary: colors.base.blue,
  });
};
