import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { useTheme } from '../../hooks';

type BaseModalProps = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  const s = createStyles();
  return (
    <Modal visible={visible} onDismiss={onClose} style={s.wrapper}>
      <View style={s.content}>{children}</View>
    </Modal>
  );
};

const createStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    wrapper: {
      backgroundColor: colors.base.modalBackground,
      padding: 20,
    },
    content: {
      backgroundColor: colors.base.surface,
      gap: 20,
      padding: 20,
      borderRadius: 10,
    },
  });
};
