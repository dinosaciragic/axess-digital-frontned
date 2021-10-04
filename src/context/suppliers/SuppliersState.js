import React, { useReducer } from 'react';
import axios from 'axios';
import suppliersReducer from './suppliersReducer';
import SuppliersContext from './suppliersContext';

const SuppliersState = (props) => {
  const initialState = {
    supplier: null,
  };

  const [state, dispatch] = useReducer(suppliersReducer, initialState);

  // Get Supplier by id
  const getSupplierById = async (id) => {
    try {
      let res = await axios.get('/api/suppliers/' + id);

      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SuppliersContext.Provider
      value={{
        supplier: state.supplier,
        getSupplierById,
      }}
    >
      {props.children}
    </SuppliersContext.Provider>
  );
};

export default SuppliersState;
