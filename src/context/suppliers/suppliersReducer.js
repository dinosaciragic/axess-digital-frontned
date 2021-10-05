export default (state, action) => {
  switch (action.type) {
    case 'getSuppliers': // move to constants
      return {
        ...state,
        supplierRes: action.payload,
      };
    default:
      return state;
  }
};
