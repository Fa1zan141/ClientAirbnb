import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css'; 

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const handleConfirm = () => {
    navigate('/thankyou');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="confirmation">
      <h2>Booking Confirmation</h2>
      <p>Thank you for your booking!</p>
      <div className="booking-details">
        <p><strong>Booking ID:</strong> {bookingData.booking_id}</p>
        <p><strong>Listing Name:</strong> {bookingData.listing_name}</p>
        <p><strong>Arrival Date:</strong> {new Date(bookingData.arrival_date).toLocaleDateString()}</p>
        <p><strong>Departure Date:</strong> {new Date(bookingData.departure_date).toLocaleDateString()}</p>
        <p><strong>Client Name:</strong> {bookingData.client.name}</p>
        <p><strong>Email:</strong> {bookingData.client.email}</p>
      </div>
      <div className="button-container">
        <button className="confirm-button" onClick={handleConfirm}>Confirm Booking</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel Booking</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
