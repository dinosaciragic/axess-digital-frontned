import React from 'react';

const Home = () => {
  return (
    <>
      <h2 className='text-primary'>Welcome to the Northwind Web app</h2>

      <p>This is a visual representation of the Northwind Database.</p>

      <p>
        Here you can find three different pages inside the navbar. Suppliers,
        Products and Orders.
      </p>

      <h4>For each page you can:</h4>

      <ul className='home-class'>
        <li>View items available from the dabase</li>
        <li>Add item</li>
        <li>Edit item</li>
        <li>Delete item</li>
        <li>Filter through items with the search bar</li>
      </ul>
    </>
  );
};

export default Home;
