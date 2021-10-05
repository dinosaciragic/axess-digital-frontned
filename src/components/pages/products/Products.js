import React, { Fragment, useContext, useEffect } from 'react';
import ProductsContext from '../../../context/products/productsContext';
import ProductItem from './ProductItem';
import AddProductsForm from './AddProductsForm';

const Products = () => {
  const productsContext = useContext(ProductsContext);

  const { getProducts, productsRes } = productsContext;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ flex: '0 0 50%', padding: '10px' }}>
        <AddProductsForm />
      </div>

      <div style={{ flex: '0 0 50%', padding: '10px' }}>
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
    </div>
  );
};

export default Products;
