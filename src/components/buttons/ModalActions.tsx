import React from 'react';
import { View } from 'react-native';
import { DefaultButton } from './DefaultButton';

type ModalActionsProps = {
  onDelete?: () => void;
  onCancel?: () => void;
  onSave: () => void;
};

export const ModalActions: React.FC<ModalActionsProps> = ({
  onDelete,
  onCancel,
  onSave,
}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
      {onDelete && (
        <DefaultButton
          text="Delete"
          mode="contained"
          destructive
          onPress={onDelete}
          style={{ marginRight: 'auto' }}
        />
      )}
      {onCancel && (
        <DefaultButton
          text="Cancel"
          mode="text"
          destructive
          onPress={onCancel}
        />
      )}
      <DefaultButton text="Save" mode="text" onPress={onSave} />
    </View>
  );
};
