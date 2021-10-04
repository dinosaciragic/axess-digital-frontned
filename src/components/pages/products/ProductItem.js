import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = ({ product }) => {
  const {
    supplierId,
    name,
    id,
    quantityPerUnit,
    unitPrice,
    unitsInStock,
    supplier,
  } = product;

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>{name} </h3>

      <ul className='list'>
        {quantityPerUnit && (
          <li>
            <i className='fas fa-envelope-open'> {quantityPerUnit}</i>
          </li>
        )}

        {unitPrice && (
          <li>
            <i className='fas fa-phone'> {unitPrice}</i>
          </li>
        )}
      </ul>

      <p>
        <button className='btn btn-dark btn-sm'>Edit</button>
        <button className='btn btn-danger btn-sm'>Delete</button>
      </p>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
