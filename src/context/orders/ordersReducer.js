import * as Constants from '../../shared/Constants';

export default (state, action) => {
  switch (action.type) {
    case Constants.GET_ORDERS:
      return {
        ...state,
        ordersRes: action.payload,
      };
    case Constants.ADD_ORDER:
      return {
        ...state,
        ordersRes: [action.payload, ...state.ordersRes],
      };
    case Constants.UPDATE_ORDER:
      return {
        ...state,
        ordersRes: state.ordersRes.map(
          (order) => (order.id === action.payload.id ? action.payload : order) // If it is the id switch it with action payload
        ),
      };
    case Constants.DELETE_ORDER:
      return {
        ...state,
        ordersRes: state.ordersRes.filter(
          (order) => order.id !== action.payload
        ),
      };
    case Constants.CLEAR_ORDERS:
      return {
        ...state,
        ordersRes: null,
        currentOrder: null,
        filteredOrders: null,
      };

    case Constants.SET_CURRENT:
      return {
        ...state,
        currentOrder: action.payload,
      };
    case Constants.CLEAR_CURRENT:
      return {
        ...state,
        currentOrder: null,
      };
    case Constants.FILTER_ORDERS:
      return {
        ...state,
        filteredOrders: state.ordersRes.filter((order) => {
          const regex = new RegExp(`${action.payload}`, 'gi'); // gi is to remove case sensitivity
          return order.shipName.match(regex); // return anything that marches the regex
        }),
      };
    case Constants.CLEAR_FILTER:
      return {
        ...state,
        filteredOrders: null,
      };
    default:
      return state;
  }
};
