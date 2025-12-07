import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, IconProps } from '../icons/Icon';

interface PressableIconProps extends IconProps {
  bgColor?: string;
  onPress?: () => void;
}

export const PressableIcon: React.FC<PressableIconProps> = ({
  name,
  size = 60,
  bgColor,
  color = '#ffffff',
  onPress,
  style,
}) => {
  const styles = StyleSheet.create({
    wrap: {
      backgroundColor: bgColor,
      width: size,
      height: size,
      borderRadius: size / 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const Container = onPress ? TouchableOpacity : Pressable;

  return (
    <Container style={[styles.wrap, { ...style }]} onPress={onPress}>
      <Icon name={name} color={color} size={size / 2} />
    </Container>
  );
};
