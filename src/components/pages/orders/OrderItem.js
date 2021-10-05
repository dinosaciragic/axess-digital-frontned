import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OrdersContext from '../../../context/orders/ordersContext';

const OrderItem = ({ order }) => {
  const ordersContext = useContext(OrdersContext);

  const { shipName, id } = order;
  const { setCurrent, deleteOrder, clearCurrent } = ordersContext;

  const onDelete = () => {
    deleteOrder(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light two-block-container'>
      <div className='two-block'>
        <h3 className='text-primary text-left'>{shipName} </h3>

        <p>
          <button
            className='btn btn-dark btn-sm'
            onClick={() => {
              setCurrent(order);
            }}
          >
            Edit
          </button>
          <button className='btn btn-danger btn-sm' onClick={onDelete}>
            Delete
          </button>
        </p>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderItem;
