export default (state, action) => {
  switch (action.type) {
    case 'getProducts': // move to constants
      return {
        ...state,
        productsRes: action.payload,
      };

    default:
      return state;
  }
};
