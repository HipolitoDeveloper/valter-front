import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Picker } from "@react-native-picker/picker";

import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Container,
  ItemContainer,
  ItemContent,
  ItemDescription,
  ItemText,
  ItemInput,
  ItemTitle,
  PickerContainer,
  InputPortion,
  TitleContainer,
  TitleContent,
  TitleDescription,
} from "./style";
import Icon from "react-native-vector-icons/FontAwesome";
import Swipeable from "react-native-gesture-handler/Swipeable";

import arrPickerData from "../../common/picker/portionData";


export const ListContent = ({ insertUserItem, arrCategory, onDelete, updatePortionType }) => {


  const updateQuantity = (objItem, strValue) => {
    objItem.set("quantidade", parseInt(strValue));
    objItem.save();
  };
  const getRightContent = (objItem) => (//Excluir da lista e adicionar nos itens do usuário
    insertUserItem &&
    <TouchableOpacity style={styles.left}
                      onPress={() => insertUserItem && insertUserItem(objItem)}
    >
      <Icon name="plus" size={30} color="#FFF" />
    </TouchableOpacity>
  );


  const getLeftContent = () => (//Excluir permanentemente da lista e não adicionar em lugar nenjhum

    <View style={styles.right}>
      <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
      <Text style={styles.excludeText}>Excluir</Text>
    </View>
  );

  return (
    <Container>
      <TitleContainer>
        <TitleContent>
          <TitleDescription>{arrCategory.get("nome")}</TitleDescription>
        </TitleContent>
      </TitleContainer>
      <FlatList
        data={arrCategory.get("itens")}
        keyExtractor={i => `${i.id}`}
        renderItem={({ item }) =>

          <Swipeable
            renderRightActions={() => getRightContent(item)}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => onDelete && onDelete(item)}
          >
            <ItemContainer>
              <ItemContent>
                <ItemText>
                  <ItemTitle>{item.get("item_id").get("descricao")}</ItemTitle>
                  <ItemDescription>{item.get("item_id").get("marca_id")?.get("nome")}</ItemDescription>
                </ItemText>

                <ItemInput>
                  <InputPortion
                    keyboardType={"numeric"}
                    placeholder={`${item.get("quantidade")}`}
                    onChangeText={(text) => updateQuantity(item, text)}
                  />

                  <Picker
                    mode={"dropdown"}
                    style={styles.picker}
                    selectedValue={`${item.get("tipo_porcao")}`}
                    onValueChange={(itemValue) => updatePortionType(item.id, itemValue)}
                  >
                    {arrPickerData.map((picker, index) => {
                      return (<Picker.Item style={{ fontSize: 12 }} label={`${picker.label}`} value={picker.value}
                                           key={index} />);
                    })}
                  </Picker>

                </ItemInput>
              </ItemContent>
            </ItemContainer>
          </Swipeable>
        } />
    </Container>
  );
};

ListContent.propTypes = {
  insertUserItem: PropTypes.func,
  arrCategory: PropTypes.object,
  onDelete: PropTypes.func,
  updatePortionType: PropTypes.func,
};

ListContent.defaultProps = {
  insertUserItem: () => {},
  arrCategory: [],
  onDelete: () => {},
  updatePortionType: () => {},
};

const styles = StyleSheet.create({
  picker: {
    height: 20,
    width: 90,
    color: "black",
    marginRight: 100,

  },
  left: {
    backgroundColor: "#68CACA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
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
});

