import * as Constants from '../../shared/Constants';

export default (state, action) => {
  switch (action.type) {
    case Constants.GET_SUPPLIERS:
      return {
        ...state,
        supplierRes: action.payload,
      };
    default:
      return state;
  }
};
