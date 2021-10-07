import React, { useReducer } from 'react';
import axios from 'axios';
import suppliersReducer from './suppliersReducer';
import SuppliersContext from './suppliersContext';
import * as Constants from '../../shared/Constants';

const SuppliersState = (props) => {
  const suppliersApi = Constants.API_LINK + 'suppliers/';

  const initialState = {
    supplierRes: null,
    currentSupplier: null,
    filteredSuppliers: null,
  };

  const [state, dispatch] = useReducer(suppliersReducer, initialState);

  // Get Suppliers
  const getSuppliers = async () => {
    try {
      let res = await axios.get(suppliersApi);

      dispatch({
        type: Constants.GET_SUPPLIERS,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Get Supplier by id
  const getSupplierById = async (id) => {
    try {
      let res = await axios.get(suppliersApi + id);

      if (res.data) {
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add Supplier
  const addSupplier = async (supplier) => {
    try {
      const res = await axios.post(
        suppliersApi,
        supplier,
        Constants.POST_PUT_CONFIG
      );

      dispatch({
        type: Constants.ADD_SUPPLIER,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Supplier
  const deleteSupplier = async (id) => {
    try {
      await axios.delete(suppliersApi + id);

      dispatch({
        type: Constants.DELETE_SUPPLIER,
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Update Supplier
  const updateSupplier = async (supplier) => {
    try {
      const res = await axios.put(
        suppliersApi + supplier.id,
        supplier,
        Constants.POST_PUT_CONFIG
      );

      dispatch({
        type: Constants.UPDATE_SUPPLIER,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Clear Suppliers
  const clearSuppliers = () => {
    dispatch({ type: Constants.CLEAR_SUPPLIERS });
  };

  // Set Current Supplier
  const setCurrent = (supplier) => {
    dispatch({ type: Constants.SET_CURRENT, payload: supplier });
  };

  // Clear Current Supplier
  const clearCurrent = () => {
    dispatch({ type: Constants.CLEAR_CURRENT });
  };

  // Filter Supplier
  const filterSuppliers = (text) => {
    dispatch({ type: Constants.FILTER_SUPPLIERS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: Constants.CLEAR_FILTER });
  };

  return (
    <SuppliersContext.Provider
      value={{
        supplierRes: state.supplierRes,
        currentSupplier: state.currentSupplier,
        filteredSuppliers: state.filteredSuppliers,
        getSupplierById,
        getSuppliers,
        addSupplier,
        deleteSupplier,
        updateSupplier,
        clearSuppliers,
        setCurrent,
        clearCurrent,
        filterSuppliers,
        clearFilter,
      }}
    >
      {props.children}
    </SuppliersContext.Provider>
  );
};

export default SuppliersState;
