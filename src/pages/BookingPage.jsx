
import React, { useState } from 'react';
import BookingForm from '../components/BookingForm'; 
import './BookingsPage.css'; 

const BookingsPage = () => {
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
    listingId: '', 
    listingName: '', 
  });

  const handleBookingSubmit = (data) => {
    
    console.log('Booking submitted:', data);
    alert('Booking submitted successfully!');

    
    setFormData({
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
      listingId: formData.listingId, 
      listingName: formData.listingName, 
    });
  };

  return (
    <div className="container">
      <h2>Booking Details</h2>
      <BookingForm onSubmit={handleBookingSubmit} listing={{ _id: formData.listingId, name: formData.listingName }} />
    </div>
  );
};

export default BookingsPage;
