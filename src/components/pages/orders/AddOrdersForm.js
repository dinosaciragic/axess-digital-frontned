import React, { useState, useContext, useEffect } from 'react';
import ProductsContext from '../../../context/products/productsContext';
import OrdersContext from '../../../context/orders/ordersContext';

const AddOrdersForm = () => {
  // Supplier is added automaticaly using product
  // Declaring contexts
  const productsContext = useContext(ProductsContext);
  const ordersContext = useContext(OrdersContext);

  // extracting methods needed
  const { getProducts, productsRes } = productsContext;
  const { addOrder, currentOrder, clearCurrent, updateOrder } = ordersContext;

  useEffect(() => {
    getProducts(); // get products for select

    // if currentOrder is available that means its edit mode else it add mode
    if (currentOrder) {
      setOrder(currentOrder);
    } else {
      setOrder({
        shipName: '',
        details: {
          productId: 0,
          unitPrice: 0,
          quantity: 0,
          discount: 0,
        },
      });
    }
  }, [ordersContext, currentOrder]);

  // Order object
  const [order, setOrder] = useState({
    shipName: '',
    details: {
      productId: 0,
      unitPrice: 0,
      quantity: 0,
      discount: 0,
    },
  });

  /**
   * onChange is triggered every time user types or selects
   * @param e event when user selects or types
   */
  const onChange = (e) => {
    // Example for assigning variables that are nested objects like order.details.productId etc
    if (e.target.name === 'productId') {
      order.details.productId = parseInt(e.target.value);
      setOrder({ ...order });
    } else if (e.target.name === 'unitPrice') {
      order.details.unitPrice = parseInt(e.target.value);
      setOrder({ ...order });
    } else if (e.target.name === 'quantity') {
      order.details.quantity = parseInt(e.target.value);
      setOrder({ ...order });
    } else {
      // Example for assigning single variaables for ex. shipName
      setOrder({ ...order, [e.target.name]: e.target.value });
    }
  };

  /**
   * This method is called when used Adds or Edits Order
   * @param e triggered when user submits
   */
  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (currentOrder === null || currentOrder === undefined) {
        addOrder(order);
      } else {
        updateOrder(order);
      }

      // Reset form
      clearAll();
    }
  };

  /**
   *
   * @returns true or false depending if validation passed
   */
  const validate = () => {
    if (order.shipName.trim() === '') {
      alert('Name is required');
      return false;
    } else if (order.details.unitPrice < 0) {
      alert('Unit price can not be negative');
      return false;
    } else if (order.details.quantity < 0) {
      alert('Quantity can not be negative');
      return false;
    } else {
      return true;
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
        {currentOrder ? 'Edit Order' : 'Add Order'}
      </h2>

      {/* Ship Name */}
      <label className='text-primary'>
        Ship Name
        <input
          type='text'
          placeholder='Ship name'
          name='shipName'
          value={order.shipName}
          onChange={onChange}
          required
        />
      </label>

      {/* Products select menu */}
      {productsRes && (
        <label className='text-primary'>
          Select Product
          <select
            value={order.details.productId}
            name='productId'
            onChange={onChange}
          >
            {productsRes.map((product) => {
              return (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              );
            })}
          </select>
        </label>
      )}

      {/* Unit price */}
      <label className='text-primary'>
        Unit price
        <input
          type='number'
          placeholder='Unit price'
          name='unitPrice'
          value={order.details.unitPrice}
          onChange={onChange}
          required
        />
      </label>

      {/* Quantity */}
      <label className='text-primary'>
        Quantity
        <input
          type='number'
          placeholder='Quantity'
          name='quantity'
          value={order.details.quantity}
          onChange={onChange}
          required
        />
      </label>

      {/* Submit button */}
      <div>
        <input
          type='submit'
          value={currentOrder ? 'Update Order' : 'Add Order'}
          className='btn btn-primary btn-block'
        />
      </div>
      {/* Clear button */}
      {currentOrder && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default AddOrdersForm;
