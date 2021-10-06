import * as Constants from '../../shared/Constants';

export default (state, action) => {
  switch (action.type) {
    case Constants.GET_CATEGORIES:
      return {
        ...state,
        categoriesRes: action.payload,
      };
    default:
      return state;
  }
};
