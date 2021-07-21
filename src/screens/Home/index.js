import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import 'moment/locale/pt-br';
import {LinearGradient} from 'expo-linear-gradient';

import {Container, Header, HeaderTitle, LogoutButton} from './style';

import {ShopList} from '../../components/ShopList';
import {AutoCompleteInput} from '../../components/AutoCompleteInput';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ShopListContext} from '../../contexts/ShopList/ShopListContext';
import {UserContext} from '../../../../../Salooni_Project/salooni_react/salooni/src/contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {convertFromAsyncStorage} from '../../services/conversor';

const Home = () => {
  const {loadShopList} = useContext(ShopListContext);
  const {doLogout} = useContext(UserContext);
  const {currentUser, shopListUser} = useContext(UserContext);

  const navigate = useNavigation();

  const {setCurrentUser} = useContext(UserContext);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await AsyncStorage.getItem('currentUser');

      if (user) {
        const fixedUser = convertFromAsyncStorage(user);
        setCurrentUser(fixedUser);
        loadShopList(fixedUser.shopListUser.objectId);
        navigate.navigate('MainTab');
      } else {
        navigate.navigate('LoginStack');
      }
    };

    getCurrentUser();
  }, []);

  // const setList(purchaseItems)  = () =>{
  //   this.setState({arrShopList: purchaseItems});
  // }
  //
  //

  //
  // updatePortionType = (intItemListId, strPortionType) => {
  //   try {
  //     const ShopItemUser = Parse.Object.extend('listas_compras_usuarios');
  //     const queryShopItemUser = new Parse.Query(ShopItemUser);
  //     queryShopItemUser.equalTo('usuario_id', 'wXSqmG4vwM');
  //
  //     const ShopItemList = Parse.Object.extend('listas_compras_itens');
  //     const queryShopItemList = new Parse.Query(ShopItemList);
  //     queryShopItemList.matchesQuery(
  //       'lista_compra_usuario_id',
  //       queryShopItemUser,
  //     );
  //
  //     queryShopItemList.get(intItemListId).then((itemList) => {
  //       itemList.set('tipo_porcao', strPortionType);
  //       itemList.save().then(() => {
  //         this.loadShopList();
  //       });
  //     });
  //   } catch (error) {
  //     alert(
  //       `Não foi possível atualizar o tipo de porção do item ${JSON.stringify(
  //         error.message,
  //       )}`,
  //     );
  //   }
  // };
  //
  //
  //

  //
  // insertUserItem = async (objItemList) => {
  //   try {
  //     const ShopItemUser = Parse.Object.extend('listas_compras_usuarios');
  //     const queryShopItemUser = new Parse.Query(ShopItemUser);
  //     queryShopItemUser.equalTo('usuario_id', 'wXSqmG4vwM');
  //
  //     const ShopItemList = Parse.Object.extend('listas_compras_itens');
  //     const queryShopItemList = new Parse.Query(ShopItemList);
  //     queryShopItemList.matchesQuery(
  //       'lista_compra_usuario_id',
  //       queryShopItemUser,
  //     );
  //
  //     queryShopItemList.get(objItemList.id).then((objShopItemList) => {
  //       objShopItemList.destroy().then(() => {
  //         const UserItem = Parse.Object.extend('itens_usuarios');
  //         const queryItemUser = new Parse.Query(UserItem);
  //         queryItemUser.equalTo('usuario_id', 'wXSqmG4vwM');
  //
  //         const Item = Parse.Object.extend('itens');
  //         const queryItem = new Parse.Query(Item);
  //         queryItem.equalTo('objectId', objShopItemList.get('item_id').id);
  //         queryItemUser.matchesQuery('item_id', queryItem);
  //
  //         queryItemUser.first().then((itemUser) => {
  //           if (itemUser === []) {
  //             const itemUsuario = new UserItem();
  //             this.verifyPortionType(objItemList, itemUser);
  //             itemUsuario.set('quantidade', objItemList.get('quantidade'));
  //             itemUsuario.set('item_id', objItemList.get('item_id'));
  //             // itemUsuario.set("usuario_id", `${wXSqmG4vwM}`)
  //             itemUsuario.save();
  //           } else {
  //             this.verifyPortionType(objItemList, itemUser);
  //             itemUser.set(
  //               'quantidade',
  //               itemUser.get('quantidade') + objItemList.get('quantidade'),
  //             );
  //             itemUser.save();
  //           }
  //           this.loadShopList();
  //         });
  //       });
  //     });
  //   } catch (error) {
  //     alert(
  //       `Não foi possível confirmar a compra do item ${JSON.stringify(
  //         error.message,
  //       )}`,
  //     );
  //   }
  // };
  //
  // async verifyPortionType(objItemList, objItemUser) {
  //   try {
  //     if (objItemList.get('tipo_porcao') !== objItemUser.get('tipo_porcao')) {
  //       Alert.alert(
  //         'Atenção',
  //         'A porção do item em estoque é diferente da porção do item que você está adicionado, gostaria de fazer a alteração?',
  //         [
  //           {
  //             text: 'Não',
  //           },
  //           {
  //             text: 'Sim',
  //             onPress: () => {
  //               const ItemUser = Parse.Object.extend('itens_usuarios');
  //               const queryItemUser = new Parse.Query(ItemUser);
  //               queryItemUser.equalTo('usuario_id', 'wXSqmG4vwM');
  //
  //               queryItemUser.get(objItemUser.id).then((itemUser) => {
  //                 itemUser.set('tipo_porcao', objItemList.get('tipo_porcao'));
  //                 itemUser.save();
  //               });
  //             },
  //           },
  //         ],
  //       );
  //     }
  //   } catch (e) {
  //     alert(
  //       `Não foi possível alterar a porçao do item ${JSON.stringify(
  //         error.message,
  //       )}`,
  //     );
  //   }
  // }
  //

  return (
    <Container>
      <Header>
        <LinearGradient
          colors={['#68CACA', '#fff']}
          end={{x: 0.1, y: 0.2}}
          style={styles.background}>
          <HeaderTitle>Bom dia</HeaderTitle>
        </LinearGradient>
        <LogoutButton
          onPress={() => {
            doLogout();
            navigate.navigate('LoginStack');
          }}>
          <Icon name={'sign-out-alt'} size={20} color={'#4ABFBF'} />
        </LogoutButton>
      </Header>
      <AutoCompleteInput isFromStock={false} refreshItemList={loadShopList} />
      <ShopList
        listStyle={{flex: 5}}
        // insertUserItem={this.insertUserItem}
      />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  list: {
    flex: 5,
  },
  background: {
    width: '50%',
  },
});
