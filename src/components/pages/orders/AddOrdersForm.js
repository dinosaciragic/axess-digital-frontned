import React, { useState, useContext, useEffect } from 'react';
import ProductsContext from '../../../context/products/productsContext';
import OrdersContext from '../../../context/orders/ordersContext';

const AddOrdersForm = () => {
  const productsContext = useContext(ProductsContext);
  const ordersContext = useContext(OrdersContext);

  const { getProducts, productsRes } = productsContext;
  const { addOrder, currentOrder, clearCurrent, updateOrder } = ordersContext;

  useEffect(() => {
    getProducts();

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

  const [order, setOrder] = useState({
    shipName: '',
    details: {
      productId: 0,
      unitPrice: 0,
      quantity: 0,
      discount: 0,
    },
  });

  const onChange = (e) => {
    if (e.target.name == 'productId') {
      order.details.productId = parseInt(e.target.value);
      setOrder({ ...order });
    } else if (e.target.name == 'unitPrice') {
      order.details.unitPrice = parseInt(e.target.value);
      setOrder({ ...order });
    } else if (e.target.name == 'quantity') {
      order.details.quantity = parseInt(e.target.value);
      setOrder({ ...order });
    } else {
      setOrder({ ...order, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('order', order);

    if (currentOrder === null || currentOrder === undefined) {
      addOrder(order);
    } else {
      updateOrder(order);
    }

    clearAll();
  };

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
