import React, { createContext, useReducer } from "react";
import { ItemReducer } from "./ItemReducer";
import { getItems } from "../../service/Item";

export const ItemContext = createContext();

const initialState = {
  items: [],
  filteredItems: [],

};

const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ItemReducer, initialState);

  const loadItem = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await getItems(false).then((items) => {
          dispatch({ type: "LOAD_ITEMS", items });
          resolve("Deucerto");
        });
      } catch (e) {
        reject(`Deu ruim ao listar itens ${e}`);
      }
    });
  };

  const handleItem = (payload) => {
    dispatch({ type: "HANDLE_ITEM", payload });

  };


  const contextValues = {
    loadItem,
    handleItem,
    ...state,
  };

  return (
    <ItemContext.Provider value={contextValues}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
