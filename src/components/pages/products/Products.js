import React, { Fragment, useContext, useEffect } from 'react';
import ProductsContext from '../../../context/products/productsContext';
import ProductItem from './ProductItem';

const Products = () => {
  const productsContext = useContext(ProductsContext);

  const { getProducts, productsRes } = productsContext;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Fragment>
        {productsRes ? (
          productsRes.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <div>Please wait...</div>
        )}
      </Fragment>
    </div>
  );
};

export default Products;
