import React, { useState, useContext, useEffect } from 'react';
import ProductsContext from '../../../context/products/productsContext';
import SuppliersContext from '../../../context/suppliers/suppliersContext';
import CategoriesContext from '../../../context/categories/categoriesContext';

const AddProductsForm = () => {
  const productsContext = useContext(ProductsContext);
  const suppliersContext = useContext(SuppliersContext);
  const categoriesContext = useContext(CategoriesContext);

  const { addProduct, current, clearCurrent, updateProduct } = productsContext;
  const { getSuppliers, supplierRes } = suppliersContext;
  const { getCategories, categoriesRes } = categoriesContext;

  useEffect(() => {
    getSuppliers();
    getCategories();

    console.log('categories', categoriesRes);

    if (current) {
      setProduct(current);
    } else {
      setProduct({
        supplierId: 0,
        categoryId: 0,
        quantityPerUnit: '',
        unitPrice: 0,
        unitsInStock: 0,
        unitsOnOrder: 0,
        reorderLevel: 0,
        discontinued: 'false',
        name: '',
      });
    }
  }, [productsContext, current]);

  const [product, setProduct] = useState({
    supplierId: 0,
    categoryId: 0,
    quantityPerUnit: '',
    unitPrice: 0,
    unitsInStock: 0,
    unitsOnOrder: 0,
    reorderLevel: 0,
    discontinued: 'false',
    name: '',
  });

  const {
    name,
    quantityPerUnit,
    supplierId,
    categoryId,
    unitPrice,
    unitsInStock,
    unitsOnOrder,
    reorderLevel,
    discontinued,
  } = product || {};

  /* example of form but without validation */
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null || current === undefined) {
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
      <label className='text-primary'>
        Name
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={onChange}
          required
        />
      </label>
      {/* quantityPerUnit */}
      <label className='text-primary'>
        Quantity Per Unit
        <input
          type='text'
          placeholder='Quantity Per Unit'
          name='quantityPerUnit'
          value={quantityPerUnit}
          onChange={onChange}
          required
        />
      </label>
      {/* Supplier select menu */}
      {supplierRes && (
        <label className='text-primary'>
          Select Supplier
          <select value={supplierId} name='supplierId' onChange={onChange}>
            {supplierRes.map((supplier) => {
              return (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.companyName}
                </option>
              );
            })}
          </select>
        </label>
      )}
      {/* Categories select menu */}
      {categoriesRes && (
        <label className='text-primary'>
          Select Category
          <select value={categoryId} name='categoryId' onChange={onChange}>
            {categoriesRes.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </label>
      )}
      {/* unitPrice */}
      <label className='text-primary'>
        Unit price
        <input
          type='number'
          placeholder='Unit price'
          name='unitPrice'
          value={unitPrice}
          onChange={onChange}
          required
        />
      </label>
      {/* unitsInStock */}
      <label className='text-primary'>
        Units in stock
        <input
          type='number'
          placeholder='Units in stock'
          name='unitsInStock'
          value={unitsInStock}
          onChange={onChange}
          required
        />
      </label>
      {/* unitsOnOrder */}
      <label className='text-primary'>
        Units in Order
        <input
          type='number'
          placeholder='Units in Order'
          name='unitsOnOrder'
          value={unitsOnOrder}
          onChange={onChange}
          required
        />
      </label>
      {/* reorderLevel */}
      <label className='text-primary'>
        Recorder Level
        <input
          type='number'
          placeholder='Recorder Level'
          name='reorderLevel'
          value={reorderLevel}
          onChange={onChange}
          required
        />
      </label>
      {/* discontinued radio buttons */}
      <label className='text-primary'>Discontinued</label> <br />
      <input
        type='radio'
        name='discontinued'
        value='true'
        checked={discontinued === 'true'}
        onChange={onChange}
      />{' '}
      Discontinued{' '}
      <input
        type='radio'
        name='discontinued'
        value='false'
        checked={discontinued === 'false'}
        onChange={onChange}
      />{' '}
      Not Discontinued
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
