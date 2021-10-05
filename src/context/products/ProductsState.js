import React, { useReducer } from 'react';
import axios from 'axios';
import productsReducer from './productsReducer';
import ProductsContext from './productsContext';

const ProductsState = (props) => {
  const initialState = {
    productsRes: null,
    current: null,
    filtered: null,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json ',
    },
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

  // Add Product
  const addProduct = async (product) => {
    try {
      const res = await axios.post('/api/products', product, config);

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
      await axios.delete('/api/products/' + id);

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
      const res = await axios.put(
        '/api/products/' + product.id,
        product,
        config
      );

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
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsState;
