import React, { useContext, useRef, useEffect } from 'react';
import SuppliersContext from '../../../context/suppliers/suppliersContext';

const SuppliersFilter = () => {
  const suppliersContext = useContext(SuppliersContext);
  const text = useRef('');

  const { filterSuppliers, clearFilter, filteredSuppliers } = suppliersContext;

  useEffect(() => {
    if (filteredSuppliers === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterSuppliers(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Suppliers...'
        onChange={onChange}
      />
    </form>
  );
};

export default SuppliersFilter;
