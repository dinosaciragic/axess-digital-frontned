import React, { useContext, useEffect } from 'react';
import ProductsContext from '../../context/products/productsContext';

const Products = () => {
  const productsContext = useContext(ProductsContext);

  const { getProducts } = productsContext;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  return <div>Welcome to Products</div>;
};

export default Products;
