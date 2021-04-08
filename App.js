import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import MainTab from './src/stack/MainTab';
import { Platform, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Parse from "parse/react-native.js";
import keys from './config/server_connection'
import MainStack from './src/stack/MainStack';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('geladeira', "javascriptKeY", "master");
Parse.serverURL = keys.serverURL;


export default () => {

  return (

    <NavigationContainer>
      <MainStack />      
    </NavigationContainer>
    
  );
}