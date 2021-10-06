import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OrdersContext from '../../../context/orders/ordersContext';
import ProductsContext from '../../../context/products/productsContext';
import SuppliersContext from '../../../context/suppliers/suppliersContext';
import CategoriesContext from '../../../context/categories/categoriesContext';

const OrderItem = ({ order }) => {
  const ordersContext = useContext(OrdersContext);
  const productsContext = useContext(ProductsContext);
  const suppliersContext = useContext(SuppliersContext);
  const categoriesContext = useContext(CategoriesContext);

  const { shipName, id, details } = order;
  const { setCurrent, deleteOrder, clearCurrent } = ordersContext;
  const { getProductById } = productsContext;
  const { getSupplierById } = suppliersContext;
  const { getCategoryById } = categoriesContext;

  const [product, setProduct] = useState({});
  const [supplier, setSupplier] = useState({});
  const [category, setCategory] = useState({});

  useEffect(() => {
    // proper way of calling async function in useEffect
    const fetchData = async () => {
      try {
        let tempProduct = await getProductById(details[0].productId); // uses first in array temporarly because I do not know what the intended design was for this specific case
        let tempSupplier = await getSupplierById(tempProduct.supplierId);
        let tempCategory = await getCategoryById(tempProduct.categoryId);

        setProduct(tempProduct);
        setSupplier(tempSupplier);
        setCategory(tempCategory);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const onDelete = () => {
    deleteOrder(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light two-block-container'>
      <div className='two-block'>
        <h3 className='text-primary text-left'>{shipName} </h3>

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
          {product && (
            <li>
              <span className='text-primary'>Product Name</span> {product.name}
            </li>
          )}

          {product && (
            <li>
              <span className='text-primary'>Quantity per unit</span>{' '}
              {product.quantityPerUnit}
            </li>
          )}

          {category && (
            <li>
              <span className='text-primary'>Category</span> {category.name}
            </li>
          )}

          {category && (
            <li>
              <span className='text-primary'>Description</span>{' '}
              {category.description}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderItem;
