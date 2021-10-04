import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SuppliersContext from '../../../context/suppliers/suppliersContext';

const ProductItem = ({ product }) => {
  const suppliersContext = useContext(SuppliersContext);

  const { supplierId, name } = product;
  const { getSupplierById } = suppliersContext;

  const [supplier, setSupplier] = useState({});

  useEffect(async () => {
    let tempSupplier = await getSupplierById(supplierId);

    setSupplier(tempSupplier);
  }, [supplierId]);

  return (
    <div
      className='card bg-light'
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      <div style={{ flex: '0 0 50%', padding: '10px' }}>
        <h3 className='text-primary text-left'>{name} </h3>

        <ul className='list'>
          <li>Supplier info</li>
          {supplier && (
            <li>
              <span className='text-primary'>Company Name</span>{' '}
              {supplier.companyName}
            </li>
          )}

          {supplier && (
            <li>
              <span className='text-primary'>Contact Name</span>{' '}
              {supplier.contactName}
            </li>
          )}

          {supplier && (
            <li>
              <span className='text-primary'>Contact Title</span>{' '}
              {supplier.contactTitle}
            </li>
          )}
        </ul>

        <p>
          <button className='btn btn-dark btn-sm'>Edit</button>
          <button className='btn btn-danger btn-sm'>Delete</button>
        </p>
      </div>

      <div style={{ flex: '0 0 50%', padding: '10px' }}>
        <ul className='list'>
          {supplier && (
            <li>
              <span className='text-primary'>Street</span>{' '}
              {supplier.address.street}
            </li>
          )}

          {supplier && (
            <li>
              <span className='text-primary'>City</span> {supplier.address.city}
            </li>
          )}

          {supplier && (
            <li>
              <span className='text-primary'>Region</span>{' '}
              {supplier.address.region}
            </li>
          )}

          {supplier && (
            <li>
              <span className='text-primary'>Country</span>{' '}
              {supplier.address.country}
            </li>
          )}

          {supplier && (
            <li>
              <span className='text-primary'>Postal Code</span>{' '}
              {supplier.address.postalCode}
            </li>
          )}

          {supplier && (
            <li>
              <span className='text-primary'>Phone</span>{' '}
              {supplier.address.phone}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
