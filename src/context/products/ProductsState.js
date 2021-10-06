import React, { useReducer } from 'react';
import axios from 'axios';
import productsReducer from './productsReducer';
import ProductsContext from './productsContext';
import * as Constants from '../../shared/Constants';

const ProductsState = (props) => {
  const productsApi = Constants.API_LINK + 'products/';

  const initialState = {
    productsRes: null, // all products
    current: null, // current product being edited
    filtered: null, // filtered products in search
  };

  // Config fot POST and PUT requests
  const config = {
    headers: {
      'Content-Type': 'application/json ',
    },
  };

  const [state, dispatch] = useReducer(productsReducer, initialState);

  // Get Products
  const getProducts = async () => {
    try {
      let res = await axios.get(productsApi);

      dispatch({
        type: 'getProducts',
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Get Product by id
  const getProductById = async (id) => {
    try {
      let res = await axios.get(productsApi + id);

      if (res.data) {
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add Product
  const addProduct = async (product) => {
    try {
      const res = await axios.post(productsApi, product, config);

      dispatch({
        type: 'addProduct',
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(productsApi + id);

      dispatch({
        type: 'deleteProduct',
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Update Product
  const updateProduct = async (product) => {
    try {
      const res = await axios.put(productsApi + product.id, product, config);

      dispatch({
        type: 'updateProduct',
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Clear Products
  const clearProducts = () => {
    dispatch({ type: 'clearProducts' });
  };

  // Set Current Product
  const setCurrent = (product) => {
    dispatch({ type: 'setCurrent', payload: product });
  };

  // Clear Current Product
  const clearCurrent = () => {
    dispatch({ type: 'clearCurrent' });
  };

  // Filter Products
  const filterProducts = (text) => {
    dispatch({ type: 'filterProducts', payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: 'clearFilter' });
  };

  return (
    <ProductsContext.Provider
      value={{
        productsRes: state.productsRes,
        current: state.current,
        filtered: state.filtered,
        getProducts,
        addProduct,
        deleteProduct,
        updateProduct,
        clearProducts,
        setCurrent,
        clearCurrent,
        filterProducts,
        clearFilter,
        getProductById,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsState;
