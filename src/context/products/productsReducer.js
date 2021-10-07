import * as Constants from '../../shared/Constants';

export default (state, action) => {
  switch (action.type) {
    case Constants.GET_PRODUCTS:
      return {
        ...state,
        productsRes: action.payload,
      };
    case Constants.ADD_PRODUCT:
      return {
        ...state,
        productsRes: [action.payload, ...state.productsRes],
      };
    case Constants.UPDATE_PRODUCT:
      return {
        ...state,
        productsRes: state.productsRes.map(
          (product) =>
            product.id === action.payload.id ? action.payload : product // If it is the id switch it with action payload
        ),
      };
    case Constants.DELETE_PRODUCT:
      return {
        ...state,
        productsRes: state.productsRes.filter(
          (product) => product.id !== action.payload
        ),
      };
    case Constants.CLEAR_PRODUCTS:
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
    case Constants.FILTER_PRODUCTS:
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
