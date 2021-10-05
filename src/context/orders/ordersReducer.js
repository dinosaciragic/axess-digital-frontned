export default (state, action) => {
  switch (action.type) {
    case 'getOrders': // move to constants
      return {
        ...state,
        ordersRes: action.payload,
      };
    case 'addOrder':
      return {
        ...state,
        ordersRes: [action.payload, ...state.ordersRes],
      };
    case 'updateOrder':
      return {
        ...state,
        ordersRes: state.ordersRes.map(
          (order) => (order.id === action.payload.id ? action.payload : order) // If it is the id switch it with action payload
        ),
      };
    case 'deleteOrder':
      return {
        ...state,
        ordersRes: state.ordersRes.filter(
          (order) => order.id !== action.payload
        ),
      };
    case 'clearOrders':
      return {
        ...state,
        ordersRes: null,
        currentOrder: null,
        filteredOrders: null,
      };

    case 'setCurrent':
      return {
        ...state,
        currentOrder: action.payload,
      };
    case 'clearCurrent':
      return {
        ...state,
        currentOrder: null,
      };
    case 'filterOrders':
      return {
        ...state,
        filteredOrders: state.ordersRes.filter((order) => {
          const regex = new RegExp(`${action.payload}`, 'gi'); // gi is to remove case sensitivity
          return order.shipName.match(regex); // return anything that marches the regex
        }),
      };
    case 'clearFilter':
      return {
        ...state,
        filteredOrders: null,
      };
    default:
      return state;
  }
};
