import * as Constants from '../../shared/Constants';

export default (state, action) => {
  switch (action.type) {
    case Constants.GET_SUPPLIERS:
      return {
        ...state,
        supplierRes: action.payload,
      };
    case Constants.ADD_SUPPLIER:
      return {
        ...state,
        supplierRes: [action.payload, ...state.supplierRes],
      };
    case Constants.UPDATE_SUPPLIER:
      return {
        ...state,
        supplierRes: state.supplierRes.map(
          (supplier) =>
            supplier.id === action.payload.id ? action.payload : supplier // If it is the id switch it with action payload
        ),
      };
    case Constants.DELETE_SUPPLIER:
      return {
        ...state,
        supplierRes: state.supplierRes.filter(
          (supplier) => supplier.id !== action.payload
        ),
      };
    case Constants.CLEAR_SUPPLIERS:
      return {
        ...state,
        supplierRes: null,
        currentSupplier: null,
        filteredSuppliers: null,
      };
    case Constants.SET_CURRENT:
      return {
        ...state,
        currentSupplier: action.payload,
      };
    case Constants.CLEAR_CURRENT:
      return {
        ...state,
        currentSupplier: null,
      };
    case Constants.FILTER_SUPPLIERS:
      return {
        ...state,
        filteredSuppliers: state.supplierRes.filter((supplier) => {
          const regex = new RegExp(`${action.payload}`, 'gi'); // gi is to remove case sensitivity
          return supplier.companyName.match(regex); // return anything that marches the regex
        }),
      };
    case Constants.CLEAR_FILTER:
      return {
        ...state,
        filteredSuppliers: null,
      };
    default:
      return state;
  }
};
