import React, { useReducer } from 'react';
import axios from 'axios';
import categoriesReducer from './categoriesReducer';
import CategoriesContext from './categoriesContext';
import * as Constants from '../../shared/Constants';

const CategoriesState = (props) => {
  const categoriesApi = Constants.API_LINK + 'categories/';
  const initialState = {
    categoriesRes: null,
  };

  const [state, dispatch] = useReducer(categoriesReducer, initialState);

  // Get Categories
  const getCategories = async () => {
    try {
      let res = await axios.get(categoriesApi);

      dispatch({
        type: 'getCategories',
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Get Categpry by id
  const getCategoryById = async (id) => {
    try {
      let res = await axios.get(categoriesApi + id);

      if (res.data) {
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categoriesRes: state.categoriesRes,
        getCategories,
        getCategoryById,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesState;
