import { convertToObj } from "./common";

export const convertParseItemList = (itemsParseObject) => {
  const items = convertToObj(itemsParseObject);
  let newItemList = [];
  newItemList = items.map(item => {
    return {
      id: item.objectId,
      portion: "unidade",
      category: item.categoria_id,
      description: item.descricao,
      isChose: false,
      dt_validity: item.data_validade,
      brand: item.marca_id,
      quantity: 0
    };
  });

  return newItemList


};
