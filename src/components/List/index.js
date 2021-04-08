import React, { useState, useCallback } from 'react'
import { FlatList, RefreshControl } from "react-native";

import {ListContainer, List} from './style'
import ListContent from '../ListContent'


export default props => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const refreshList = React.useCallback(() => {
    setIsRefreshing(true);
    wait(2000).then(() => {
      setIsRefreshing(false);
      props.refreshItemList();
    } );
  }, []);

    return (
        <ListContainer style={props.listStyle}

        >
            <List>
            {/* {this.state.list.map((item, index) => {
                return (<ListContent key={index} {...item} list={item} setQuantityValue={this.setQuantityValue} />)
            })} */}
                <FlatList
                  refreshControl={
                    <RefreshControl
                      tintColor="transparent"
                      colors={['transparent']}
                      style={{backgroundColor: 'transparent'}}
                      refreshing={isRefreshing}
                      onRefresh={refreshList}

                    />
                  }
                  data={props.arrItems}
                  keyExtractor={i => `${i.id}`}
                  renderItem={({item}) =>
                  <ListContent {...item} arrCategory={item}
                    updateQuantity={props.updateQuantity}
                    updatePortionType={props.updatePortionType}
                    onDelete={props.onDelete}
                    insertUserItem={props.insertUserItem}
                />} />

            </List>
        </ListContainer>

    )
}

