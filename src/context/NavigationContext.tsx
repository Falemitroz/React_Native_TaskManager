import React, { createContext, ReactNode, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { List } from '../types/listTypes';

export type Screen =
  | 'Lists'
  | 'Week'
  | 'Search'
  | 'Stats'
  | 'Settings'
  | 'New-List'
  | 'Tasks';

type NavigationProp = NativeStackScreenProps<RootStackParamList>;

type NavigationContextType = {
  active: Screen;
  setActive: (screen: Screen) => void;
  toLists: () => void;
  toToday: () => void;
  toSearch: () => void;
  toStats: () => void;
  toSettings: () => void;
  toNewList: () => void;
  toTasks: (list: List) => void;
  goBack: () => void;
};

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigation<NavigationProp>();
  const [active, setActive] = useState<Screen>('Lists');

  const navigate = (screen: Screen, params?: {}) => {
    setActive(screen);
    navigation.navigate(screen, params);
  };

  const goBack = () => {
    const state = navigation.getState();
    const routes = state.routes;
    const previous = routes[state.index - 1]?.name;

    const linkedToListsScreens: Screen[] = [
      'Settings',
      'Tasks',
      'New-List',
      'Week',
    ];

    // Se la schermata precedente è Settings, salto Settings e torno a Lists
    if (linkedToListsScreens.includes(previous)) {
      navigate('Lists');
      return;
    }

    // Altrimenti comportamento normale
    navigation.goBack();

    if (previous) setActive(previous as Screen);
  };

  const toSettings = () => {
    setActive('Lists');
    navigation.navigate('Settings');
  };

  const toTasks = (list: List) => {
    setActive('Lists');
    navigation.navigate('Tasks', { list });
  };

  const toNewList = () => {
    setActive('Lists');
    navigation.navigate('New-List');
  };

  return (
    <NavigationContext.Provider
      value={{
        active,
        setActive,
        toLists: () => navigate('Lists'),
        toToday: () => navigate('Week'),
        toSearch: () => navigate('Search'),
        toStats: () => navigate('Stats'),
        toNewList,
        toTasks,
        toSettings,
        goBack,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error(
      'useNavigationContext must be used inside NavigationProvider',
    );
  return ctx;
};
