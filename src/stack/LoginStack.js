import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {EntranceOption} from '../screens/Entrance/EntranceOption';
import {SignIn} from '../screens/Entrance/SignIn';
import SignUp from '../screens/Entrance/SignUp';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="EntranceOptions" component={EntranceOption} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);
