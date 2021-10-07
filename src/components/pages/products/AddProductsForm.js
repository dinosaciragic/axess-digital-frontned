import React, { useState, useContext, useEffect } from 'react';
import ProductsContext from '../../../context/products/productsContext';
import SuppliersContext from '../../../context/suppliers/suppliersContext';
import CategoriesContext from '../../../context/categories/categoriesContext';

const AddProductsForm = () => {
  // Declaring contexts
  const productsContext = useContext(ProductsContext);
  const suppliersContext = useContext(SuppliersContext);
  const categoriesContext = useContext(CategoriesContext);

  // extracting methods needed
  const { addProduct, current, clearCurrent, updateProduct } = productsContext;
  const { getSuppliers, supplierRes } = suppliersContext;
  const { getCategories, categoriesRes } = categoriesContext;

  useEffect(() => {
    getSuppliers(); // Get suppliers for select
    getCategories(); // Get categories for select

    // if current is available that means its edit mode else it add mode
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

  // Order product
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

  // Experimenting with extraction
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

  /**
   * onChange is triggered every time user types or selects
   * @param e event when user selects or types
   */
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  /**
   *
   * @returns true or false depending if validation passed
   */
  const validate = () => {
    if (name.trim() === '') {
      alert('Name is required');
      return false;
    } else if (quantityPerUnit.trim() === '') {
      alert('Quanitity per Unit is required');
      return false;
    } else if (unitPrice < 0) {
      alert('Unit price can not be negative');
      return false;
    } else if (unitsInStock < 0) {
      alert('Units in stock can not be negative');
      return false;
    } else if (unitsOnOrder < 0) {
      alert('Units in order can not be negative');
      return false;
    } else if (reorderLevel < 0) {
      alert('Reorder level can not be negative');
      return false;
    } else {
      return true;
    }
  };

  /**
   * This method is called when used Adds or Edits
   * @param e triggered when user submits
   */
  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (current === null || current === undefined) {
        addProduct(product);
      } else {
        updateProduct(product);
      }

      clearAll();
    }
  };

  /**
   * Resets form
   */
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
