import React, { useState, useContext, useEffect } from 'react';
import SuppliersContext from '../../../context/suppliers/suppliersContext';

const AddSuppliersForm = () => {
  const suppliersContext = useContext(SuppliersContext);

  const { addSupplier, currentSupplier, clearCurrent, updateSupplier } =
    suppliersContext;

  useEffect(() => {
    if (currentSupplier) {
      setSupplier(currentSupplier);
    } else {
      setSupplier({
        companyName: '',
        contactName: '',
        contactTitle: '',
        address: {
          city: '',
          country: '',
          phone: '',
          postalCode: 0,
          region: '',
          street: '',
        },
      });
    }
  }, [suppliersContext, currentSupplier]);

  const [supplier, setSupplier] = useState({
    companyName: '',
    contactName: '',
    contactTitle: '',
    address: {
      city: '',
      country: '',
      phone: '',
      postalCode: 0,
      region: '',
      street: '',
    },
  });

  const onChange = (e) => {
    // should change to constants
    if (e.target.name == 'city') {
      supplier.address.city = e.target.value;
      setSupplier({ ...supplier });
    } else if (e.target.name == 'country') {
      supplier.address.country = e.target.value;
      setSupplier({ ...supplier });
    } else if (e.target.name == 'postalCode') {
      supplier.address.postalCode = parseInt(e.target.value);
      setSupplier({ ...supplier });
    } else if (e.target.name == 'phone') {
      supplier.address.phone = e.target.value;
      setSupplier({ ...supplier });
    } else if (e.target.name == 'region') {
      supplier.address.region = e.target.value;
      setSupplier({ ...supplier });
    } else if (e.target.name == 'street') {
      supplier.address.street = e.target.value;
      setSupplier({ ...supplier });
    } else {
      setSupplier({ ...supplier, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('supplier', supplier);

    if (currentSupplier === null || currentSupplier === undefined) {
      addSupplier(supplier);
    } else {
      updateSupplier(supplier);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {currentSupplier ? 'Edit Supplier' : 'Add Supplier'}
      </h2>

      {/* Company name */}
      <label className='text-primary'>
        Company name
        <input
          type='text'
          placeholder='Company name'
          name='companyName'
          value={supplier.companyName}
          onChange={onChange}
          required
        />
      </label>

      {/* Contact name */}
      <label className='text-primary'>
        Contact name
        <input
          type='text'
          placeholder='Contact name'
          name='contactName'
          value={supplier.contactName}
          onChange={onChange}
          required
        />
      </label>

      {/* Contact title */}
      <label className='text-primary'>
        Contact title
        <input
          type='text'
          placeholder='Contact title'
          name='contactTitle'
          value={supplier.contactTitle}
          onChange={onChange}
          required
        />
      </label>

      {/* City */}
      <label className='text-primary'>
        City
        <input
          type='text'
          placeholder='City'
          name='city'
          value={supplier.address.city}
          onChange={onChange}
          required
        />
      </label>

      {/* Country */}
      <label className='text-primary'>
        Country
        <input
          type='text'
          placeholder='Country'
          name='country'
          value={supplier.address.country}
          onChange={onChange}
          required
        />
      </label>

      {/* Phone */}
      <label className='text-primary'>
        Phone
        <input
          type='text'
          placeholder='Phone'
          name='phone'
          value={supplier.address.phone}
          onChange={onChange}
          required
        />
      </label>

      {/* Postal code */}
      <label className='text-primary'>
        Postal code
        <input
          type='number'
          placeholder='Postal code'
          name='postalCode'
          value={supplier.address.postalCode}
          onChange={onChange}
          required
        />
      </label>

      {/* Region */}
      <label className='text-primary'>
        Region
        <input
          type='text'
          placeholder='Region'
          name='region'
          value={supplier.address.region}
          onChange={onChange}
          required
        />
      </label>

      {/* Street */}
      <label className='text-primary'>
        Street
        <input
          type='text'
          placeholder='Street'
          name='street'
          value={supplier.address.street}
          onChange={onChange}
          required
        />
      </label>

      {/* Submit button */}
      <div>
        <input
          type='submit'
          value={currentSupplier ? 'Update Supplier' : 'Add Supplier'}
          className='btn btn-primary btn-block'
        />
      </div>
      {/* Clear button */}
      {currentSupplier && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default AddSuppliersForm;