import React, { useReducer } from 'react';
import axios from 'axios';
import suppliersReducer from './suppliersReducer';
import SuppliersContext from './suppliersContext';

const SuppliersState = (props) => {
  const initialState = {
    supplierRes: null,
  };

  const [state, dispatch] = useReducer(suppliersReducer, initialState);

  // Get Suppliers
  const getSuppliers = async () => {
    try {
      let res = await axios.get('/api/suppliers');

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
      let res = await axios.get('http://localhost:5000/api/suppliers/' + id);

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
