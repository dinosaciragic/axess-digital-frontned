import React, { useState, useContext, useEffect } from 'react';
import ProductsContext from '../../../context/products/productsContext';

const AddProductsForm = () => {
  const productsContext = useContext(ProductsContext);

  const { addProduct, current, clearCurrent, updateProduct } = productsContext;

  return <div></div>;
};

export default AddProductsForm;
