import React, { Fragment, useContext, useEffect } from 'react';
import ProductsContext from '../../../context/products/productsContext';
import ProductItem from './ProductItem';
import AddProductsForm from './AddProductsForm';
import ProductsFilter from './ProductsFilter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Products = () => {
  const productsContext = useContext(ProductsContext);

  const { getProducts, productsRes, filtered } = productsContext;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='two-block-container'>
      <div className='two-block'>
        <AddProductsForm />
      </div>

      <div className='two-block'>
        <ProductsFilter />

        <Fragment>
          {/* start here */}
          {productsRes !== null ? (
            <TransitionGroup>
              {filtered !== null
                ? filtered.map((product) => (
                    <CSSTransition
                      key={product.id}
                      timeout={1000}
                      classNames='item'
                    >
                      <ProductItem product={product} />
                    </CSSTransition>
                  ))
                : productsRes.map((product) => (
                    <CSSTransition
                      key={product.id}
                      timeout={1000}
                      classNames='item'
                    >
                      <ProductItem product={product} />
                    </CSSTransition>
                  ))}
            </TransitionGroup>
          ) : (
            <div>Please wait...</div>
          )}
        </Fragment>
      </div>
    </div>
  );
};

export default Products;
