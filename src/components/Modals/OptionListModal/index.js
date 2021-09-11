import React, { useContext, useState } from "react";

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
} from "./style";

import { FlatList, Modal, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";

import arrPickerData from "../../../common/picker/portionData";
import PropTypes from "prop-types";
import { convertToObj } from "../../../contexts/ShopList/ShopListReducer";
import { ShopListContext } from "../../../contexts/ShopList/ShopListContext";
import { ItemContext } from "../../../contexts/Item/ItemContext";

export const OptionListModal = ({
                                  search,
                                  setSearch,
                                  handleModal,
                                  isShowingModal,
                                  isFromStock,
                                }) => {
  const { insertShoplistItem } = useContext(ShopListContext);
  const { items, loadItem } = useContext(ItemContext);

  const [arrChosenItems, setChosenItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);


  const onOpenModal = async () => {
    setSearch(search);
     loadItem().then(
      () => {
        buildItemList(items);

      },
      error => console.error(error),
    );
  };

  const onCloseModal = () => {
    handleModal();
    setChosenItems([]);
    setFilteredItems([]);
  };

  const buildItemList = () => {

    if (search) {
      const regex = new RegExp(`${search.trim()}`, "i");
      const newFilteredItems = items.filter(
        (i) => i.description.search(regex) >= 0,
      );
      setFilteredItems(newFilteredItems); //não funciona
      setSearch(search);

    } else {
      setFilteredItems([]);
      setSearch(search);
    }
  };

  const handleItem = (handledItem, inputName, value) => {
    setFilteredItems(
      filteredItems.map((item) => {
        if (item.objectId === handledItem.objectId) {
          item.isChose = !(value === "0" || value === "");
          item = {
            ...item,
            [inputName]: value,
          };
        }
        return item;
      }),
    );
  };

  const chooseInsertMethod = () => {
    return isFromStock ? null : insertShoplistItem;
  };

  const insertItem = (objItem) => {
    arrChosenItems.push(objItem);
    setChosenItems(arrChosenItems);
    chooseInsertMethod(objItem);
    buildItemList("");
  };

  // async function deleteItem(objItem) {
  //   if (isToStock) {
  //     const UserItem = Parse.Object.extend("itens_usuarios");
  //     const queryItemUser = new Parse.Query(UserItem);
  //     queryItemUser.equalTo("item_id", objItem);
  //     queryItemUser.first().then((userItem) => {
  //       userItem.destroy().then(() => console.warn("Item deletado"));
  //     });
  //   } else {
  //     const ItemList = Parse.Object.extend("listas_compras_itens");
  //     const queryItemList = new Parse.Query(ItemList);
  //     queryItemList.equalTo("item_id", objItem);
  //     queryItemList.first().then((itemList) => {
  //       itemList.destroy().then(() => console.warn("Item deletado"));
  //     });
  //   }
  // }
  //
  // function deleteChosenItem(objItem) {
  //   arrChosenItems.forEach((i, index) => {
  //     if (objItem.id === i.id) {
  //       arrChosenItems.splice(index, 1);
  //     }
  //   });
  //   setChosenItems(arrChosenItems);
  //   updateList(arrItemsFiltered);
  // }

  const loadItemView = (item) => (
    <OptionContent >
      <OptionText>
        {item.isChose ? (
          <TouchableTitle
            onPress={() => {
              insertItem(item);
            }}>
            <Title>{item?.description}</Title>
          </TouchableTitle>
        ) : (
          <Title>{item?.description}</Title>
        )}

        <Description>{item.brand?.nome}</Description>
      </OptionText>

      <OptionInput>
        <InputPortion
          keyboardType={"numeric"}
          name={"quantity"}
          value={item.quantity}
          onChangeText={(text) =>
            handleItem(item, "quantity", text)
          }
        />
        <Picker
          mode={"dropdown"}
          dropdownIconColor="#68CACA"
          style={styles.picker}
          selectedValue={item.portion}
          onValueChange={(itemValue, itemIndex) =>
            handleItem(item, "portion", itemValue)
          }>
          {arrPickerData.map((picker, index) => (

            <Picker.Item
              label={`${picker.label}`}
              value={picker.value}
              key={index}
            />

          ))}
        </Picker>
      </OptionInput>
    </OptionContent>
  );

  return (
    <View>
      <Modal
        animationType="slide"
        visible={isShowingModal}
        onShow={() => {
          onOpenModal();
        }}
        onRequestClose={onCloseModal}>
        <Container>
          <CloseIcon
            onPress={onCloseModal}>
            <Header>
              <Icon name="angle-double-down" size={20} color="black" />
            </Header>
          </CloseIcon>
          <InputContainer>
            <InputContent>
              <InputAutoComplete
                placeholder="Procure o item desejado abaixo..."
                placeholderTextColor="#FFF"
                value={search}
                onChangeText={(text) => buildItemList(text)}
                autoFocus={true}
              />
            </InputContent>
          </InputContainer>
          <OptionContainer>
            <FlatList
              data={filteredItems}
              keyExtractor={(i) => `${i.id}`}
              renderItem={loadItemView}
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
  strSearchedItem: "",
  handleSearchedItem: () => {
  },
  isToStock: false,
  isShowingModal: false,
  insertNewItem: () => {
  },
  handleModal: () => {
  },
};

const styles = StyleSheet.create({
  picker: {
    height: 20,
    width: 88,
    color: "#C3EAEA",
    marginLeft: 2,
    // position: 'absolute',
    // right: 90,
  },
  right: {
    flex: 1,
    backgroundColor: "#68CACA",
    flexDirection: "row",
    alignItems: "center",
  },
  excludeText: {
    color: "#FFF",
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
  },
  left: {
    backgroundColor: "#68CACA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
});
