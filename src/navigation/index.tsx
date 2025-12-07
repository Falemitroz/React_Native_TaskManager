import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ListsScreen,
  SearchScreen,
  SettingsScreen,
  WeekScreen,
  StatsScreen,
  NewListScreen,
  TasksScreen,
} from '../screens';

export type RootStackParamList = {
  Lists: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Lists"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Lists" component={ListsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Week" component={WeekScreen} />
      <Stack.Screen name="Stats" component={StatsScreen} />
      <Stack.Screen name="New-List" component={NewListScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
    </Stack.Navigator>
  );
}
