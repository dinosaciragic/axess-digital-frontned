import React, { Fragment, useContext, useEffect } from 'react';
import OrdersContext from '../../../context/orders/ordersContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OrderItem from './OrderItem';
import OrdersFilter from './OrdersFilter';
import AddOrdersForm from './AddOrdersForm';

const Orders = () => {
  const ordersContext = useContext(OrdersContext);

  const { getOrders, ordersRes, filteredOrders } = ordersContext;

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className='two-block-container'>
      <div className='two-block'>
        <AddOrdersForm />
      </div>

      <div className='two-block'>
        <OrdersFilter />

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
