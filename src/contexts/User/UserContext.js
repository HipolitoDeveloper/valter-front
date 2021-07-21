import React, {createContext, useEffect, useState} from 'react';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {convertToObj} from '../../../../../../Casa_Project/AppV03/src/services/conversor';
export const UserContext = createContext();

const initialState = {
  currentUser: {},
};

const UserProvider = ({children}) => {
  const [state, setState] = useState(initialState);

  const getShopList = async (userId) => {
    return new Promise(async (resolve) => {
      const ShopListUser = Parse.Object.extend('listas_compras_usuarios');
      const queryShopListUser = new Parse.Query(ShopListUser);
      queryShopListUser.equalTo('usuario_id', userId);

      resolve(convertToObj(await queryShopListUser.first()));
    });
  };

  const setCurrentUser = async (user) => {
    //Pensar em forma melhor de atribuir o usuário atual, para que o resto do aplicativo possa acessar o usuário atual
    //Principlmente o context de shoplist

    setState({
      ...initialState,
      currentUser: user,
    });
  };

  const doLogin = async (user) => {
    await Parse.User.logIn(user.email, user.password).then(async (userData) => {
      const stringfiedUser = convertToObj(userData);
      const shoplist = await getShopList(stringfiedUser.objectId);

      const currentUser = {
        id: stringfiedUser.objectId,
        shopListUser: shoplist,
      };

      await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));

      setState({
        ...initialState,
        currentUser: currentUser,
      });
    });
  };

  const doLogout = async () => {
    await Parse.User.logOut().then(async () => {
      setState(initialState);
      await AsyncStorage.clear();
    });
  };

  const contextValues = {
    doLogin,
    setCurrentUser,
    doLogout,
    ...state,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
