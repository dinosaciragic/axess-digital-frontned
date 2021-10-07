import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SuppliersContext from '../../../context/suppliers/suppliersContext';

const SupplierItem = ({ supplier }) => {
  const suppliersContext = useContext(SuppliersContext);

  const { address, companyName, contactName, contactTitle, id } = supplier;
  const { setCurrent, deleteSupplier, clearCurrent } = suppliersContext;

  const onDelete = () => {
    deleteSupplier(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light two-block-container'>
      <div className='two-block'>
        <h3 className='text-primary text-left'>{companyName} </h3>

        <ul className='list'>
          {contactName && (
            <li>
              <span className='text-primary'>Contact Name</span> {contactName}
            </li>
          )}

          {contactTitle && (
            <li>
              <span className='text-primary'>Contact Title</span> {contactTitle}
            </li>
          )}
        </ul>

        <p>
          <button
            className='btn btn-dark btn-sm'
            onClick={() => {
              setCurrent(supplier);
            }}
          >
            Edit
          </button>
          <button className='btn btn-danger btn-sm' onClick={onDelete}>
            Delete
          </button>
        </p>
      </div>

      <div className='two-block'>
        <ul className='list'>
          {address && (
            <li>
              <span className='text-primary'>Street</span> {address.street}
            </li>
          )}

          {address && (
            <li>
              <span className='text-primary'>City</span> {address.city}
            </li>
          )}

          {address && (
            <li>
              <span className='text-primary'>Region</span> {address.region}
            </li>
          )}

          {address && (
            <li>
              <span className='text-primary'>Country</span> {address.country}
            </li>
          )}

          {address && (
            <li>
              <span className='text-primary'>Postal Code</span>{' '}
              {address.postalCode}
            </li>
          )}

          {address && (
            <li>
              <span className='text-primary'>Phone</span> {address.phone}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

SupplierItem.propTypes = {
  supplier: PropTypes.object.isRequired,
};

export default SupplierItem;
