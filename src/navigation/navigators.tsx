import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ProjectListPage } from '../components/pages/ProjectListPage';
import { SettingPage } from '../components/pages/SettingPage';
import { ProjectDetailPage } from '../components/pages/ProjectDetailPage';
import * as routeNames from './routeNames';
const RootStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();

const HomeTabNavigator = () => (
  <HomeTab.Navigator>
    <HomeTab.Screen name={routeNames.HOME} component={ProjectListPage} />
    <HomeTab.Screen name={routeNames.SETTING} component={SettingPage} />
  </HomeTab.Navigator>
);
export const RootNavigator: React.FC = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name={routeNames.HOME_TAB_NAV}
      component={HomeTabNavigator}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name={routeNames.PROJECT_DETAIL}
      component={ProjectDetailPage}
    />
  </RootStack.Navigator>
);
