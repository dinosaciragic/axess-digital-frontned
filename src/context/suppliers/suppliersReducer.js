export default (state, action) => {
  switch (action.type) {
    case 'supplier': // move to constants
      return {
        ...state,
        supplier: action.payload,
      };

    default:
      return state;
  }
};
