import React, { useReducer } from 'react';
import axios from 'axios';
import categoriesReducer from './categoriesReducer';
import CategoriesContext from './categoriesContext';

const CategoriesState = (props) => {
  const initialState = {
    categoriesRes: null,
  };

  const [state, dispatch] = useReducer(categoriesReducer, initialState);

  // Get Categories
  const getCategories = async () => {
    try {
      let res = await axios.get('/api/categories');

      dispatch({
        type: 'getCategories',
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categoriesRes: state.categoriesRes,
        getCategories,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesState;
