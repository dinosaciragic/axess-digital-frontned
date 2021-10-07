import React, { useContext, useRef, useEffect } from 'react';
import ProductsContext from '../../../context/products/productsContext';

const ProductsFilter = () => {
  const productsContext = useContext(ProductsContext);
  const text = useRef('');

  const { filterProducts, clearFilter, filtered } = productsContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  /**
   * Triggered when user is typing and calles filter function
   * if the saerch is empty then clearFilter is called
   * @param e event
   */
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterProducts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Products...'
        onChange={onChange}
      />
    </form>
  );
};

export default ProductsFilter;
