
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ConfirmationPage.css'; 
const ConfirmationPage = () => {
  const { state } = useLocation(); 
  const {
    booking_id,
    listing_name,
    arrival_date,
    departure_date,
    client = {}, 
    deposit_paid = 0, 
    balance_due = 0, 
    balance_due_date,
    number_of_guests = 0, 
    guests = [], 
  } = state || {}; 
  return (
    <div className="confirmation-container">
      <h2>Booking Confirmation</h2>
      <h3>Thank you for your booking!</h3>
      <div className="booking-details">
        <h4>Booking ID: {booking_id || 'N/A'}</h4>
        <h4>Property: {listing_name || 'N/A'}</h4>
        <h4>Arrival Date: {arrival_date ? new Date(arrival_date).toLocaleDateString() : 'N/A'}</h4>
        <h4>Departure Date: {departure_date ? new Date(departure_date).toLocaleDateString() : 'N/A'}</h4>
        
        <h4>Client Information:</h4>
        <p>Name: {client.name || 'N/A'}</p>
        <p>Email: {client.email || 'N/A'}</p>
        <p>Phone: {client.daytime_phone || client.mobile || 'N/A'}</p>

        <h4>Payment Details:</h4>
        <p>Deposit Paid: ${deposit_paid.toFixed(2)}</p>
        <p>Balance Due: ${balance_due.toFixed(2)}</p>
        <p>Balance Due Date: {balance_due_date ? new Date(balance_due_date).toLocaleDateString() : 'N/A'}</p>

        <h4>Number of Guests: {number_of_guests}</h4>
        <h4>Guests:</h4>
        {guests.length > 0 ? (
          <ul>
            {guests.map((guest, index) => (
              <li key={index}>
                {guest.name || 'Unnamed Guest'}, Age: {guest.age || 'N/A'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No guests listed.</p>
        )}
      </div>
      <Link to="/home" className="home-link">Return to Homepage</Link>
    </div>
  );
};

export default ConfirmationPage;
