import Parse from "parse/react-native";
import { convertParseItemList } from "../factory/item";


const ItemObject = Parse.Object.extend("itens");


const getItems = (returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryItem = new Parse.Query(ItemObject);
      queryItem.include("marca_id");

      resolve(returnParseObject ? await queryItem.find() : convertParseItemList(await queryItem.find()));
    } catch (error) {
      reject(
        `Items: ${JSON.stringify(
          error.message,
        )}`,
      );
    }
  });
};

export {
  getItems,
};
