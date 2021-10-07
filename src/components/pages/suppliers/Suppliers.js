import React, { Fragment, useContext, useEffect } from 'react';
import SuppliersContext from '../../../context/suppliers/suppliersContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SupplierItem from './SupplierItem';

const Suppliers = () => {
  const suppliersContext = useContext(SuppliersContext);

  const { getSuppliers, supplierRes, filteredSuppliers } = suppliersContext;

  useEffect(() => {
    getSuppliers();
    console.log('suppliers', supplierRes);
  }, []);

  return (
    <div className='two-block-container'>
      <div className='two-block'>{/* <AddProductsForm /> */}</div>

      <div className='two-block'>
        {/*  <ProductsFilter /> */}

        <Fragment>
          {/* start here */}
          {supplierRes !== null ? (
            <TransitionGroup>
              {filteredSuppliers !== null
                ? filteredSuppliers.map((supplier) => (
                    <CSSTransition
                      key={supplier.id}
                      timeout={1000}
                      classNames='item'
                    >
                      <SupplierItem supplier={supplier} />
                    </CSSTransition>
                  ))
                : supplierRes.map((supplier) => (
                    <CSSTransition
                      key={supplier.id}
                      timeout={1000}
                      classNames='item'
                    >
                      <SupplierItem supplier={supplier} />
                    </CSSTransition>
                  ))}
            </TransitionGroup>
          ) : (
            <div>Please wait...</div>
          )}
        </Fragment>
      </div>
    </div>
  );
};

export default Suppliers;
