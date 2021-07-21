import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-picker/picker';

import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import * as S from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import arrPickerData from '../../../common/picker/portionData';
import {ShopListContext} from '../../../contexts/ShopList/ShopListContext';

export const ListContent = ({category}) => {
  const {updateShoplistItem, deleteShoplistItem} = useContext(ShopListContext);

  const updateItem = (objItem, quantity, portionType) => {
    if (quantity) objItem.quantidade = quantity;
    else if (portionType) objItem.tipo_porcao = portionType;

    if (objItem) updateShoplistItem({shopListItemToUpdate: objItem});
  };
  //
  // const getRightContent = (
  //   objItem, //Excluir da lista e adicionar nos itens do usuário
  // ) =>
  //   insertShoplistItem && (
  //     // <TouchableOpacity
  //     //   style={styles.left}
  //     //   onPress={() => insertShoplistItem && insertShoplistItem(objItem)}>
  //     //   <Icon name="plus" size={30} color="#FFF" />
  //     // </TouchableOpacity>
  //   );

  const getLeftContent = () => (
    //Excluir permanentemente da lista e não adicionar em lugar nenjhum

    <View style={styles.right}>
      <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
      <Text style={styles.excludeText}>Excluir</Text>
    </View>
  );

  return (
    <S.Container>
      <S.TitleContainer>
        <S.TitleContent>
          <S.TitleDescription>{category.nome}</S.TitleDescription>
        </S.TitleContent>
      </S.TitleContainer>
      <FlatList
        data={category.itens}
        keyExtractor={(i) => `${i.objectId}`}
        renderItem={({item}) => (
          <Swipeable
            // renderRightActions={() => getRightContent(item)}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() =>
              deleteShoplistItem &&
              deleteShoplistItem({shopListItemToDelete: item})
            }>
            <S.ItemContainer>
              <S.ItemContent>
                <S.ItemText>
                  <S.ItemTitle>{item.item_id.descricao}</S.ItemTitle>
                  <S.ItemDescription>
                    {item.item_id.marca_id.nome}
                  </S.ItemDescription>
                </S.ItemText>

                <S.ItemInput>
                  <S.InputPortion
                    keyboardType={'numeric'}
                    placeholder={`${item.quantidade}`}
                    onChangeText={(text) => (item.quantidade = text)}
                    onEndEditing={() => updateItem(item, item.quantidade)}
                  />

                  <Picker
                    mode={'dropdown'}
                    style={styles.picker}
                    selectedValue={`${item.tipo_porcao}`}
                    onValueChange={(itemValue) =>
                      updateItem(item, null, itemValue)
                    }>
                    {arrPickerData.map((picker, index) => {
                      return (
                        <Picker.Item
                          style={{fontSize: 12}}
                          label={`${picker.label}`}
                          value={picker.value}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </S.ItemInput>
              </S.ItemContent>
            </S.ItemContainer>
          </Swipeable>
        )}
      />
    </S.Container>
  );
};

ListContent.propTypes = {
  insertUserItem: PropTypes.func,
  category: PropTypes.object,
  deleteItem: PropTypes.func,
  updatePortionType: PropTypes.func,
};

ListContent.defaultProps = {
  insertUserItem: () => {},
  category: [],
  deleteItem: () => {},
  updateItem: () => {},
};

const styles = StyleSheet.create({
  picker: {
    height: 20,
    width: 90,
    color: 'black',
    marginRight: 100,
  },
  left: {
    backgroundColor: '#68CACA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  right: {
    flex: 1,
    backgroundColor: '#68CACA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  excludeText: {
    color: '#FFF',
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
  },
});
