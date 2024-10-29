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
      guests: [...prevData.guests, { name: '', age: '' }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to match your schema
    const formattedData = {
      booking_id: Math.floor(Math.random() * 100000), // Example booking ID, replace with actual logic
      listing_name: formData.listingName,
      arrival_date: new Date(formData.startDate).toISOString(),
      departure_date: new Date(formData.endDate).toISOString(),
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
      balance_due_date: new Date(formData.balanceDueDate).toISOString(),
      number_of_guests: formData.numberOfGuests,
      guests: formData.guests,
    };
    
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h2>Book Your Stay</h2>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="clientName">Client Name</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="daytimePhone">Daytime Phone Number</label>
        <input
          type="tel"
          id="daytimePhone"
          name="daytimePhone"
          value={formData.daytimePhone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="mobilePhone">Mobile Number</label>
        <input
          type="tel"
          id="mobilePhone"
          name="mobilePhone"
          value={formData.mobilePhone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="postalAddress">Postal Address</label>
        <input
          type="text"
          id="postalAddress"
          name="postalAddress"
          value={formData.postalAddress}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="homeAddress">Home Address</label>
        <input
          type="text"
          id="homeAddress"
          name="homeAddress"
          value={formData.homeAddress}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="depositPaid">Deposit Paid</label>
        <input
          type="number"
          id="depositPaid"
          name="depositPaid"
          value={formData.depositPaid}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="balanceDue">Balance Due</label>
        <input
          type="number"
          id="balanceDue"
          name="balanceDue"
          value={formData.balanceDue}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="balanceDueDate">Balance Due Date</label>
        <input
          type="date"
          id="balanceDueDate"
          name="balanceDueDate"
          value={formData.balanceDueDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="numberOfGuests">Number of Guests</label>
        <input
          type="number"
          id="numberOfGuests"
          name="numberOfGuests"
          value={formData.numberOfGuests}
          onChange={(e) => {
            const value = Math.max(1, e.target.value); // Ensure at least one guest
            setFormData((prevData) => ({ ...prevData, numberOfGuests: value }));
          }}
          required
        />
      </div>

      {formData.guests.map((guest, index) => (
        <div key={index} className="guest-form">
          <h4>Guest {index + 1}</h4>
          <div className="form-group">
            <label htmlFor={`guestName-${index}`}>Name</label>
            <input
              type="text"
              id={`guestName-${index}`}
              value={guest.name}
              onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`guestAge-${index}`}>Age</label>
            <input
              type="number"
              id={`guestAge-${index}`}
              value={guest.age}
              onChange={(e) => handleGuestChange(index, 'age', e.target.value)}
              required
            />
          </div>
        </div>
      ))}
      <button type="button" className="add-guest-btn" onClick={handleAddGuest}>
        Add Another Guest
      </button>
      <button type="submit" className="submit-btn">Submit Booking</button>
    </form>
  );
};

export default BookingForm;
