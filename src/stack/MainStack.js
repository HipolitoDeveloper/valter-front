import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserProvider from '../../../../Salooni_Project/salooni_react/salooni/src/contexts/User/UserContext';

import Recipe from '../screens/Recipe';
import Home from '../screens/Home';
import MainTab from './MainTab';
import LoginStack from './LoginStack';

import ShopListProvider from '../contexts/ShopList/ShopListContext';

const Stack = createStackNavigator();

export default () => (
  <UserProvider>
    <ShopListProvider>
      <Stack.Navigator
        initialRouteName="MainTab"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Recipe" component={Recipe} />
        <Stack.Screen name="LoginStack" component={LoginStack} />
      </Stack.Navigator>
    </ShopListProvider>
  </UserProvider>
);
