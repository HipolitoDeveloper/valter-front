import React, { useState, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";

import { ListContainer, Items } from "./style";
import { ListContent } from "../ListContent";
import PropTypes from "prop-types";


export const List = ({
                       refreshItemList,
                       listStyle,
                       arrItems,
                       updateQuantity,
                       updatePortionType,
                       onDelete,
                       insertUserItem,
                     }) => {

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const refreshList = React.useCallback(() => {
    setIsRefreshing(true);
    wait(2000).then(() => {
      setIsRefreshing(false);
      refreshItemList();
    });
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <ListContainer style={listStyle}>
      <Items>
        <FlatList
          data={arrItems}
          keyExtractor={i => `${i.id}`}
          renderItem={({ item }) =>
            <ListContent {...item} arrCategory={item}
                         updateQuantity={updateQuantity}
                         updatePortionType={updatePortionType}
                         onDelete={onDelete}
                         insertUserItem={insertUserItem}
            />}
          refreshControl={
            <RefreshControl
              tintColor="transparent"
              colors={["transparent"]}
              style={{ backgroundColor: "transparent" }}
              refreshing={isRefreshing}
              onRefresh={refreshList}/>}
        />
      </Items>
    </ListContainer>

  );
};

ListContent.propTypes = {
  refreshItemList: PropTypes.func,
  listStyle: PropTypes.object,
  arrItems: PropTypes.object,
  updateQuantity: PropTypes.func,
  updatePortionType: PropTypes.func,
  onDelete: PropTypes.func,
  insertUserItem: PropTypes.func,
};

ListContent.defaultProps = {
  insertUserItem: () => {},
  arrCategory: [],
  onDelete: () => {},
  updatePortionType: () => {},
};

