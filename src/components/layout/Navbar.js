import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar bg-primary'>
      <Fragment>
        <ul>
          <Link to='/'>
            <li className='navbar-item'>Home</li>
          </Link>

          <Link to='/suppliers'>
            <li className='navbar-item'>Suppliers</li>
          </Link>

          <Link to='/products'>
            <li className='navbar-item'>Products</li>
          </Link>

          <Link to='/orders'>
            <li className='navbar-item'>Orders</li>
          </Link>
        </ul>
      </Fragment>
    </div>
  );
};

export default Navbar;
