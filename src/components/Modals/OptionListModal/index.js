import React, { useState } from "react";

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
  TouchableTitle
} from "./style";

import { Alert, Text, View, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Swipeable from 'react-native-gesture-handler/Swipeable'
// import Modal from 'react-native-modal';

import Parse from "parse/react-native.js";

import arrPickerData from '../../../common/picker/portionData'


export default props => {
   //Variáveis da lógica de add Item
    const [strSearchedItem, setSearchedItem] = useState('')
    const [arrChosenItems, setChosenItems] = useState([])
    const [objChosenItem, setObjChosenItem] = useState([])

    //Lista principais
    const[arrItemsFiltered, setItemsFiltered] = useState([]) //Lista de Visualização
    const[arrItemList, setItemList] = useState([]) //Array de Itens
    // const[itens, setItens] = useState([]);

    async function onOpenModal() {
        setSearchedItem(props.strSearchedItem)
        await loadItems();

    }

    async function loadItems() {

        try {
            const Item = Parse.Object.extend("itens")
            const queryItem = new Parse.Query(Item)
            queryItem.include(['marca_id.nome'])

            queryItem.find().then((arrItems) => {
                loadItemList(props.strSearchedItem, arrItems)
                setItemList(arrItems)
            });

        } catch (error) {
            alert(`Failed to retrieve the object, with error code: ${JSON.stringify(error.message)}`)
        }
    }

    function updateList(arrItemsFiltered) {
        const arrItemListFiltered  = arrItemsFiltered.filter(item => item.get("descricao") !== '')
        setItemsFiltered(arrItemListFiltered)
    }

    function loadItemList(strSearchedItem, arrItems) {
           if(strSearchedItem) {

            const regex = new RegExp(`${strSearchedItem.trim()}`, 'i')
            let arrItemsFiltered = [];
            if(!arrItems) {

                arrItemsFiltered = arrItemList.filter(i =>  i.get('descricao').search(regex) >= 0)
            } else {
                arrItemsFiltered = arrItems.filter(i =>  i.get('descricao').search(regex) >= 0)
            }

            arrItemsFiltered.forEach(item => {
              item.set("isChose", false)
              item.set("portionType", "unidade")

            });

            setItemsFiltered(arrItemsFiltered)
            setSearchedItem(strSearchedItem)
            props.setSearchedItem(strSearchedItem)

           } else {
            setItemsFiltered([])
            setSearchedItem(strSearchedItem)

        }

    }

    async function  updateItemQuantity(objItem) {
        let objItemVerifier = [];
        if(props.isToStock) {
            const UserItem = Parse.Object.extend("itens_usuarios")
            const queryItemUser = new Parse.Query(UserItem)
            queryItemUser.equalTo("item_id",  objItem)
            objItemVerifier = await queryItemUser.find();

        } else {
            const itemList = Parse.Object.extend("listas_compras_itens")
            const queryItemList = new Parse.Query(itemList)
            queryItemList.equalTo("item_id",  objItem)
            objItemVerifier = await queryItemList.find();
        }

        // if(objItemVerifier.length === 0) {
            arrItemsFiltered.forEach(item => {
                if(item.id === objItem.id) {
                    if(objItem.get("quantity") == 0 ) {
                      item.set("isChose", false)
                    } else {
                      item.set("isChose", true)
                    }
                }
            })


            updateList(arrItemsFiltered);
        // } else {
        //     Alert.alert(
        //         "Atenção",
        //         "Item já existente na lista de compras, gostaria de excluir?",
        //         [
        //             {
        //                 text: "Não",
        //             },
        //             {
        //                 text: "Sim",
        //                 onPress: () => deleteItem(objItem)
        //             }
        //         ]
        //     );
        // }
    }

    function changePortionType(objItem, strPortionType) {
      arrItemsFiltered.map(item => {
        if(item.id == objItem.id) {
          item.set("portionType", strPortionType)
        }
      })
      updateList(arrItemsFiltered)
  }

    async function createChosenItemsList(objItem) {
        const objItemInformation = {quantity: parseInt(objItem.get("quantity")), portionType: objItem.get("portionType")};
        objItem.revert();

        arrChosenItems.push(objItem)
        setChosenItems(arrChosenItems)
        props.addChosenItem(objItem, objItemInformation)
        loadItemList('', null);
    }

    async function deleteItem(objItem) {
        if(props.isToStock) {

            const UserItem = Parse.Object.extend("itens_usuarios")
            const queryItemUser = new Parse.Query(UserItem)
            queryItemUser.equalTo("item_id",  objItem)
            queryItemUser.first().then((userItem) => {
                userItem.destroy().then(() =>
                console.warn("Item deletado")
                );
            });

        } else {

            const ItemList = Parse.Object.extend("listas_compras_itens")
            const queryItemList = new Parse.Query(ItemList)
            queryItemList.equalTo("item_id",  objItem)
            queryItemList.first().then((itemList) => {
                itemList.destroy().then(() =>
                console.warn("Item deletado")
                );
            });
        }
    }

    function deleteChosenItem(objItem) {
        arrChosenItems.forEach((i, index) => {
            if(objItem.id === i.id) {
                arrChosenItems.splice(index, 1)
            }
        })
        setChosenItems(arrChosenItems)
        updateList(arrItemsFiltered);
    }

    const getOptionText = (objItem) => {
      if (objItem.get("isChose")) {
        return (
          <OptionText>
            <TouchableTitle onPress={() => {createChosenItemsList(objItem)}}>
                <Title>
                  {objItem.get('descricao')}
                </Title>
              </TouchableTitle>
              <Description>
                  {objItem.get('marca_id')?.get('nome')}
              </Description>
          </OptionText>
        )
      } else {
        return (
          <OptionText>
            <Title>
              {objItem.get('descricao')}
            </Title>

            <Description>
              {objItem.get('marca_id')?.get('nome')}
            </Description>
          </OptionText>
        )
      }
  }
    return (
        <View>
          <Modal
            animationType='slide'
            visible={props.isShowingModal}
            onShow={() => {onOpenModal()}}
            onRequestClose={() => {
              props.onCloseModal()
              setChosenItems([])
              setItemsFiltered([])
            }}>
                <Container>
                    <CloseIcon onPress={() => {
                            props.onCloseModal()
                            setChosenItems([])
                            setItemsFiltered([]) }}>
                        <Header>
                            <Icon name='angle-double-down' size={20} color='black'  />
                        </Header>
                    </CloseIcon>
                    <InputContainer >
                        <InputContent>
                            <InputAutoComplete
                                    placeholder="Procure o item desejado abaixo..."
                                    placeholderTextColor="#FFF"
                                    value={strSearchedItem}
                                    onChangeText={(text) => loadItemList(text, null)}
                                    autoFocus = {true}
                                    >
                                </InputAutoComplete>
                        </InputContent>

                    </InputContainer>
                    <OptionContainer>
                    <FlatList
                      data={arrItemsFiltered}
                      keyExtractor={i => `${i.id}`}
                      renderItem={({ item }) =>
                        <OptionContent>
                          {getOptionText(item)}

                          <OptionInput>
                            <InputPortion
                              keyboardType = {'numeric'}
                              onChangeText={(text) => item.set("quantity", text)}
                              onEndEditing={() => updateItemQuantity(item)}
                            />
                            <Picker
                              mode={'dropdown'}
                              dropdownIconColor='#68CACA'
                              style={styles.picker}
                              selectedValue={item.get("portionType")}
                              onValueChange={(itemValue, itemIndex) => changePortionType(item, itemValue)}
                            >

                              {arrPickerData.map((picker, index) => {
                                return (<Picker.Item label={`${picker.label}`} value={picker.value} key={index} />)
                              })}
                            </Picker>
                          </OptionInput>
                        </OptionContent>
                      }/>
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
    )
}

const styles = StyleSheet.create({
    picker: {
        height: 20,
        width: 88,
        color: '#C3EAEA',
        marginLeft: 2
        // position: 'absolute',
        // right: 90,
    },
    right: {
      flex: 1,
      backgroundColor: '#68CACA',
      flexDirection: 'row',
      alignItems: 'center'
    },
    excludeText: {
      color: '#FFF',
      fontSize: 20,
      margin: 10
    },
    excludeIcon: {
      marginLeft: 10
    },
    left: {
      backgroundColor: '#68CACA',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: 20
    },


})
