import React, { useReducer } from 'react';
import axios from 'axios';
import ordersReducer from './ordersReducer';
import OrdersContext from './ordersContext';
import * as Constants from '../../shared/Constants';

const OrdersState = (props) => {
  const ordersApi = Constants.API_LINK + 'orders/';

  const initialState = {
    ordersRes: null, // All orders
    currentOrder: null, // Current order being odited
    filteredOrders: null, // Filtered orders in search
  };

  const [state, dispatch] = useReducer(ordersReducer, initialState);

  // Get Orders
  const getOrders = async () => {
    try {
      let res = await axios.get(ordersApi);

      dispatch({
        type: Constants.GET_ORDERS,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Add Order
  const addOrder = async (order) => {
    try {
      const res = await axios.post(ordersApi, order, Constants.POST_PUT_CONFIG);

      dispatch({
        type: Constants.ADD_ORDER,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Order
  const deleteOrder = async (id) => {
    try {
      await axios.delete(ordersApi + id);

      dispatch({
        type: Constants.DELETE_ORDER,
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Update Order
  const updateOrder = async (order) => {
    try {
      const res = await axios.put(
        ordersApi + order.id,
        order,
        Constants.POST_PUT_CONFIG
      );

      dispatch({
        type: Constants.UPDATE_ORDER,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Clear Orders
  const clearOrders = () => {
    dispatch({ type: Constants.CLEAR_ORDERS });
  };

  // Set Current Order
  const setCurrent = (order) => {
    dispatch({ type: Constants.SET_CURRENT, payload: order });
  };

  // Clear Current Order
  const clearCurrent = () => {
    dispatch({ type: Constants.CLEAR_CURRENT });
  };

  // Filter Orders
  const filterOrders = (text) => {
    dispatch({ type: Constants.FILTER_ORDERS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: Constants.CLEAR_FILTER });
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
