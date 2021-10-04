import React, { useReducer } from 'react';
import axios from 'axios';
import productsReducer from './productsReducer';
import ProductsContext from './productsContext';

const ProductsState = (props) => {
  const initialState = {
    productsRes: null,
  };

  const [state, dispatch] = useReducer(productsReducer, initialState);

  // Get Products
  const getProducts = async () => {
    try {
      let res = await axios.get('/api/products');

      dispatch({
        type: 'getProducts',
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        productsRes: state.productsRes,
        getProducts,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsState;
