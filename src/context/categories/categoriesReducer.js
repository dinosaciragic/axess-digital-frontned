export default (state, action) => {
  switch (action.type) {
    case 'getCategories': // move to constants
      return {
        ...state,
        categoriesRes: action.payload,
      };
    default:
      return state;
  }
};
