import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Stock from '../screens/Stock';
import Recipes from '../screens/Recipes';
import Notification from '../screens/Notification';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Stock" component={Stock} />
    <Tab.Screen name="Recipes" component={Recipes} />
    <Tab.Screen name="Notification" component={Notification} />
  </Tab.Navigator>
);
