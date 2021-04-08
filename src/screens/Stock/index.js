import React, {Component} from 'react'
import {Text, View, RefreshControl} from 'react-native'
import {
    Container,
    HeaderContainer,
    Header,
    HeaderTitle,
    NotificationButton,
    InputContainer } from './style';

import Parse from "parse/react-native.js";


import List from '../../components/List'
import AutoCompleteInput from '../../components/AutoCompleteInput'
import NotificationsModal from '../../components/Modals/NotificationsModal'

import dataTeste from '../../dataTeste'

import Icon from 'react-native-vector-icons/FontAwesome'


const initialState = {
    isShowingNotificationModal: false,
    arrStockItems : [],
    refresh: false
}

let showNotificationModal = false;

export default class Stock extends Component {
    state = {
        ...initialState
     }

     async componentDidMount() {
        await this.loadStockItems();
    }


  setStockItems(arrStockItems) {
      this.setState({arrStockItems: arrStockItems})
  }

  loadStockItems = async ()  =>  {
            try {
                const UserItem = Parse.Object.extend("itens_usuarios")
                const queryItemUser = new Parse.Query(UserItem)
                queryItemUser.equalTo("usuario_id", "wXSqmG4vwM");
                queryItemUser.include("item_id")
                queryItemUser.include(["item_id.categoria_id"])
                queryItemUser.ascending("item_id")

                const userItems = await queryItemUser.find();

                const Category = Parse.Object.extend("categorias")
                const queryCategory = new Parse.Query(Category)

                let arrCategories = [];
                for(let i = 0; i < userItems.length; i++) {

                    const intCategoryId = userItems[i].get("item_id").get("categoria_id").id;
                    queryCategory.equalTo("objectId",  userItems[i].get("item_id").get("categoria_id").id)
                    const objCategory = await queryCategory.first();

                    const objDuplicatedCategory = arrCategories.find(cat => cat.id === intCategoryId)

                    if(objDuplicatedCategory === undefined) {
                        arrCategories.push(objCategory)
                    }
                }

                arrCategories.forEach(category => {
                    category.set("itens", [])
                    category.save();
                    userItems.forEach(iu => {
                        if(category.id === iu.get("item_id").get("categoria_id").id) {
                            category.get("itens").push(iu)
                        }
                    })

                })


                this.setState({arrStockItems: arrCategories})


            } catch (error) {
                alert(`Não foi possível caregar os itens do estoque ${JSON.stringify(error.message)}`)
            }

    }

    updatePortionType = (intItemUserId, strPortionType) => {
      try {
        const ItemUser = Parse.Object.extend('itens_usuarios');
        const queryItemUser = new Parse.Query(ItemUser);
        queryItemUser.equalTo("usuario_id", "wXSqmG4vwM");
        queryItemUser.get(intItemUserId).then((itemUser) => {
          itemUser.set('tipo_porcao', strPortionType);
          itemUser.save().then(() => {
            this.loadStockItems();
          });
        });
      } catch (error) {
        alert(
          `Não foi possível atualizar o tipo de porção do item ${JSON.stringify(error.message)}`
        );
      }
    };

    updateQuantity = async (intItemUserId, intQuantity) => {
        try {
           const UserItem = Parse.Object.extend("itens_usuarios")
           const queryItemUser= new Parse.Query(UserItem)
           queryItemUser.equalTo("usuario_id", "wXSqmG4vwM");
           queryItemUser.get(intItemUserId).then((userItem) => {
            userItem.set("quantidade", intQuantity)
            userItem.save().then((response) => {
                   this.loadStockItems();
               });
           })

       } catch (error) {
           alert(`Não foi possível mudar a quantidade do item ${JSON.stringify(error.message)}`)

       }
   }


    addItem = async (objItem, objItemInformation)  =>  {
        try {
          const User = Parse.Object.extend("usuarios")
          const queryUser = new Parse.Query(User)
          queryUser.equalTo('objectId', `wXSqmG4vwM` )
          const objUser = await queryUser.first();

          const UserItem = Parse.Object.extend("itens_usuarios")
          const userItem = new UserItem();
          userItem.set('quantidade', objItemInformation.quantity);
          userItem.set('tipo_porcao', objItemInformation.portionType);
          userItem.set('item_id', objItem);
          userItem.set("usuario_id", objUser)
          userItem.save();
        } catch (error) {
            alert(`Não foi possível adicionar o item ao estoque ${JSON.stringify(error.message)}`)

        }
    }

    deleteItem = async (intItemId) => {
        try {
            const UserItem = Parse.Object.extend("itens_usuarios")
            const queryItemUser = new Parse.Query(UserItem)
            queryItemUser.equalTo("usuario_id", "wXSqmG4vwM");
            queryItemUser.get(intItemId).then((userItem) => {
                userItem.destroy().then(() => {
                    this.loadStockItems();
                });
            })
        } catch (error) {
            alert(`Não foi possível excluir o item do seu estoque ${JSON.stringify(error.message)}`)
        }
   }

   showModal = () => {
    this.setState({isShowingNotificationModal: true})
   }

   closeModal() {
    this.setState({isShowingNotificationModal: false})
   }

    render() {
      return (

        <Container>
          <HeaderContainer>
            <AutoCompleteInput
              isToStock={true}
              addItem={this.addItem}
              refreshItemList={this.loadStockItems} />
          </HeaderContainer>
          <List
            arrItems={this.state.arrStockItems}
            updateQuantity={this.updateQuantity}
            updatePortionType={this.updatePortionType}
            onDelete={this.deleteItem}
            listStyle={{ flex: 3 }}
            refreshItemList={this.loadStockItems}
          />
        </Container>
      );
    };
}
