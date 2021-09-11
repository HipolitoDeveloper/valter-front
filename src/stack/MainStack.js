import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Recipe from "../screens/Recipe";
import Home from "../screens/Home";
import MainTab from "./MainTab";
import LoginStack from "./LoginStack";

import ShopListProvider from "../contexts/ShopList/ShopListContext";
import UserProvider from "../contexts/User/UserContext";
import ItemProvider from "../contexts/Item/ItemContext";

const Stack = createStackNavigator();

export default () => (
  <UserProvider>
    <ShopListProvider>
      <ItemProvider>
        <Stack.Navigator
          initialRouteName="MainTab"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="MainTab" component={MainTab} />
          <Stack.Screen name="Recipe" component={Recipe} />
          <Stack.Screen name="LoginStack" component={LoginStack} />
        </Stack.Navigator>
      </ItemProvider>
    </ShopListProvider>
  </UserProvider>
);
