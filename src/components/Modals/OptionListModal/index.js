import React, {useContext, useState} from 'react';

import {
  CloseIcon,
  Container,
  Description,
  Header,
  InputAutoComplete,
  InputContainer,
  InputContent,
  InputPortion,
  OptionContainer,
  OptionContent,
  OptionInput,
  OptionText,
  Title,
  TouchableTitle,
} from './style';

import {
  Alert,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// import Modal from 'react-native-modal';

import Parse from 'parse/react-native.js';

import arrPickerData from '../../../common/picker/portionData';
import PropTypes from 'prop-types';
import {ListContent} from '../../ShopList/ListContent';
import {convertToObj} from '../../../contexts/ShopList/ShopListReducer';
import {ShopListContext} from '../../../contexts/ShopList/ShopListContext';

export const OptionListModal = ({
  strSearchedItem,
  handleSearchedItem,
  handleModal,
  isShowingModal,
  isFromStock,
}) => {
  const {insertShoplistItem} = useContext(ShopListContext);

  //Variáveis da lógica de add Item
  const [strSearch, setSearch] = useState('');
  const [arrChosenItems, setChosenItems] = useState([]);

  //Lista principais
  const [arrItemsFiltered, setItemsFiltered] = useState([]); //Lista de Visualização
  const [arrItemList, setItemList] = useState([]); //Array de Itens
  // const[itens, setItens] = useState([]);
  const onOpenModal = async () => {
    setSearch(strSearchedItem);
    await getItems();
  };

  const getItems = () => {
    try {
      const Item = Parse.Object.extend('itens');
      const queryItem = new Parse.Query(Item);
      queryItem.include(['marca_id.nome']);

      queryItem.find().then((parseObject) => {
        const arrItems = convertToObj(parseObject);
        buildItemList(strSearchedItem, arrItems);
        setItemList(arrItems);
      });
    } catch (error) {
      alert(
        `Failed to retrieve the object, with error code: ${JSON.stringify(
          error.message,
        )}`,
      );
    }
  };
  const buildItemList = (strSearch, arrItems) => {
    if (strSearch) {
      const regex = new RegExp(`${strSearch.trim()}`, 'i');
      let arrItemsFiltered = [];
      if (!arrItems) {
        arrItemsFiltered = arrItemList.filter(
          (i) => i.descricao.search(regex) >= 0,
        );
      } else {
        arrItemsFiltered = arrItems.filter(
          (i) => i.descricao.search(regex) >= 0,
        );
      }

      arrItemsFiltered.forEach((item) => {
        item.isChose = false;
        item.tipo_porcao = 'unidade';
      });

      setItemsFiltered(arrItemsFiltered);
      setSearch(strSearch);
      handleSearchedItem(strSearch);
    } else {
      setItemsFiltered([]);
      handleSearchedItem(strSearchedItem);
    }
  };

  const handleItem = (handledItem, inputName, value) => {
    const newArrItemsFiltered = arrItemsFiltered.map((item) => {
      if (item.objectId === handledItem.objectId) {
        item.isChose = !(value === '0' || value === '');
        item = {
          ...item,
          [inputName]: value,
        };
      }
      return item;
    });

    setItemsFiltered(newArrItemsFiltered);
  };

  const chooseInsertMethod = () => {
    return isFromStock ? null : insertShoplistItem;
  };

  const insertItem = (objItem) => {
    arrChosenItems.push(objItem);
    setChosenItems(arrChosenItems);
    chooseInsertMethod(objItem, objItemInformation);
    buildItemList('', null);
  };

  async function deleteItem(objItem) {
    if (isToStock) {
      const UserItem = Parse.Object.extend('itens_usuarios');
      const queryItemUser = new Parse.Query(UserItem);
      queryItemUser.equalTo('item_id', objItem);
      queryItemUser.first().then((userItem) => {
        userItem.destroy().then(() => console.warn('Item deletado'));
      });
    } else {
      const ItemList = Parse.Object.extend('listas_compras_itens');
      const queryItemList = new Parse.Query(ItemList);
      queryItemList.equalTo('item_id', objItem);
      queryItemList.first().then((itemList) => {
        itemList.destroy().then(() => console.warn('Item deletado'));
      });
    }
  }

  function deleteChosenItem(objItem) {
    arrChosenItems.forEach((i, index) => {
      if (objItem.id === i.id) {
        arrChosenItems.splice(index, 1);
      }
    });
    setChosenItems(arrChosenItems);
    updateList(arrItemsFiltered);
  }

  const getOptionText = (handledItem) => {
    // if (objItem.isChose) {
    if (handledItem.isChose) {
      return (
        <OptionText>
          <TouchableTitle
            onPress={() => {
              insertItem(handledItem);
            }}>
            <Title>{handledItem.descricao}</Title>
          </TouchableTitle>
          <Description>{handledItem.marca_id?.nome}</Description>
        </OptionText>
      );
    } else {
      return (
        <OptionText>
          <Title>{handledItem.descricao}</Title>

          <Description>{handledItem.marca_id?.nome}</Description>
        </OptionText>
      );
    }
  };
  return (
    <View>
      <Modal
        animationType="slide"
        visible={isShowingModal}
        onShow={() => {
          onOpenModal();
        }}
        onRequestClose={() => {
          handleModal();
          setChosenItems([]);
          setItemsFiltered([]);
        }}>
        <Container>
          <CloseIcon
            onPress={() => {
              handleModal();
              setChosenItems([]);
              setItemsFiltered([]);
            }}>
            <Header>
              <Icon name="angle-double-down" size={20} color="black" />
            </Header>
          </CloseIcon>
          <InputContainer>
            <InputContent>
              <InputAutoComplete
                placeholder="Procure o item desejado abaixo..."
                placeholderTextColor="#FFF"
                value={strSearch}
                onChangeText={(text) => buildItemList(text, null)}
                autoFocus={true}
              />
            </InputContent>
          </InputContainer>
          <OptionContainer>
            <FlatList
              data={arrItemsFiltered}
              keyExtractor={(i) => `${i.objectId}`}
              renderItem={({item}) => (
                <OptionContent>
                  {getOptionText(item)}

                  <OptionInput>
                    <InputPortion
                      keyboardType={'numeric'}
                      name={'quantidade'}
                      value={item.quantidade}
                      onChangeText={(text) =>
                        handleItem(item, 'quantidade', text)
                      }
                    />
                    <Picker
                      mode={'dropdown'}
                      dropdownIconColor="#68CACA"
                      style={styles.picker}
                      selectedValue={item.tipo_porcao}
                      onValueChange={(itemValue, itemIndex) =>
                        handleItem(item, 'tipo_porcao', itemValue)
                      }>
                      {arrPickerData.map((picker, index) => {
                        return (
                          <Picker.Item
                            label={`${picker.label}`}
                            value={picker.value}
                            key={index}
                          />
                        );
                      })}
                    </Picker>
                  </OptionInput>
                </OptionContent>
              )}
            />
          </OptionContainer>
          {/* <ContainerChips>
                        {arrChosenItems.map((item, index) => {
                            return(
                            <MaterialChip
                            key={index}
                            text={item.itemDescription}
                            checked={true}
                            onDelete={() => deleteChosenItem(item)}
                            />
                        )})
                    }
                    </ContainerChips>                                             */}
        </Container>
      </Modal>
    </View>
  );
};

OptionListModal.propTypes = {
  strSearchedItem: PropTypes.string,
  handleSearchedItem: PropTypes.func,
  isToStock: PropTypes.bool,
  isShowingModal: PropTypes.bool,
  insertNewItem: PropTypes.func,
  handleModal: PropTypes.func,
};

OptionListModal.defaultProps = {
  strSearchedItem: '',
  handleSearchedItem: () => {},
  isToStock: false,
  isShowingModal: false,
  insertNewItem: () => {},
  handleModal: () => {},
};

const styles = StyleSheet.create({
  picker: {
    height: 20,
    width: 88,
    color: '#C3EAEA',
    marginLeft: 2,
    // position: 'absolute',
    // right: 90,
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
  left: {
    backgroundColor: '#68CACA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
});
