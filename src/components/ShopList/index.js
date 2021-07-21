import React, {useState, useCallback, useContext} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {ListContent} from './ListContent';
import PropTypes from 'prop-types';
import {ShopListContext} from '../../contexts/ShopList/ShopListContext';

import * as S from './style';

export const ShopList = ({listStyle, insertUserItem}) => {
  const {shoplist, loadShopList} = useContext(ShopListContext);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const refreshList = React.useCallback(() => {
    setIsRefreshing(true);
    wait(2000).then(() => {
      setIsRefreshing(false);
      loadShopList();
    });
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <S.ListContainer style={listStyle}>
      <S.Items>
        <FlatList
          data={shoplist}
          keyExtractor={(i) => `${i.objectId}`}
          renderItem={({item}) => (
            <ListContent
              {...item}
              category={item}
              // insertUserItem={insertUserItem}
            />
          )}
          refreshControl={
            <RefreshControl
              tintColor="transparent"
              colors={['transparent']}
              style={{backgroundColor: 'transparent'}}
              refreshing={isRefreshing}
              onRefresh={refreshList}
            />
          }
        />
      </S.Items>
    </S.ListContainer>
  );
};
