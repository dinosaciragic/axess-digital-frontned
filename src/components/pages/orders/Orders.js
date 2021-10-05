import React, { Fragment, useContext, useEffect } from 'react';
import OrdersContext from '../../../context/orders/ordersContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OrderItem from './OrderItem';

const Orders = () => {
  const ordersContext = useContext(OrdersContext);

  const { getOrders, ordersRes, filteredOrders } = ordersContext;

  useEffect(() => {
    getOrders();
    console.log('orders', ordersRes);
  }, []);

  return (
    <div className='two-block-container'>
      <div className='two-block'>
        {/* <AddProductsForm />  add orders form*/}
      </div>

      <div className='two-block'>
        {/*  <ProductsFilter /> add orders filter */}

        <Fragment>
          {/* start here */}
          {ordersRes !== null ? (
            <TransitionGroup>
              {filteredOrders !== null
                ? filteredOrders.map((order) => (
                    <CSSTransition
                      key={order.id}
                      timeout={1000}
                      classNames='item'
                    >
                      <OrderItem order={order} />
                    </CSSTransition>
                  ))
                : ordersRes.map((order) => (
                    <CSSTransition
                      key={order.id}
                      timeout={1000}
                      classNames='item'
                    >
                      <OrderItem order={order} />
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

export default Orders;
