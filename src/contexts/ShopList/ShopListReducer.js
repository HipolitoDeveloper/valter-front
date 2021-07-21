import Parse from 'parse/react-native';
import {convertToObj} from '../../services/conversor';

export const createShopListObj = async (shopListUserId) => {
  return new Promise(async (resolve) => {
    const ShopListItem = Parse.Object.extend('listas_compras_itens');
    const queryShopListItem = new Parse.Query(ShopListItem);

    queryShopListItem.equalTo('lista_compra_usuario_id', shopListUserId);
    queryShopListItem.include(['item_id.categoria_id']);
    queryShopListItem.include(['item_id.marca_id']);
    queryShopListItem.include(['item_id']);
    queryShopListItem.ascending('item_id');

    const arrShopListItem = convertToObj(await queryShopListItem.find());

    const Category = Parse.Object.extend('categorias');
    const queryCategory = new Parse.Query(Category);

    let arrCategories = [];

    for (let i = 0; i < arrShopListItem.length; i++) {
      const intCategoryId = arrShopListItem[i].item_id.categoria_id.objectId;
      queryCategory.equalTo('objectId', intCategoryId);
      const objCategoria = convertToObj(await queryCategory.first());

      const isCategoryDuplicated = arrCategories.find(
        (cat) => cat.objectId === intCategoryId,
      );

      if (isCategoryDuplicated === undefined) {
        arrCategories.push(objCategoria);
      }
    }

    const newArrCategories = arrCategories.map((category) => {
      category.itens = [];
      arrShopListItem.forEach((itens) => {
        if (category.objectId === itens.item_id.categoria_id.objectId)
          category.itens.push(itens);
      });
      return category;
    });
    resolve(newArrCategories);
  });
};

const getShopListItemById = (shopListItemId) => {
  return new Promise(async (resolve) => {
    const ShopListItem = Parse.Object.extend('listas_compras_itens');
    const queryShopListItem = new Parse.Query(ShopListItem);
    resolve(await queryShopListItem.get(shopListItemId));
  });
};

export const ShopListReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SHOPLIST':
      state.shoplist = action.shoplist;
      return {
        shoplist: action.shoplist,
        ...state,
      };
    case 'UPDATE_ITEM':
      try {
        const {shopListItemToUpdate} = action.payload;

        getShopListItemById(shopListItemToUpdate.objectId).then((item) => {
          item.set('quantidade', parseInt(shopListItemToUpdate.quantidade));
          item.set('tipo_porcao', shopListItemToUpdate.tipo_porcao);
          item.save();
        });
      } catch (error) {
        alert(
          `Não foi possível atualizar a quantidade do item ${JSON.stringify(
            error.message,
          )}`,
        );
      }

      return {
        shoplist: action.shoplist,
        ...state,
      };
    case 'DELETE_ITEM':
      const {shopListItemToDelete} = action.payload;

      getShopListItemById(shopListItemToDelete.objectId).then((item) => {
        item.destroy();
      });
    case 'INSERT_ITEM':
      const {shopListItemToInsert} = action.payload;

    //
    //   const ItemList = Parse.Object.extend('listas_compras_itens');
    //   const objItemList = new ItemList();
    //   objItemList.set('lista_compra_usuario_id', objShopItemUser);
    //   objItemList.set('quantidade', objItemInformation.quantity);
    //   objItemList.set('tipo_porcao', objItemInformation.portionType);
    //   objItemList.set('item_id', objItem);
    //
    //   objItemList.save();
    case 'CLEAR_ALL':
      return {
        transactions: [],
      };
    default:
      return state;
  }
};
