export const ItemReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_ITEMS":
      state.items = action.items;


      return {
        items: state.items,
        ...state,
      };


    default:
      return state;
  }
};
