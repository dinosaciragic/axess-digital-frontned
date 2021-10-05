import React, { useState, useContext, useEffect } from 'react';
import ProductsContext from '../../../context/products/productsContext';

const AddProductsForm = () => {
  const productsContext = useContext(ProductsContext);

  const { addProduct, current, clearCurrent, updateProduct } = productsContext;

  useEffect(() => {
    console.log('in here', current);
    if (current) {
      setProduct(current);
    } else {
      setProduct({
        supplierId: 0,
        categoryId: 0,
        quantityPerUnit: '',
        unitPrice: '',
        unitsInStock: '',
        unitsOnOrder: '',
        reorderLevel: '',
        discontinued: false,
        name: '',
      });
    }
  }, [productsContext, current]);

  const [product, setProduct] = useState({
    supplierId: 0,
    categoryId: 0,
    quantityPerUnit: '',
    unitPrice: '',
    unitsInStock: '',
    unitsOnOrder: '',
    reorderLevel: '',
    discontinued: false,
    name: '',
  });

  const {
    name,
    quantityPerUnit,
    unitPrice,
    unitsInStock,
    unitsOnOrder,
    reorderLevel,
  } = product || {};

  /* example of form but without validation */
  const onChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addProduct(product);
    } else {
      updateProduct(product);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Product' : 'Add Product'}
      </h2>
      {/* Name */}
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      {/* quantityPerUnit */}
      <input
        type='text'
        placeholder='Quantity Per Unit'
        name='quantityPerUnit'
        value={quantityPerUnit}
        onChange={onChange}
      />
      {/* unitPrice */}
      <input
        type='number'
        placeholder='Unit price'
        name='unitPrice'
        value={unitPrice}
        onChange={onChange}
      />
      {/* unitsInStock */}
      <input
        type='number'
        placeholder='Units in stock'
        name='unitsInStock'
        value={unitsInStock}
        onChange={onChange}
      />
      {/* unitsOnOrder */}
      <input
        type='number'
        placeholder='Units in Order'
        name='unitsOnOrder'
        value={unitsOnOrder}
        onChange={onChange}
      />
      {/* reorderLevel */}
      <input
        type='number'
        placeholder='Recorder Level'
        name='reorderLevel'
        value={reorderLevel}
        onChange={onChange}
      />
      {/* Submit button */}
      <div>
        <input
          type='submit'
          value={current ? 'Update Product' : 'Add Product'}
          className='btn btn-primary btn-block'
        />
      </div>
      {/* Clear button */}
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default AddProductsForm;
