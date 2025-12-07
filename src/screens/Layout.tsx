import React, { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '../hooks';
import { Footer } from '../components';
import Navigation from '../navigation';

import { DefaultNav, NewListNav } from '../components/navbars';

export default function Layout() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.base.background,
        paddingTop: 70,
      }}
    >
      <Navigation />
      <Footer />
    </View>
  );
}

interface ScreenWrapperProps {
  children: ReactNode;
  screenName?: string;
  navProps?: any;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  screenName,
  navProps,
}) => {
  const { colors } = useTheme();
  const navs = [
    { screen: 'Tasks', Component: DefaultNav },
    { screen: 'Lists', Component: DefaultNav },
    { screen: 'New List', Component: NewListNav },
    { screen: 'Settings', Component: DefaultNav },
    { screen: 'Stats', Component: DefaultNav },
    { screen: 'Weekly Tasks', Component: DefaultNav },
  ];

  const navItem = navs.find(n => n.screen === screenName);
  const Navbar = navItem?.Component || (() => null);

  return (
    <View style={{ flex: 1, backgroundColor: colors.base.background }}>
      <Navbar {...navProps} label={!navProps && screenName} />
      <ScrollView
        style={{ padding: 20 }}
        contentContainerStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={
          screenName === 'Search' ? 'handled' : 'never'
        }
      >
        {children}
      </ScrollView>
    </View>
  );
};
