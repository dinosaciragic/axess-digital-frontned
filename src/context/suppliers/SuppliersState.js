import React, { useReducer } from 'react';
import axios from 'axios';
import suppliersReducer from './suppliersReducer';
import SuppliersContext from './suppliersContext';
import * as Constants from '../../shared/Constants';

const SuppliersState = (props) => {
  const suppliersApi = Constants.API_LINK + 'suppliers/';

  const initialState = {
    supplierRes: null,
  };

  const [state, dispatch] = useReducer(suppliersReducer, initialState);

  // Get Suppliers
  const getSuppliers = async () => {
    try {
      let res = await axios.get(suppliersApi);

      dispatch({
        type: 'getSuppliers',
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

  return (
    <SuppliersContext.Provider
      value={{
        supplierRes: state.supplierRes,
        getSupplierById,
        getSuppliers,
      }}
    >
      {props.children}
    </SuppliersContext.Provider>
  );
};

export default SuppliersState;
