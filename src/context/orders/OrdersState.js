import React, { useReducer } from 'react';
import axios from 'axios';
import ordersReducer from './ordersReducer';
import OrdersContext from './ordersContext';

const OrdersState = (props) => {
  const initialState = {
    ordersRes: null, // All orders
    currentOrder: null, // Current order being odited
    filteredOrders: null, // Filtered orders in search
  };

  // Config fot POST and PUT requests
  const config = {
    headers: {
      'Content-Type': 'application/json ',
    },
  };

  const [state, dispatch] = useReducer(ordersReducer, initialState);

  // Get Orders
  const getOrders = async () => {
    try {
      let res = await axios.get('/api/orders');

      dispatch({
        type: 'getOrders',
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Add Order
  const addOrder = async (order) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/orders',
        order,
        config
      );

      dispatch({
        type: 'addOrder',
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Order
  const deleteOrder = async (id) => {
    try {
      await axios.delete('/api/orders/' + id);

      dispatch({
        type: 'deleteOrder',
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Update Order
  const updateOrder = async (order) => {
    try {
      const res = await axios.put('/api/orders/' + order.id, order, config);

      dispatch({
        type: 'updateOrder',
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Clear Orders
  const clearOrders = () => {
    dispatch({ type: 'clearOrders' });
  };

  // Set Current Order
  const setCurrent = (order) => {
    dispatch({ type: 'setCurrent', payload: order });
  };

  // Clear Current Order
  const clearCurrent = () => {
    dispatch({ type: 'clearCurrent' });
  };

  // Filter Orders
  const filterOrders = (text) => {
    dispatch({ type: 'filterOrders', payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: 'clearFilter' });
  };

  return (
    <OrdersContext.Provider
      value={{
        ordersRes: state.ordersRes,
        currentOrder: state.currentOrder,
        filteredOrders: state.filteredOrders,
        getOrders,
        addOrder,
        deleteOrder,
        updateOrder,
        clearOrders,
        setCurrent,
        clearCurrent,
        filterOrders,
        clearFilter,
      }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrdersState;
