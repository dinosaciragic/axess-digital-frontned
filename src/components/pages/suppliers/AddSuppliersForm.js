import React, { useState, useContext, useEffect } from 'react';
import SuppliersContext from '../../../context/suppliers/suppliersContext';

const AddSuppliersForm = () => {
  const suppliersContext = useContext(SuppliersContext);

  const { addSupplier, currentSupplier, clearCurrent, updateSupplier } =
    suppliersContext;

  // if current is available that means its edit mode else it add mode
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

  // Order supplier
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

  /**
   * onChange is triggered every time user types or selects
   * @param e event when user selects or types
   */
  const onChange = (e) => {
    // should change to constants
    if (e.target.name === 'city') {
      supplier.address.city = e.target.value;
      setSupplier({ ...supplier });
    } else if (e.target.name === 'country') {
      supplier.address.country = e.target.value;
      setSupplier({ ...supplier });
    } else if (e.target.name === 'postalCode') {
      supplier.address.postalCode = parseInt(e.target.value);
      setSupplier({ ...supplier });
    } else if (e.target.name === 'phone') {
      supplier.address.phone = e.target.value;
      setSupplier({ ...supplier });
    } else if (e.target.name === 'region') {
      supplier.address.region = e.target.value;
      setSupplier({ ...supplier });
    } else if (e.target.name === 'street') {
      supplier.address.street = e.target.value;
      setSupplier({ ...supplier });
    } else {
      setSupplier({ ...supplier, [e.target.name]: e.target.value });
    }
  };

  /**
   * This method is called when used Adds or Edits
   * @param e triggered when user submits
   */
  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (currentSupplier === null || currentSupplier === undefined) {
        addSupplier(supplier);
      } else {
        updateSupplier(supplier);
      }

      clearAll();
    }
  };

  /**
   *
   * @returns true or false depending if validation passed
   */
  const validate = () => {
    if (supplier.companyName.trim() === '') {
      alert('Company name is required');
      return false;
    } else if (supplier.contactName.trim() === '') {
      alert('Contact name is required');
      return false;
    } else if (supplier.contactTitle.trim() === '') {
      alert('Contact title is required');
      return false;
    } else if (supplier.address.city.trim() === '') {
      alert('City is required');
      return false;
    } else if (supplier.address.country.trim() === '') {
      alert('Country is required');
      return false;
    } else if (supplier.address.phone.trim() === '') {
      alert('Phone is required');
      return false;
    } else if (supplier.address.postalCode < 0) {
      alert('Postal code can not be negative');
      return false;
    } else if (supplier.address.region.trim() === '') {
      alert('Region is required');
      return false;
    } else if (supplier.address.street.trim() === '') {
      alert('Street is required');
      return false;
    } else {
      return true;
    }
  };

  /**
   * Resets form
   */
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
