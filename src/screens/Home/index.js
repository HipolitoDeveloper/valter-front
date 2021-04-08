import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
import Parse from "parse/react-native.js";
import "moment/locale/pt-br";
import { LinearGradient } from "expo-linear-gradient";

import {
  Container,
  Header,
  HeaderTitle,  } from "./style";

import  List  from "../../components/List";
import AutoCompleteInput from "../../components/AutoCompleteInput";

const initialState = {
  arrShopList: [],
};

export default class Home extends Component {
  state = {
    ...initialState,
  };

  async componentDidMount() {
    await this.loadShopList();
  }

  setList(purchaseItems) {
    this.setState({arrShopList: purchaseItems});
  }

  loadShopList = async () => {
    try {
      const ShopItemUser = Parse.Object.extend('listas_compras_usuarios')
      const queryShopItemUser = new Parse.Query(ShopItemUser)
      queryShopItemUser.equalTo("usuario_id", "wXSqmG4vwM")

      const ShopItemList = Parse.Object.extend('listas_compras_itens');
      const queryShopItemList = new Parse.Query(ShopItemList);
      queryShopItemList.matchesQuery("lista_compra_usuario_id", queryShopItemUser);
      queryShopItemList.include(['item_id.categoria_id']);
      queryShopItemList.include(['item_id.marca_id']);
      queryShopItemList.ascending('item_id');

      const arrShopItemList = await queryShopItemList.find();

      const Category = Parse.Object.extend('categorias');
      const queryCategory = new Parse.Query(Category);


      let arrCategories = [];
      for (let i = 0; i < arrShopItemList.length; i++) {

        const intCategoryId = arrShopItemList[i].get('item_id').get('categoria_id').id;
        queryCategory.equalTo('objectId', arrShopItemList[i].get('item_id').get('categoria_id').id,
        );
        const objCategoria = await queryCategory.first();

        const isCategoryDuplicated = arrCategories.find((cat) => cat.id === intCategoryId);

        if (isCategoryDuplicated === undefined) {
          arrCategories.push(objCategoria);
        }
      }

      arrCategories.forEach((category) => {
        category.set('itens', []);
        category.save();

        arrShopItemList.forEach((iu) => {
          if (category.id === iu.get('item_id').get('categoria_id').id) category.get('itens').push(iu);
        });
      });

      this.setState({arrShopList: arrCategories});
    } catch (error) {
        alert(`Não foi possível caregar a Lista de Compras ${JSON.stringify(error.message)}`)
    }
  };

  addItem = async (objItem, objItemInformation) => {
    try {
      const ShopItemUser = Parse.Object.extend('listas_compras_usuarios')
      const queryShopItemUser = new Parse.Query(ShopItemUser)
      queryShopItemUser.equalTo("usuario_id", "wXSqmG4vwM")
      const objShopItemUser = await queryShopItemUser.first();

      const ItemList = Parse.Object.extend('listas_compras_itens');
      const objItemList = new ItemList();
      objItemList.set('lista_compra_usuario_id', objShopItemUser)
      objItemList.set('quantidade', objItemInformation.quantity);
      objItemList.set('tipo_porcao', objItemInformation.portionType);
      objItemList.set('item_id', objItem);

      objItemList.save();

    } catch (error) {
      alert(
        `Não foi possível inserir um item na Lista de Compras ${JSON.stringify(error.message)}`,
      );
    }
  };

  updatePortionType = (intItemListId, strPortionType) => {
    try {
      const ShopItemUser = Parse.Object.extend('listas_compras_usuarios')
      const queryShopItemUser = new Parse.Query(ShopItemUser)
      queryShopItemUser.equalTo("usuario_id", "wXSqmG4vwM")

      const ShopItemList = Parse.Object.extend('listas_compras_itens');
      const queryShopItemList = new Parse.Query(ShopItemList);
      queryShopItemList.matchesQuery("lista_compra_usuario_id", queryShopItemUser);

      queryShopItemList.get(intItemListId).then((itemList) => {
        itemList.set('tipo_porcao', strPortionType);
        itemList.save().then(() => {
          this.loadShopList();
        });
      });
    } catch (error) {
      alert(
        `Não foi possível atualizar o tipo de porção do item ${JSON.stringify(error.message)}`
      );
    }
  };
  //
  //
  //
  // updateQuantity = (intItemId, intQuantity) => {
  //   try {
  //     const itemList = Parse.Object.extend('listas_compras_itens');
  //     const queryitemList = new Parse.Query(itemList);
  //
  //     queryitemList.get(intItemId).then((itemList) => {
  //       itemList.set('quantidade', parseInt(intQuantity));
  //       itemList.save().then(() => {
  //         this.loadShopList();
  //       });
  //     });
  //   } catch (error) {
  //     alert(
  //       `Não foi possível atualizar a quantidade do item ${JSON.stringify(error.message)}`
  //     );
  //   }
  // };

  deleteItem = async (objDeletedItem) => {
    try {
      const ShopItemUser = Parse.Object.extend('listas_compras_usuarios')
      const queryShopItemUser = new Parse.Query(ShopItemUser)
      queryShopItemUser.equalTo("usuario_id", "wXSqmG4vwM")

      const ShopItemList = Parse.Object.extend('listas_compras_itens');
      const queryShopItemList = new Parse.Query(ShopItemList);
      queryShopItemList.matchesQuery("lista_compra_usuario_id", queryShopItemUser);

      queryShopItemList.get(objDeletedItem.id).then((itemList) => {
        itemList.destroy().then(() => {
          this.loadShopList();
        });
      });
    } catch (error) {
      alert(`Não foi possível excluir o item ${JSON.stringify(error.message)}`);
    }
  };

  insertUserItem = async (objItemList) => {
    try {
      const ShopItemUser = Parse.Object.extend('listas_compras_usuarios')
      const queryShopItemUser = new Parse.Query(ShopItemUser)
      queryShopItemUser.equalTo("usuario_id", "wXSqmG4vwM")

      const ShopItemList = Parse.Object.extend('listas_compras_itens');
      const queryShopItemList = new Parse.Query(ShopItemList);
      queryShopItemList.matchesQuery("lista_compra_usuario_id", queryShopItemUser);

      queryShopItemList.get(objItemList.id).then((objShopItemList) => {
        objShopItemList.destroy().then(() => {
          const UserItem = Parse.Object.extend('itens_usuarios');
          const queryItemUser = new Parse.Query(UserItem);
          queryItemUser.equalTo("usuario_id", "wXSqmG4vwM");

          const Item = Parse.Object.extend('itens');
          const queryItem = new Parse.Query(Item);
          queryItem.equalTo('objectId', objShopItemList.get('item_id').id);
          queryItemUser.matchesQuery('item_id', queryItem);

          queryItemUser.first().then((itemUser) => {

            if (itemUser === []) {
              const itemUsuario = new UserItem();
                this.verifyPortionType(objItemList, itemUser);
                itemUsuario.set('quantidade', objItemList.get('quantidade'));
                itemUsuario.set('item_id', objItemList.get('item_id'));
                // itemUsuario.set("usuario_id", `${wXSqmG4vwM}`)
                itemUsuario.save();
            } else {
                this.verifyPortionType(objItemList, itemUser);
                itemUser.set('quantidade', itemUser.get('quantidade') + objItemList.get('quantidade'));
                itemUser.save();
            }
            this.loadShopList();
          });
        });
      });
    } catch (error) {
      alert(
        `Não foi possível confirmar a compra do item ${JSON.stringify(
          error.message,
        )}`,
      );
    }
  };

  async verifyPortionType(objItemList, objItemUser) {
    try {
      if (objItemList.get("tipo_porcao") !== objItemUser.get("tipo_porcao")) {
        Alert.alert(
          "Atenção",
          "A porção do item em estoque é diferente da porção do item que você está adicionado, gostaria de fazer a alteração?",
          [
            {
              text: "Não",
            },
            {
              text: "Sim",
              onPress: () => {
                const ItemUser = Parse.Object.extend('itens_usuarios');
                const queryItemUser = new Parse.Query(ItemUser);
                queryItemUser.equalTo("usuario_id", "wXSqmG4vwM");

                queryItemUser.get(objItemUser.id).then((itemUser) => {
                  itemUser.set('tipo_porcao', objItemList.get("tipo_porcao"));
                  itemUser.save();
                });
              }
            }
          ]
        );
      }
    } catch (e) {
      alert(
        `Não foi possível alterar a porçao do item ${JSON.stringify(error.message)}`);
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <LinearGradient
            colors={['#68CACA', '#fff']}
            end={{x: 0.1, y: 0.2}}
            style={styles.background}>
            <HeaderTitle>Bom dia</HeaderTitle>
            <AutoCompleteInput
              isToStock={false}
              addItem={this.addItem}
              refreshItemList={this.loadShopList}
            />
          </LinearGradient>
        </Header>

        <List
          arrItems={this.state.arrShopList}
          updateQuantity={this.updateQuantity}
          updatePortionType={this.updatePortionType}
          onDelete={this.deleteItem}
          listStyle={{flex: 5}}
          insertUserItem={this.insertUserItem}
          refreshItemList={this.loadShopList}/>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 5,
  },
  background: {
    width: '100%',
  },
});
