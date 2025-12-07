import React, { useState } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { BaseModal } from '../BaseModal';
import { ColorCard } from '../../cards';
import { ModalActions, PressableIcon } from '../../buttons';
import { bgColors, icons } from '../../../utils/constants';
import { useList, useTheme } from '../../../hooks';
import { List } from '../../../types/listTypes';

type IconModalProps = {
  visible: boolean;
  list: List;
  onClose: () => void;
};

export const IconModal: React.FC<IconModalProps> = ({
  visible,
  list,
  onClose,
}) => {
  const { editList } = useList();

  const [selectedIcon, setSelectedIcon] = useState(list.icon);
  const [selectedColor, setSelectedColor] = useState(list.iconBgColor);

  const styles = style();

  const iconBgColor = (icon: string) =>
    icon === selectedIcon ? selectedColor : 'transparent';

  const handleUpdate = () => {
    if (selectedIcon != list.icon) editList(list.id, { icon: selectedIcon });
    if (selectedColor != list.iconBgColor)
      editList(list.id, { iconBgColor: selectedColor });

    onClose();
  };

  const handleCancel = () => {
    setSelectedIcon(list.icon);
    setSelectedColor(list.iconBgColor);
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose}>
      {/* ICONS */}
      <Text style={styles.sectionName}>Icon</Text>
      <View style={styles.sectionWrap}>
        {icons.map(icon => (
          <PressableIcon
            key={icon}
            name={icon}
            bgColor={iconBgColor(icon)}
            onPress={() => setSelectedIcon(icon)}
          />
        ))}
      </View>

      {/* COLORS */}
      <Text style={styles.sectionName}>Color</Text>
      <View style={styles.sectionWrap}>
        {bgColors.map(color => (
          <ColorCard
            key={color}
            color={color}
            selected={color === String(selectedColor)}
            onPress={() => {
              setSelectedColor(color);
            }}
          />
        ))}
      </View>

      {/* ACTIONS */}
      <ModalActions onCancel={handleCancel} onSave={handleUpdate} />
    </BaseModal>
  );
};

const style = () => {
  const { colors, typography } = useTheme();

  return StyleSheet.create({
    sectionName: {
      ...(typography.p as TextStyle),
      color: colors.base.foreground,
    },
    sectionWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
  });
};
