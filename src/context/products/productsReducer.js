import * as Constants from '../../shared/Constants';

export default (state, action) => {
  switch (action.type) {
    case 'getProducts': // move to constants
      return {
        ...state,
        productsRes: action.payload,
      };
    case 'addProduct':
      return {
        ...state,
        productsRes: [action.payload, ...state.productsRes],
      };
    case 'updateProduct':
      return {
        ...state,
        productsRes: state.productsRes.map(
          (product) =>
            product.id === action.payload.id ? action.payload : product // If it is the id switch it with action payload
        ),
      };
    case 'deleteProduct':
      return {
        ...state,
        productsRes: state.productsRes.filter(
          (product) => product.id !== action.payload
        ),
      };
    case 'clearProducts':
      return {
        ...state,
        productsRes: null,
        current: null,
        filtered: null,
      };

    case Constants.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case Constants.CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case 'filterProducts':
      return {
        ...state,
        filtered: state.productsRes.filter((product) => {
          const regex = new RegExp(`${action.payload}`, 'gi'); // gi is to remove case sensitivity
          return product.name.match(regex); // return anything that marches the regex
        }),
      };
    case Constants.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
