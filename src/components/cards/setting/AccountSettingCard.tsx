import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import { SettingCard, SubTitle, Title } from './SettingCard';
import { Icon } from '../../icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../hooks';

export const AccountSettingCard: React.FC = () => {
  const { colors } = useTheme();

  const styles = createStyles();

  return (
    <SettingCard title="Account">
      <Pressable
        style={styles.userProfileWrap}
        onPress={() => Alert.alert('User Info')}
      >
        <Icon name="user" size={24} color={colors.base.blue} />
        <View>
          <Title text="User Profile" />
          <SubTitle text="Manage your account" />
        </View>
      </Pressable>
      <Pressable
        style={styles.logoutWrap}
        onPress={() => Alert.alert('User logout')}
      >
        <MaterialIcons
          name="logout"
          size={24}
          color={colors.base.destructiveText}
        />
        <Text style={styles.logoutText}>Sign Out</Text>
      </Pressable>
    </SettingCard>
  );
};

const createStyles = () => {
  const { colors, typography } = useTheme();
  return StyleSheet.create({
    userProfileWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    logoutWrap: {
      width: '100%',
      flexDirection: 'row',
      gap: 10,
      padding: 10,
      marginTop: 20,
      paddingLeft: 20,
      borderRadius: 50,
      backgroundColor: colors.base.destructive,
    },

    logoutText: {
      ...(typography.h3 as TextStyle),
      color: colors.base.destructiveText,
    },
  });
};
