import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Recipe from '../screens/Recipe';
import MainTab from './MainTab';
import LoginStack from './LoginStack';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Stock"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="LoginStack" component={LoginStack} />
    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen name="Recipe" component={Recipe} />
  </Stack.Navigator>
);
