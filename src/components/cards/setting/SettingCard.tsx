import React, { ReactNode } from 'react';
import { useTheme } from '../../../hooks';
import { BaseCard } from '../BaseCard';
import { StyleSheet, Text, TextStyle } from 'react-native';

type SettingCardProps = {
  title: string;
  children: ReactNode;
};

export const SettingCard: React.FC<SettingCardProps> = ({
  title,
  children,
}) => {
  const { colors, typography } = useTheme();
  return (
    <BaseCard style={createStyles().baseCard}>
      <Text
        style={{
          ...(typography.h3 as TextStyle),
          color: colors.base.foreground,
        }}
      >
        {title}
      </Text>
      {children}
    </BaseCard>
  );
};

export const Title: React.FC<{ text: string }> = ({ text }) => (
  <Text style={createStyles().title}>{text}</Text>
);

export const SubTitle: React.FC<{ text: string }> = ({ text }) => (
  <Text style={createStyles().subtitle}>{text}</Text>
);

const createStyles = () => {
  const { colors, typography } = useTheme();
  return StyleSheet.create({
    baseCard: {
      borderBottomWidth: 1,
      paddingBottom: 20,
      marginBottom: 20,
      borderColor: colors.base.border,
      gap: 10,
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
