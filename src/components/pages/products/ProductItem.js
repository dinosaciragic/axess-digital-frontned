import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SuppliersContext from '../../../context/suppliers/suppliersContext';
import ProductsContext from '../../../context/products/productsContext';

const ProductItem = ({ product }) => {
  const suppliersContext = useContext(SuppliersContext);
  const productsContext = useContext(ProductsContext);

  const { supplierId, name, id } = product;
  const { getSupplierById } = suppliersContext;
  const { setCurrent, deleteProduct, clearCurrent } = productsContext;

  const [supplier, setSupplier] = useState({});

  useEffect(() => {
    // proper way of calling async function in useEffect
    const fetchData = async () => {
      let tempSupplier = await getSupplierById(supplierId);

      setSupplier(tempSupplier);
    };

    fetchData();
  }, [supplierId]);

  /**
   * When delete is clicked order is deleted and current is reset
   */
  const onDelete = () => {
    deleteProduct(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light two-block-container'>
      <div className='two-block'>
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
          <button
            className='btn btn-dark btn-sm'
            onClick={() => {
              setCurrent(product);
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
          {supplier && supplier.address && (
            <li>
              <span className='text-primary'>Street</span>{' '}
              {supplier.address.street}
            </li>
          )}

          {supplier && supplier.address && (
            <li>
              <span className='text-primary'>City</span> {supplier.address.city}
            </li>
          )}

          {supplier && supplier.address && (
            <li>
              <span className='text-primary'>Region</span>{' '}
              {supplier.address.region}
            </li>
          )}

          {supplier && supplier.address && (
            <li>
              <span className='text-primary'>Country</span>{' '}
              {supplier.address.country}
            </li>
          )}

          {supplier && supplier.address && (
            <li>
              <span className='text-primary'>Postal Code</span>{' '}
              {supplier.address.postalCode}
            </li>
          )}

          {supplier && supplier.address && (
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
