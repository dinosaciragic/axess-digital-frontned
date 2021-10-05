import React, { useContext, useRef, useEffect } from 'react';
import OrdersContext from '../../../context/orders/ordersContext';

const OrdersFilter = () => {
  const ordersContext = useContext(OrdersContext);
  const text = useRef('');

  const { filterOrders, clearFilter, filteredOrders } = ordersContext;

  useEffect(() => {
    if (filteredOrders === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterOrders(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Orders...'
        onChange={onChange}
      />
    </form>
  );
};

export default OrdersFilter;
