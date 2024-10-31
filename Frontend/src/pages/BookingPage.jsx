// src/pages/BookingsPage.jsx
import React, { useState } from 'react';
import BookingForm from '../components/BookingForm'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate(); // Initialize useNavigate

  // This function will handle the form submission
  const handleBookingSubmit = async (data) => {
    console.log('Form Data Submitted:', data); 

    try {
      // Send the data to the backend API
      const response = await axios.post('http://localhost:3000/api/bookings', data);
      console.log('Booking submitted:', response.data);
      alert('Booking submitted successfully!');

      // Navigate to Confirmation Page with booking details
      navigate('/confirmation', { state: response.data });
      
      // Reset form logic...
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
        listingId: '', 
        listingName: '', 
      });
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Booking Details</h2>
      <BookingForm 
        onSubmit={handleBookingSubmit} 
        listing={{ _id: formData.listingId, name: formData.listingName }} 
      />
    </div>
  );
};

export default BookingsPage;
