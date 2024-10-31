// src/components/BookingForm.jsx
import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ onSubmit, listing }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    clientName: '',
    email: '',
    daytimePhone: '',
    mobilePhone: '',
    postalAddress: '',
    homeAddress: '',
    depositPaid: 0,
    balanceDue: 0,
    balanceDueDate: '',
    numberOfGuests: 1,
    guests: [{ name: '', age: '' }],
    listingId: listing ? listing._id : '',
    listingName: listing ? listing.name : '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...formData.guests];
    updatedGuests[index][field] = value;
    setFormData((prevData) => ({ ...prevData, guests: updatedGuests }));
  };

  const handleAddGuest = () => {
    setFormData((prevData) => ({
      ...prevData,
      guests: [...prevData.guests, { name: '', age: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the data to be sent back to the parent component
    const formattedData = {
      booking_id: Math.floor(Math.random() * 100000), // Example booking ID
      listing_name: formData.listingName,
      arrival_date: new Date(formData.startDate).toISOString(), // format to ISO string
      departure_date: new Date(formData.endDate).toISOString(), // format to ISO string
      client: {
        name: formData.clientName,
        email: formData.email,
        daytime_phone: formData.daytimePhone,
        mobile: formData.mobilePhone,
        postal_address: formData.postalAddress,
        home_address: formData.homeAddress,
      },
      deposit_paid: formData.depositPaid,
      balance_due: formData.balanceDue,
      balance_due_date: new Date(formData.balanceDueDate).toISOString(), // format to ISO string
      number_of_guests: formData.numberOfGuests,
      guests: formData.guests,
    };

    // Call the onSubmit function passed from the parent component
    onSubmit(formattedData);
    setLoading(false);
  };

  return (
    <form className='booking-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Listing Name:</label>
        <input type="text" name="listingName" value={formData.listingName} onChange={handleChange} required />
      </div>
      <div className='form-group'>
        <label>Arrival Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
      </div>
      <div className='form-group'>
        <label>Departure Date:</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
      </div>
      <div className='form-group'>
        <label>Client Name:</label>
        <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required />
      </div>
      <div className='form-group'>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className='form-group'>
        <label>Daytime Phone:</label>
        <input type="text" name="daytimePhone" value={formData.daytimePhone} onChange={handleChange} />
      </div>
      <div className='form-group'>
        <label>Mobile Phone:</label>
        <input type="text" name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} />
      </div>
      <div className='form-group'>
        <label>Postal Address:</label>
        <input type="text" name="postalAddress" value={formData.postalAddress} onChange={handleChange} />
      </div>
      <div className='form-group'>
        <label>Home Address:</label>
        <input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleChange} />
      </div>
      <div className='form-group'>
        <label>Deposit Paid:</label>
        <input type="number" name="depositPaid" value={formData.depositPaid} onChange={handleChange} required />
      </div>
      <div className='form-group'>
        <label>Balance Due:</label>
        <input type="number" name="balanceDue" value={formData.balanceDue} onChange={handleChange} required />
      </div>
      <div className='form-group'>
        <label>Balance Due Date:</label>
        <input type="date" name="balanceDueDate" value={formData.balanceDueDate} onChange={handleChange} required />
      </div>
      <div className='form-group'>
        <label>Number of Guests:</label>
        <input type="number" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleChange} required />
      </div>
      <div className='form-group'>
        <h3>Guests</h3>
        {formData.guests.map((guest, index) => (
          <div key={index}>
            <input 
              type="text" 
              placeholder="Guest Name" 
              value={guest.name} 
              onChange={(e) => handleGuestChange(index, 'name', e.target.value)} 
              required 
            />
            <input 
              type="number" 
              placeholder="Guest Age" 
              value={guest.age} 
              onChange={(e) => handleGuestChange(index, 'age', e.target.value)} 
              required 
            />
          </div>
        ))}
        <button className='submit-btn' type="button" onClick={handleAddGuest}>Add Guest</button>
      </div>
      <button className='submit-btn' type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Booking'}
      </button>
    </form>
  );
};

export default BookingForm;
