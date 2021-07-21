import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {createShopListObj, ShopListReducer} from './ShopListReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../../../../Salooni_Project/salooni_react/salooni/src/contexts/User/UserContext';

export const ShopListContext = createContext();

const initialState = {
  shoplist: [],
};

const ShopListProvider = ({children}) => {
  const [state, dispatch] = useReducer(ShopListReducer, initialState);

  const loadShopList = async (shopListUserId) => {
    await createShopListObj(shopListUserId).then((shoplist) => {
      dispatch({type: 'LOAD_SHOPLIST', shoplist});
    });
    //Bug no primeiro autenticação n carrega o shoplist
    //Ao dar logout não vai de primeira
  };

  const updateShoplistItem = (payload) => {
    dispatch({type: 'UPDATE_ITEM', payload});
  };

  const deleteShoplistItem = (payload) => {
    dispatch({type: 'DELETE_ITEM', payload});
  };

  const insertShoplistItem = (payload) => {
    dispatch({type: 'INSERT_ITEM', payload});
  };

  const clearShopList = () => {
    dispatch({type: 'CLEAR_ALL'});
  };

  const contextValues = {
    loadShopList,
    clearShopList,
    updateShoplistItem,
    deleteShoplistItem,
    insertShoplistItem,
    ...state,
  };

  return (
    <ShopListContext.Provider value={contextValues}>
      {children}
    </ShopListContext.Provider>
  );
};

export default ShopListProvider;
