import React from 'react';
import { ScreenWrapper } from '../Layout';
import {
  AccountSettingCard,
  AppareanceCard,
  InfoCard,
} from '../../components/cards/setting';

export default function SettingsScreen() {
  return (
    <ScreenWrapper screenName="Settings">
      {/* TOGGLE THEME */}
      <AppareanceCard />

      {/* ACCOUNT */}
      <AccountSettingCard />

      {/* VERSION */}
      <InfoCard />
    </ScreenWrapper>
  );
}
