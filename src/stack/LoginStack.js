import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EntranceOption from '../screens/Entrance/EntranceOption';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="EntranceOptions"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="EntranceOptions" component={EntranceOption} />
  </Stack.Navigator>
);
