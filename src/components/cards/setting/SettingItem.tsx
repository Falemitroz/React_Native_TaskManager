import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../hooks';
import { SettingCard, SubTitle, Title } from './SettingCard';
import { Icon } from '../../icons';
import { Toggle } from '../../Toggle';

type SettingItemProps = {
  cardTitle: string;
  icon: 'moon' | 'sun' | 'info';
  title: string;
  subtitle: string;
  toggleTheme?: () => void;
};

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  toggleTheme,
}) => {
  const { colors } = useTheme();

  return (
    <SettingCard title="Appareance">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        <Icon name={icon} size={24} color={colors.base.blue} />
        <View>
          <Title text={title} />
          <SubTitle text={subtitle} />
        </View>
        {toggleTheme && <Toggle onPress={toggleTheme} />}
      </View>
    </SettingCard>
  );
};

export const AppareanceCard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const upperTheme = theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <SettingItem
      cardTitle="Appareance"
      icon={isDark ? 'moon' : 'sun'}
      title="Dark Mode"
      subtitle={`${upperTheme} theme active.`}
      toggleTheme={toggleTheme}
    />
  );
};

export const InfoCard: React.FC = () => (
  <SettingItem
    cardTitle="App Info"
    icon="info"
    title="Version"
    subtitle="1.0.0"
  />
);
